import firebase from 'firebase/app'
import 'firebase/auth'
import { store } from '../../store'

/**
 * https://firebase.google.com/docs/reference/js/firebase.auth.Auth#createuserwithemailandpassword
 * @param {String} email - A Valid email
 * @param {String} password - Password
 * @returns {Promise} - UserCredentials https://firebase.google.com/docs/reference/js/firebase.auth#usercredential
 */
export const createUserWithEmail = async (email, password) => {
  return firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((result) => {
      var user = result.user;


      user.getIdToken().then(token => {
        store.commit('user/saveStreamToken', token)
      });
      return user.uid
    })
}

/**
 * https://firebase.google.com/docs/reference/js/firebase.auth.Auth#signinwithemailandpassword
 * @param {String} email - A Valid email
 * @param {String} password - Password
 * @returns {Promise} - UserCredentials https://firebase.google.com/docs/reference/js/firebase.auth#usercredential
 */
export const loginWithEmail = (email, password) => {
  return firebase.auth().signInWithEmailAndPassword(email, password)
    .then((result) => {
      var user = result.user;

      user.getIdToken().then(token => {
        store.commit('user/saveStreamToken', token)
      });
    })
}
