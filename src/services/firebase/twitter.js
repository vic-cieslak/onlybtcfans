import firebase from 'firebase/app'
import 'firebase/auth'
import { store } from '../../store'
import { getStreamToken } from '../getstream/token'

// TODO DRY with google
/**
 * https://firebase.google.com/docs/auth/web/facebook-login?hl=en#web-v8
 * https://firebase.google.com/docs/reference/js/firebase.auth.Auth#signInWithPopup
 */
export const loginWithTwitter = () => {
  var provider = new firebase.auth.TwitterAuthProvider()
  return firebase
  .auth()
  .signInWithPopup(provider)
  .then((result) => {
    /** @type {firebase.auth.OAuthCredential} */
    var credential = result.credential;
    // The signed-in user info.
    var user = result.user;

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


