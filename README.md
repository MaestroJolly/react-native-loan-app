# Simple React Native Loan App

This is a simple loan application created in react native and firebase with Rave APIs used in handling various payments.

## Table Of Contents
- [Prerequisites](#prerequisites)
- [Dependencies](#dependencies)
- [How To Set It Up Locally](#how-to-set-it-up-locally)
- [Contributions](#contributions)

## Prerequisites

- Rave [Test](https://ravesandbox.flutterwave.com) and [Live](https://rave.flutterwave.com/) Accounts
- [Node](https://nodejs.org/) and [NPM](https://www.npmjs.com/) (mostly together as a package)
- [React-Native CLI](https://www.npmjs.com/package/react-native-cli) or [Create-React-Native-App](https://facebook.github.io/react-native/docs/getting-started.html).
- [Rave React-Native SDK](https://github.com/Flutterwave/rave-react-native).
- [Firebase Account](https://firebase.google.com/)
- [Expo](https://expo.io) (Optional, used as our debugging tool)

## Dependencies

Running `$ npm install` in your terminal, which installs:

- `react-navigation`
- `firebase`
- `react-native-rave`

## How To Set It Up Locally

`Note:` We need Rave [Test](https://ravesandbox.flutterwave.com) or/and [Live](https://rave.flutterwave.com/) account run this app.

Also ensure you have [Expo](https://expo.io) CLI installed and also Expo Client installed on your mobile phone depending on your phone type Google Play for [Android phones](https://play.google.com/store/apps/details?id=host.exp.exponent&referrer=www) and [Apple Store](https://itunes.apple.com/app/apple-store/id982107779) for iOs mobile phones to scan the qr code displayed on the terminal window.

To use this project locally you can clone this repo here:

- Open your Terminal/Command Prompt
- ```$ git clone https://github.com/MaestroJolly/react-native-loan-app```
- ```$ cd react-native-loan``` // change directory into cloned app directory
- ```$ npm install``` // To install all dependencies
- ```$ expo start``` // This is used to start our project from the Expo CLI

### File Structure

```
react-native-loan-app
+ assets
+ components
- libraries
 - Firebase.js
- screens
 - AccountScreen.js
 - ApplyScreen.js
 - BvnScreen.js
 - ChargeScreen.js
 - HistoryScreen.js
 - HomeScreen.js
- src
 - assets
- App.js
- package.json
```

After the app has been successfully scanned and built, it should bring out this:

<img src="https://res.cloudinary.com/maestrojolly/image/upload/v1541283311/loan-app/Loan-Apps-Screens.jpg" style="text-align: center; max-height: 400;" alt="Loan App Screen">

> For Our Firebase Database, you need to open a firebase account [here](https://firebase.google.com/), then open the libraries directory in our project directory after that we then add your database configuration to file `Firebase.js` which has this code sample:

```
import firebase from  'firebase';

// Initialize Firebase
var config = {
    apiKey: "<YOUR-FIREBASE-API-KEY>",
    authDomain: "<YOUR-FIREBASE-AUTH-DOMAIN>",
    databaseURL: "<YOUR-FIREBASE-DATABASE-URL>",
    projectId: "<PROJECT_ID>",
    storageBucket: "<YOUR-FIREBASE-STORAGE-BUCKET>",
    messagingSenderId: "<SENDER_ID>"
    };
    

const Firebase = firebase.initializeApp(config);

export default Firebase;

```

## Contributions

You are welcome to fork and and test out this sample loan app project.