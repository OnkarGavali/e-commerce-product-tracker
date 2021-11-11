import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import 'firebase/compat/auth'

const config = {
  apiKey: "AIzaSyDGwdNT5V2s1Y8Wpfdv6tXcu33GTBplYz0",
  authDomain: "mp2-auth.firebaseapp.com",
  projectId: "mp2-auth",
  storageBucket: "mp2-auth.appspot.com",
  messagingSenderId: "723715926031",
  appId: "1:723715926031:web:2c178dc461aa22d796db7a",
  measurementId: "G-3GTVJGKRW8"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth){
        return;
    }
    const userRef =  firestore.doc(`users/${userAuth.uid}`)
    const snapShot = await userRef.get()
    
    if(!snapShot.exists){
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try{
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch( error){
            console.log('error creating user',error.message)
        }
    }
    return userRef;
    //console.log(snapShot)
}

firebase.initializeApp(config);
export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt:'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);


export default firebase;