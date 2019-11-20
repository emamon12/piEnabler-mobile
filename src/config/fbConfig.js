import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBT8CS1nu1PqeMDq_VnMu2LsfOZM_7eMQo",
    authDomain: "piesiue.firebaseapp.com",
    databaseURL: "https://piesiue.firebaseio.com",
    projectId: "piesiue",
    storageBucket: "piesiue.appspot.com",
    messagingSenderId: "567352311341",
    appId: "1:567352311341:web:ac5901cd994e7477"
};

firebase.initializeApp(firebaseConfig);

export default firebase;
