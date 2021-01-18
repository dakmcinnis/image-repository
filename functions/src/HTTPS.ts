/* Common handlers for HTTPS Requests */

import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

/**
 * Verify that the 'authorization' header is valid.
 * @param request - the request object of an https request
 */
export const isAuthorized = async (request: functions.https.Request): Promise<string> => {
    const { authorization } = request.headers;
    return new Promise((resolve, reject) => {
        admin.auth()
            .verifyIdToken(authorization || '')
            .then((decodedToken) => decodedToken.uid)
            .then((uid) => {
                console.log(
                    `Request is authorized as ${uid}.`
                );
                resolve(uid);
                return;
            })
            .catch(error => {
                console.error(
                    `Unable to authorize user.`
                );
                reject(error);
                return;
            })
    });
};
