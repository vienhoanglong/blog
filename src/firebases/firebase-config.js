import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDXvI4KAuERcaYAT06_NE6Ss5IKII_Ic9U",
  authDomain: "my-blog-5b8fa.firebaseapp.com",
  projectId: "my-blog-5b8fa",
  storageBucket: "my-blog-5b8fa.appspot.com",
  messagingSenderId: "734445201370",
  appId: "1:734445201370:web:6a74ff1faeb624f90d82e3",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app)