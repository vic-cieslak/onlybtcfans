import firebase from 'firebase/app'
import 'firebase/auth'

// should be more DRY
export const loginWithGoogle = () => {
  var provider = new firebase.auth.GoogleAuthProvider()
  return firebase
  .auth()
  .signInWithPopup(provider)
  .then((result) => {
    /** @type {firebase.auth.OAuthCredential} */
    var credential = result.credential;
    console.log(credential)
    // The signed-in user info.
    var user = result.user;
    console.log(user)

    // This gives you a Facebook Access Token.
    //You can use it to access the Facebook API.
    var accessToken = credential.accessToken;
    console.log(accessToken)
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


