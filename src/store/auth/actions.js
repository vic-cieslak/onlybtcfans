/*
  Remember, we have access to our Vue instance not using
  an arrow function in our actions file. This allows us
  to create a scoped reference to our firebaseService - $fb
  That was assigned to the Vue instance earlier in our serviceConnection
  boot file.
*/

import { firestoreAction } from 'vuexfire'
import User from '../../models/User.js'
import { docRef } from '../../services/firebase/db.js'
import { Notify } from 'quasar'
import 'firebase/firestore';

export const addUserToUsersCollection = function (state, userRef) {
  const
    { email, id, created_at } = state,
    user = new User({ email, id, created_at })

  return userRef.set(user)
}

/**
 * @param {Object} $root - Place holder argument(Vuex store) to allow data to be passed
 *  as second argument.
 * @param data.email - User's email
 * @param data.password - User's password
 * @returns {function} - Firebase services function:
 * src/services/firebase/email.js > createUserWithEmail
 */
export const createNewUser = async function ($root, data) {
  const $fb = this.$fb
  const { email, password } = data
  const id = await $fb.createUserWithEmail(email, password)
  const userRef = docRef('users', id)
  var created_at = $fb.timestamp()
  return addUserToUsersCollection({ email, id, created_at }, userRef)
}

/**
 * @param {Object} $root - Place holder argument(Vuex store) to allow data to be passed
 *  as second argument.
 * @param data.email - User's email
 * @param data.password - User's password
 * @returns {function} - Firebase services function:
 * src/services/firebase/email.js > loginWithEmail
 */
export const loginUser = async function ($root, data) {
  const $fb = this.$fb
  const { email, password } = data
  return $fb.loginWithEmail(email, password)
}

// DRY DRY
export const facebookLoginUser = async function ($root) {
  const $fb = this.$fb
  await $fb.loginWithFacebook()

  const id = user.uid
  const email = user.email
  const doc = await docRef('users', id).get()

  if ( doc.exists == false) { // create firebase profile data document
    var created_at = $fb.timestamp()
    const userRef = docRef('users', id)
    console.log('creating user profile...')
    addUserToUsersCollection({ email, id, created_at }, userRef)
  }

  this.$router.push({
    path: '/user/profile'
  })
}

// DRY DRY
export const googleLoginUser = async function ($root) {
  const $fb = this.$fb
  const user = await $fb.loginWithGoogle()

  const id = user.uid
  const email = user.email
  const doc = await docRef('users', id).get()

  if ( doc.exists == false) { // create firebase profile data document
    var created_at = $fb.timestamp()
    const userRef = docRef('users', id)
    console.log('creating user profile...')
    addUserToUsersCollection({ email, id, created_at }, userRef)
  }

  this.$router.push({
    path: '/user/profile'
  })
}
// DRY DRY
export const twitterLoginUser = async function ($root) {
  const $fb = this.$fb
  const user = await $fb.loginWithTwitter()

  const id = user.uid
  const email = user.email
  const doc = await docRef('users', id).get()

  if ( doc.exists == false) { // create firebase profile data document
    var created_at = $fb.timestamp()
    const userRef = docRef('users', id)
    console.log('creating user profile...')
    addUserToUsersCollection({ email, id, created_at }, userRef)
  }

  this.$router.push({
    path: '/user/profile'
  })
}

/**
 * @returns {function} - Firebase services function:
 * src/services/firebase/email.js > logoutUser
 */
export const logoutUser = async function ({ commit }) {
  try {
    await firestoreAction(({ unbindFirestoreRef }) => { unbindFirestoreRef('currentUser') })
    await this.$fb.logoutUser()

    // no idea what was this for
    // commit('common/setDrawerOpen', false, { root: true })

  } catch (err) {
    Notify.create({
      type: 'webapp_error',
      message: `An error as occured [logoutUser]: ${err}`
    })
  }
}

export function routeUserToAuth () {
  this.$router.push({
    path: '/auth/login'
  })
}

export function routeUserToProfile () {
  this.$router.push({
    path: '/user/profile'
  })
}


