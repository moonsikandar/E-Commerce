
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
const firebaseConfig = {
  apiKey: "AIzaSyDsqMjXtQVGkjHhzp8For1-DcWJ_OGr60s",
  authDomain: "e-commerce-f8b0a.firebaseapp.com",
  projectId: "e-commerce-f8b0a",
  storageBucket: "e-commerce-f8b0a.appspot.com",
  messagingSenderId: "766901168645",
  appId: "1:766901168645:web:871618794cac480ce20a6c"
};


const app = initializeApp(firebaseConfig);

export const auth =getAuth(app)