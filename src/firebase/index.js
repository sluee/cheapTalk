import { initializeApp } from "firebase/app";
import {  getAuth } from "firebase/auth"
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyD-wI9j7kS8q2AR_iN4OSVv5Fp4-8Vh_sg",
  authDomain: "cheaptalk-7b0c8.firebaseapp.com",
  projectId: "cheaptalk-7b0c8",
  storageBucket: "cheaptalk-7b0c8.appspot.com",
  messagingSenderId: "150353215602",
  appId: "1:150353215602:web:61325357cba0d5c2a5c2eb"
};

// Initialize Firebase


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth  = getAuth(app); 
export {auth}
export{db}