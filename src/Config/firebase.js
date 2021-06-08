import  firebase from 'firebase'

// Initialize Firebase
var firebaseConfig = {
    apiKey: "AIzaSyBTRlSBesi8e3FuqfUKh5IR7U1dxJmked0",
    authDomain: "tp-reactrobledo.firebaseapp.com",
    projectId: "tp-reactrobledo",
    storageBucket: "tp-reactrobledo.appspot.com",
    messagingSenderId: "672841977879",
    appId: "1:672841977879:web:c95d35576ad8bc9cd74c52"
  };
  firebase.initializeApp(firebaseConfig);
  firebase.auth = firebase.auth();
  firebase.db=firebase.firestore();
  export default firebase;