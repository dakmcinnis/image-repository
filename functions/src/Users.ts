/* Managing user data in Firestore. */

import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { UserRecord } from 'firebase-functions/lib/providers/auth';

// The root-level users collection
export const USERS_COLLECTION: string = "users";
// The child connections of a user document
export enum SUB_COLLECTIONS {
    uploads = "uploads",
}

/**
 * The fields on an organization's document.
 */
interface UserData {
    uid: string;
    email: string;
}

/**
 * Create the document: ./users/{uid}.
 * Its content will be of type UserData.
 * 
 * @param user the UserRecord pertaining to the user being added.
 */
export const addUser = async (user: UserRecord) => {
    const { uid, email } = user as UserRecordWithEmail;
    const documentData: UserData = { uid, email };
    return new Promise((resolve, reject) => {
        admin.firestore()
            .collection(USERS_COLLECTION)
            .doc(uid)
            .set(documentData)
            .then(result => {
                console.log(
                    `User ${uid} has been added to the users collection.`
                );
                resolve(uid);
            }).catch(error => {
                console.error(
                    `Unable to add user ${uid} to the users collection.`
                );
                reject(error)
            });
    });
};

/**
 * Remove the document: ./users/{uid}.
 * @param user the UserRecord pertaining to the user being removed.
 */
export const removeUser = async (user: UserRecord) => {
    const { uid, email } = user;
    return new Promise((resolve, reject) => {
        admin.firestore()
            .collection(USERS_COLLECTION)
            .doc(uid)
            .delete()
            .then(result => {
                functions.logger.info(
                    `User ${email} has been removed from the users collection.`
                );
                resolve(uid);
            }).catch(error => {
                functions.logger.error(
                    `Unable to remove user ${email} from the users collection.`
                );
                reject(error);
            });
    });
}

export const getUserData = async (userId: string) => {
    return new Promise((resolve, reject) => {
        admin.firestore()
            .collection(USERS_COLLECTION)
            .doc(userId)
            .get()
            .then((doc) => doc.data() as UserData)
            .then(data => resolve(data))
            .catch(error => reject(error));
    });
};

interface UserRecordWithEmail extends UserRecord {
    email: string;
}
