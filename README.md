# OnlyBtcFans - onlyfans clone without stupid KYC - bitcoin deposits - firebase backend

This is almost 1-1 clone of the onlyfans UI recreated using vuejs and http://quasar.dev 
Key difference here is a firebase backend and bitcoin deposits/balances [WIP]


## Install the dependencies
```bash
yarn
```

## Create new project on firebase and go to console. Then:

1. Enable auth for email, twitter and google (need to have tokens).
2. Create storage with rules (for photos).
3. Create firestore database.


## Add your firebase API keys to .env.

Example what you will need: 

```
# DEV_DATA_BASE_URL=https://quasar-firebase-161e8.firebaseio.com
DEV_API_KEY=AIzaSyDFu_nBypKQkSadsada110CrNfqST4bM
DEV_AUTH_DOMAIN=casting-165e8.firebaseapp.com
DEV_PROJECT_ID=casting-165e8
DEV_STORAGE_BUCKET=casting-165e8.appspot.com
DEV_MESSAGING_SENDER_ID=836951443352
DEV_APP_ID=1:836933443352:web:0bd129c935bc9f0d886d
DEV_MEASUREMENT_ID=G-5FAS5LZ9W5
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)
```bash
QENV=DEV quasar dev
```


### Build the app for production
```bash
QENV=PROD quasar build
```

### Customize the configuration
See [Configuring quasar.conf.js](https://v2.quasar.dev/quasar-cli/quasar-conf-js).
