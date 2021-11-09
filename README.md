# OnlyBtcFans - onlyfans clone without stupid KYC 

This is almost 1-1 clone of onlyfans UI recreated using vuejs and http://quasar.dev 

Demo: https://onlybtcfans.netlify.app

Responsive UI for mobile and web: 

https://user-images.githubusercontent.com/11517372/140610252-fa875614-fc0a-47fd-a8dc-cec4b70b28b4.mp4

Google/Twitter sign ins:

https://user-images.githubusercontent.com/11517372/140610735-71c91e34-6dc8-4ba8-a6ce-eff10eaf17a1.mp4


Sign up with random email and password:


Kanban board [current tasks and status]: https://decisive-indigo-970.notion.site/99d0600bad164704927ebcba0d77c91c?v=1e40dfb3336f4105bd42aa6953735779

Key differences here are a firebase backend and bitcoin deposits/balances [WIP]

<a href="https://imgflip.com/i/5lqzbp"><img src="https://i.imgflip.com/5lqzbp.jpg" title="made at imgflip.com"/></a><div><a href="https://imgflip.com/memegenerator">from Imgflip Meme Generator</a></div>

## Install the dependencies
```bash
yarn
```

## Create new project on firebase and go to console. Then:

1. Enable auth for email, twitter and google (need to have tokens).
2. Create storage with rules (for photos):
```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```
3. Create firestore database.


## Export Firebase env variables.


You will find them in firebase console 



https://user-images.githubusercontent.com/11517372/140612015-b3887efb-ca0e-4548-bb5b-d7233171c6c0.mp4




Copy those into your terminal window:


```
export DEV_API_KEY=AIzaSyDFu_nBypKQkSadsada110CrNfqST4bM
export DEV_AUTH_DOMAIN=casting-165e8.firebaseapp.com
export DEV_PROJECT_ID=casting-165e8
export DEV_STORAGE_BUCKET=casting-165e8.appspot.com
export DEV_MESSAGING_SENDER_ID=836951443352
export DEV_APP_ID=1:836933443352:web:0bd129c935bc9f0d886d
export DEV_MEASUREMENT_ID=G-5FAS5LZ9W5
```

Copy those lines into your ~/.bashrc so you don't need to paste them everytime.   
(yes, it should work differently)

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
