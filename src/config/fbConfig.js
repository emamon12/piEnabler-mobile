import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyACVDHy4exTnb-vSiIGJmoOyqFMRm3dX5Q",
    authDomain: "red-name.firebaseapp.com",
    databaseURL: "https://red-name.firebaseio.com",
    projectId: "red-name",
    storageBucket: "",
    messagingSenderId: "451668312999",
    appId: "1:451668312999:web:866bede56cbcf043"
};

firebase.initializeApp(firebaseConfig);
firebase.firestore().settings({timestampsInSnapshots: true});

export default firebase