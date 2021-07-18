import firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyDsvNnYNJvozPqo1MxL8iUNw-ovH5dNegI",
  authDomain: "longdo-b5716.firebaseapp.com",
  databaseURL:
    "https://longdo-b5716-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "longdo-b5716",
  storageBucket: "longdo-b5716.appspot.com",
  messagingSenderId: "643231433266",
  appId: "1:643231433266:web:8f8ea85a2d6785df7a722b",
  measurementId: "G-0N2CCKP4W5"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default firebase;
