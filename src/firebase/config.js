// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {getFirestore} from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAjop84xuXjrE_5cC25cvtXE2aw1c6umDQ",
    authDomain: "vue-pizza-68f59.firebaseapp.com",
    projectId: "vue-pizza-68f59",
    storageBucket: "vue-pizza-68f59.appspot.com",
    messagingSenderId: "116911324478",
    appId: "1:116911324478:web:85324e50e34eb1003c406f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const firestore = getFirestore(app)