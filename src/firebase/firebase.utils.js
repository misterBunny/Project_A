import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const config= {
    apiKey: "AIzaSyBz6IlNfpl78ofeglssm4LuNVB658v656U",
    authDomain: "projecta-88acb.firebaseapp.com",
    databaseURL: "https://projecta-88acb.firebaseio.com",
    projectId: "projecta-88acb",
    storageBucket: "projecta-88acb.appspot.com",
    messagingSenderId: "224632467616",
    appId: "1:224632467616:web:d139c348c70760905899c5",
    measurementId: "G-E1X8MDJZS9"
}

export const createUserProfileDocument= async (userAuth, additionalData) => {
    if(!userAuth) return;

    const userRef= firestore.doc(`users/${userAuth.uid}`)
    const snapshot= await userRef.get();

    if(!snapshot.exisits){
        const {displayName, email}= userAuth
        const createdAt= new Date()
    

     try {
      await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
      })
     } catch (error) {
        console.log(error.message)
     }
    }
    console.log(userRef)
    return userRef
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

//Facebook SignIn with POPUP
const provider= new firebase.auth.FacebookAuthProvider()
provider.setCustomParameters({prompt: 'http://www.facebook.com'})
export const signInWithFacebook = () => auth.signInWithPopup(provider)

//Google SignIn with POPUP
const providerG= new firebase.auth.GoogleAuthProvider()
providerG.setCustomParameters({prompt: 'select_account'})
export const signInWithGoogle = () => auth.signInWithPopup(providerG)

export default firebase