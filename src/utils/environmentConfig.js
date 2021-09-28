// const ENV = require('dotenv').config().parsed
/*
  Use an environment variable set in package.json scripts to determine
  the applications runtime environment. Add more switch cases as
  need for additional environments. Remember, Firebase recomends supporting
  separate Firebase project for different application environments: httpsq://firebase.google.com/docs/projects/multiprojects#support_different_environments
*/

module.exports = (QENV) => {
  if (!['DEV', 'STAGE', 'PROD'].includes(QENV)) {
    throw Error('Unknown or not supplied environment variable')
  }

  return {
    FIREBASE_CONFIG: {
      apiKey:  process.env[`${QENV}_API_KEY`],
      authDomain:  process.env[`${QENV}_AUTH_DOMAIN`],
      databaseURL:  process.env[`${QENV}_DATA_BASE_URL`],
      projectId: process.env[`${QENV}_PROJECT_ID`],
      storageBucket: process.env[`${QENV}_STORAGE_BUCKET`],
      messagingSenderId:  process.env[`${QENV}_MESSAGING_SENDER_ID`],
      appId: process.env[`${QENV}_APP_ID`]
    },
    BLOCKONOMICS_API_KEY:  process.env[`${QENV}_BLOCKONOMICS_API_KEY`]
  }
}
