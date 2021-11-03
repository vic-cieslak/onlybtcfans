import { store } from '../../store'
import axios from 'axios'

// Google Cloud Function responsible for verifying
// firebase token and autheticating the user.
// Then it creates a GetStream.io token using user's firebase UID.
const CREATE_TOKEN_ENDPOINT_URL = 'https://europe-central2-alpine-listener-115410.cloudfunctions.net/CreateStreamUserToken'

export const getStreamToken = async (firebaseAuthUser) => {
  firebaseAuthUser.getIdToken().then(firebase_token => {
    store.commit('user/saveFirebaseToken', firebase_token)

    // likely no need to pass firebase_token, can safely delete, but should verify first
    axios.post(CREATE_TOKEN_ENDPOINT_URL, { 'firebase_token': firebaseAuthUser.uid },
    { headers:
      {
        "Firebase-Authorization" : `Bearer ${firebase_token}`,
        "Content-Type": 'application/json'
      }
     }).then(stream_token => {
        store.commit('user/saveStreamToken', stream_token)
        console.log(stream_token)
    })
  });
}
