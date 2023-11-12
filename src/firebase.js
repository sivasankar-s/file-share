// firebase.js
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
    apiKey: "AIzaSyDocqDaX_Rfakl4kgAKxH_j-M2EOiPCT8s",
    authDomain: "file-share-d30da.firebaseapp.com",
    projectId: "file-share-d30da",
    storageBucket: "file-share-d30da.appspot.com",
    messagingSenderId: "1068167326642",
    appId: "1:1068167326642:web:a467f64bc8b9e804ae52ab",
    measurementId: "G-N5RJLHV1KZ"
  };

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

