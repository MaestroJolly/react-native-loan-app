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