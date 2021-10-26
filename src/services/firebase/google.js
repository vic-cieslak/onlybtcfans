import firebase from 'firebase/app'
import 'firebase/auth'
import { store } from '../../store'
import { getStreamToken } from '../getstream/token'

// should be more DRY
export const loginWithGoogle = () => {
  var provider = new firebase.auth.GoogleAuthProvider()
  return firebase
  .auth()
  .signInWithPopup(provider)
  .then((result) => {
    /** @type {firebase.auth.OAuthCredential} */
    // var credential = result.credential;
    // The signed-in user info.
    var user = result.user;

    // This gives you a Google Access Token.
    //You can use it to access the Google API.
    // var accessToken = credential.accessToken;

    getStreamToken(user)

    return user
    // ...
  })
  .catch((error) => {
    // Handle Errors here.

    console.log('error wtf')
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    console.log(errorCode)
    console.log(errorMessage)
    console.log(email)
    console.log(credential)
    // ...
  });
}


