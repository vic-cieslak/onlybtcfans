import firebaseServices from '../services/firebase'

export default ({ store, app }) => {
  firebaseServices.fBInit(process.env.QENV.FIREBASE_CONFIG)

  // Tell the application what to do when the
  // authentication state has changed
  firebaseServices.auth().onAuthStateChanged((user) => {
    firebaseServices.handleOnAuthStateChanged(store, user)
  }, (error) => {
    console.error(error)
  })

  app.config.globalProperties.$fb = firebaseServices
  store.$fb = firebaseServices
}
