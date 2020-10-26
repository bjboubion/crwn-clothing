import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyD_3gR0-ma2I2JHnUJQNbnBpNn7QxZIUhI",
  authDomain: "crwn-db-87aa2.firebaseapp.com",
  databaseURL: "https://crwn-db-87aa2.firebaseio.com",
  projectId: "crwn-db-87aa2",
  storageBucket: "crwn-db-87aa2.appspot.com",
  messagingSenderId: "332177467259",
  appId: "1:332177467259:web:185ed6c67f32be397bffde",
  measurementId: "G-DCKG1E7NP1",
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  console.log(snapShot);
  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
