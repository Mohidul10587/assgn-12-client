// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDc1BOUJPIh7N7LS3y6q5WdSquEFhy20Hs",
  authDomain: "tools-c2b01.firebaseapp.com",
  projectId: "tools-c2b01",
  storageBucket: "tools-c2b01.appspot.com",
  messagingSenderId: "598507322773",
  appId: "1:598507322773:web:4ab376a506931b0d264a9c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app) ;
export default auth ;