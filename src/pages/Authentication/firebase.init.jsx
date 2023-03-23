// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


// const firebaseConfig = {
//   apiKey:"AIzaSyDc1BOUJPIh7N7LS3y6q5WdSquEFhy20Hs",
//   authDomain:process.env.REACT_APP_AUTH_DOMAIN,
//   projectId:process.env.REACT_APP_PROJECT_ID,
//   storageBucket:process.env.REACT_APP_STORAGE_BUCKET,
//   messagingSenderId:process.env.REACT_APP_MESSAGING_SENDER_ID,
//   appId:process.env.REACT_APP_APP_ID,
// };



const firebaseConfig = {
  // apiKey:process.env.REACT_APP_API_KEY,
  apiKey: "AIzaSyDc1BOUJPIh7N7LS3y6q5WdSquEFhy20Hs",
  authDomain: "tools-c2b01.firebaseapp.com",
  projectId: "tools-c2b01",
  storageBucket: "tools-c2b01.appspot.com",
  messagingSenderId: "598507322773",
  appId: "1:598507322773:web:4ab376a506931b0d264a9c",
};





// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app) ;
export default auth ;

