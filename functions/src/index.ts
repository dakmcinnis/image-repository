import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { UserRecord } from 'firebase-functions/lib/providers/auth';
import * as Users from './Users';
import * as Organizations from './Organizations';
import * as HTTPS from './HTTPS';
import * as Images from './Images';

try {
    admin.initializeApp();
} catch (e) {
    console.error('App initialization error', e);
}

/* User Data Management */

export const addUserToFirestore = functions.auth.user().onCreate((user: UserRecord) => (
    Users.addUser(user)
));

export const removeUserFromFirestore = functions.auth.user().onDelete((user: UserRecord) => (
    Users.removeUser(user)
));

/* Personal Upload Management */

export const addUploadToFirestore = functions.storage.object().onMetadataUpdate(async (object) => {
    // Determine whether the upload can go through
    const owner = object.metadata?.owner;
    if (!owner) {
        console.log(
            `File was not uploaded with an owner. It will not be accessible in Firestore.`
        );
        return;
    }
    const filePath = object.name;
    const filename = object.name?.replace(/^.*[\\\/]/, '');
    if (!filename || !filePath) {
        console.log(
            `File was not uploaded with a name. It will not be accessible in Firestore.`
        );
        return;
    }
    const downloadURL = object.metadata?.downloadURL;
    if (!downloadURL) {
        console.log(
            `File was not uploaded with a downloadURL. It will not be accessible in Firestore.`
        );
        return;
    }
    // Gather the information about the upload
    const documentData = {
        filename,
        created: object.timeCreated,
        owner,
        downloadURL,
    };
    // Add to user's personal uploads
    return admin.firestore()
        .collection(`${Users.USERS_COLLECTION}/${owner}/${Users.SUB_COLLECTIONS.uploads}`)
        .doc(filename)
        .set(documentData)
        .then(result => {
            console.log(
                `Image ${filename} has been added to user ${owner}'s personal collection.`
            );
            return;
        }).catch(error => {
            console.error(
                `Image ${filename} has been added to user ${owner}'s personal collection.`
            );
            return;
        })
});

/* Organization Management */

export const addOrganization = functions.https.onRequest((request, response) => {
    const { organizationId } = request.query;

    return HTTPS.isAuthorized(request)
        .then((uid: string) => {
            if (!organizationId) {
                response.status(400)
                return;
            }
            Organizations.addOrganization(uid, organizationId as string)
                .then(() => {
                    response.send(`You are now the owner of the organization ${organizationId}.`);
                    return;
                })
                .catch((error) => {
                    response.status(error);
                    return;
                })
        })
        .catch((error) => {
            response.status(error);
            return;
        });
});

/**
 * TODO: Implement addMemberToOrganization
 * Parameters would be:
 * - organizationId: string
 * - memberId: string
 * - isAdmin: boolean
 */

/* Image Management */

export const requestImageApproval = functions.https.onRequest((request, response) => {
    const { organizationId, imageId } = request.query;


    return HTTPS.isAuthorized(request)
        .then((uid: string) => {
            if (!organizationId && !imageId) {
                response.status(400)
                return;
            }
            const source = `${Users.USERS_COLLECTION}/${uid}/${Users.SUB_COLLECTIONS.uploads}`;
            const destination = `${Organizations.ORGANIZATIONS_COLLECTION}/${organizationId}/${Organizations.SUB_COLLECTIONS.pending}`;
            admin.firestore()
                .collection(source)
                .doc(imageId as string)
                .get()
                .then((doc) => doc.data() as Images.ImageData)
                .then((docData: Images.ImageData) => {
                    admin.firestore()
                        .collection(destination)
                        .doc(docData.filename)
                        .set(docData)
                        .then(() => {
                            return true;
                        })
                        .catch((error) => {
                            response.status(error);
                            return false;
                        })
                    return docData.filename;
                })
                .then(() => {
                    response.send(`The image is now pending approval.`);
                    return;
                })
                .catch((error) => {
                    response.status(error);
                    return;
                })
        })
        .catch((error) => {
            response.status(error);
            return;
        });
});

/**
 * TODO: implement approve images
 */

export const getPublicOrganizationImages = functions.https.onRequest((request, response) => {
    const { organizationId } = request.query;

    if (!organizationId) {
        response.status(400);
        return;
    }
    return Organizations.getPublicOrganizationImages(organizationId as string)
        .then((data) => {
            response.send(data);
            return;
        })
        .catch((error) => {
            response.status(error);
            return;
        });
})