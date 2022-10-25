import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import 'firebase/compat/storage';
import firebaseConfig from './env';

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}
const firestore = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();


export { firestore, auth,storage };