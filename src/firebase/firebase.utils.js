import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { createContext } from 'react';

const config = {
    apiKey: "AIzaSyByXs_bftwRT8miDoYHHo_oc5wgA4c2Ju0",
    authDomain: "crwn-db-64ed1.firebaseapp.com",
    projectId: "crwn-db-64ed1",
    storageBucket: "crwn-db-64ed1.appspot.com",
    messagingSenderId: "555343711736",
    appId: "1:555343711736:web:d37c4bb4dba7cfcd1f1a0d",
    measurementId: "G-XP2ZDSSRC6"
  };

  export const createUserProfileDocument = async(userAuth, additionalData) => {
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`)

    const snapshot = await userRef.get();

    if(!snapshot.exists){
      const {displayName, email} = userAuth;
      const createdAt = new Date();

      try{
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        })
      }catch(error){
        console.log("Error creating userRef", error.message)
      }
    }
    return userRef;

    console.log(snapshot);
  }

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();


const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider)

export default firebase;