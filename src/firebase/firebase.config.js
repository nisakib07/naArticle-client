import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyD953Iy98AOM5orr_TZLXbeZ84mjwZMeXc",
  authDomain: "assignmentb8-12-client.firebaseapp.com",
  projectId: "assignmentb8-12-client",
  storageBucket: "assignmentb8-12-client.appspot.com",
  messagingSenderId: "730423181124",
  appId: "1:730423181124:web:51a4dfb40e045fd16e6111",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;
