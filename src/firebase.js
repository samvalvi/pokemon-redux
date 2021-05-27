import firebase from 'firebase/app'
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyA0WuxvWBRajZMUQeoQq8b04trE9E-9Bns",
    authDomain: "login-react-77aff.firebaseapp.com",
    projectId: "login-react-77aff",
    storageBucket: "login-react-77aff.appspot.com",
    messagingSenderId: "247882280675",
    appId: "1:247882280675:web:4b6b34e6b69811884e1fd6"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
export {auth, firebase}