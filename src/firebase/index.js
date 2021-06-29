import firebase from "firebase/app";
import "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCgnTY0L1Y7k81WBDBUaNWkEYuPcibBnh0",
    authDomain: "banksampah-81deb.firebaseapp.com",
    projectId: "banksampah-81deb",
    storageBucket: "banksampah-81deb.appspot.com",
    messagingSenderId: "713116523278",
    appId: "1:713116523278:web:b4bc05c42607cb065bd55f",
};

const fire = !firebase.apps.length
    ? firebase.initializeApp(firebaseConfig)
    : firebase.app();

const storage = firebase.storage();

export { storage, fire as default };
