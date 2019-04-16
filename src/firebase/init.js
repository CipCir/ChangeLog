import firebase from 'firebase/app';
import 'firebase/database'
  
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyC12pSHh5Jxu5MtWOLCqYAtJrHDKiPjsww",
    authDomain: "consolelog-8dca4.firebaseapp.com",
    databaseURL: "https://consolelog-8dca4.firebaseio.com",
    projectId: "consolelog-8dca4",
    storageBucket: "consolelog-8dca4.appspot.com",
    messagingSenderId: "444604484740"
  };
  const firebaseApp = firebase.initializeApp(config);
  export default firebaseApp.database()