/* Managing organization data in Firestore */

import * as admin from 'firebase-admin';
import * as Users from './Users';
import * as Images from './Images';

// The root-level organizations collection
export const ORGANIZATIONS_COLLECTION: string = "organizations";
// The child connections of an organization document
export enum SUB_COLLECTIONS {
    pending = "pending",
    public = "public",
}

/**
 * The fields on an organization's document.
 */
interface OrganizationData {
    ownerId: string;
    adminId: string[];
    memberPrivateKey: string;
}

/**
 * Add the organization to Firestore.
 * 
 * @param ownerId - the id of the organization's owner
 * @param organizationId - the id of the organization
 */
export const addOrganization = async (ownerId: string, organizationId: string) => {
    const memberPrivateKey = generateId(ownerId.length);
    return new Promise((resolve, reject) => {
        const p1 = createOrganizationDocument(ownerId, organizationId, memberPrivateKey);
        const p2 = addUserToOrganization(ownerId, organizationId, memberPrivateKey);
        Promise.all([p1, p2])
            .then((results) => resolve(true))
            .catch((errors) => reject(errors));
    });
};

/**
 * Create the document: ./organizations/{organizationId}.
 * Its content will be of type OrganizationData.
 * 
 * @param ownerId - the id of the organization's owner
 * @param organizationId - the id of the organization
 * @param memberPrivateKey - a key that only members should have
 */
const createOrganizationDocument = async (ownerId: string, organizationId: string, memberPrivateKey: string) => {
    const documentData: OrganizationData = { ownerId, adminId: [], memberPrivateKey };
    return new Promise((resolve, reject) => {
        admin.firestore()
            .collection(ORGANIZATIONS_COLLECTION)
            .doc(organizationId)
            .set(documentData)
            .then(result => {
                console.log(
                    `Organization ${organizationId} has been added to the organizations collection.`
                );
                resolve(organizationId);
            }).catch(error => {
                console.error(
                    `Unable to add organization ${organizationId} to the organizations collection.`
                );
                reject(error)
            });
    });
};

/**
 * Modify the document: ./users/{memberId}.
 * Its organizations map will contain the key-value pair "organizationId: memberPrivateKey".
 * 
 * @param ownerId - the id of the organization's owner
 * @param organizationId - the id of the organization
 * @param memberPrivateKey - a key that only members should have
 */
export const addUserToOrganization = async (memberId: string, organizationId: string, memberPrivateKey: string) => {
    const documentUpdate = {
        [ORGANIZATIONS_COLLECTION]: {
            [organizationId]: memberPrivateKey,
        },
    };

    return new Promise((resolve, reject) => {
        admin.firestore()
            .collection(Users.USERS_COLLECTION)
            .doc(memberId)
            .set(documentUpdate, { merge: true })
            .then(result => {
                console.log(
                    `The user ${memberId} was made a member of ${organizationId}.`
                );
                resolve(memberId);
            }).catch(error => {
                console.error(
                    `The user ${memberId} was not made a member of ${organizationId}.`
                );
                reject(error)
            });
    })
};


// export const isUserOrganizationMember = async (memberId: string, organizationId: string) => {
//     return new Promise((resolve, reject) => {
//         const p1 = getOrganizationData(organizationId);
//         const p2 = addUserToOrganization(memberId);
//         Promise.all([p1, p2])
//             .then((results) => resolve(true))
//             .catch((errors) => reject(errors));
//     });
// }

export const getOrganizationData = async (organizationId: string) => {
    return new Promise((resolve, reject) => {
        admin.firestore()
            .collection(ORGANIZATIONS_COLLECTION)
            .doc(organizationId)
            .get()
            .then((doc) => doc.data() as OrganizationData)
            .then(data => resolve(data))
            .catch(error => reject(error));
    });
};

export const getPublicOrganizationImages = async (organizationId: string) => {
    const location = `${ORGANIZATIONS_COLLECTION}/${organizationId}/${SUB_COLLECTIONS.public}`;
    return new Promise((resolve, reject) => {
        admin.firestore()
            .collection(location)
            .get()
            .then((query) => {
                const data = []
                query.forEach((q) => data.push(q.data() as Images.ImageData));
            })
            .then(data => resolve(data))
            .catch(error => reject(error));
    });
};

const generateId = (length: number) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
};
