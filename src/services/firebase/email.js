import firebase from 'firebase/app'
import 'firebase/auth'
import { store } from '../../store'
// import axios from 'axios'
import { getStreamToken } from '../getstream/token'

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

      getStreamToken(user)
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
      getStreamToken(user)
    })
}
