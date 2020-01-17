
const firebase = require('firebase');
require('firebase/firestore');


const config = {
  apiKey: "AIzaSyDjLus34AI6VbrpX_C6EYsIg-jIyAJ7Quk",
  authDomain: "let-s-chat-6cdaf.firebaseapp.com",
  databaseURL: "https://let-s-chat-6cdaf.firebaseio.com",
  projectId: "let-s-chat-6cdaf",
  storageBucket: "let-s-chat-6cdaf.appspot.com",
  messagingSenderId: "421844590389",
  appId: "1:421844590389:web:278f8ff6d78a3de742b67c"
};







  export default !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();