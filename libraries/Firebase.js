import firebase from  'firebase';

// Initialize Firebase
var config = {
   apiKey: "AIzaSyDwhPzBOsvOCYnUEkS81SUxILWHVOJ4pnM",
   authDomain: "loan-app-abebb.firebaseapp.com",
   databaseURL: "https://loan-app-abebb.firebaseio.com",
   projectId: "loan-app-abebb",
   storageBucket: "loan-app-abebb.appspot.com",
   messagingSenderId: "389960132602"
   };


const Firebase = firebase.initializeApp(config);

export default Firebase;