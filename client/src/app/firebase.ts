import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCEUfBiMqDOYDB38XEX0cc1HBBdOAgjYIs",
    authDomain: "shopify-backend-summer-2021.firebaseapp.com",
    projectId: "shopify-backend-summer-2021",
    storageBucket: "shopify-backend-summer-2021.appspot.com",
    messagingSenderId: "311782313611",
    appId: "1:311782313611:web:7abbe68ea5393ccd470e8e"
};;

firebase.initializeApp(firebaseConfig);

export default firebase;
export const auth: firebase.auth.Auth = firebase.auth();
export const firestore: firebase.firestore.Firestore = firebase.firestore();
export const storage: firebase.storage.Storage = firebase.storage();