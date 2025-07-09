// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth"; // ✅ Add this

const firebaseConfig = {
  apiKey: "AIzaSyA4WGIWPFccAgZiqiDjDMPwbeQT8PFnIQo",
  authDomain: "hanashi-beta.firebaseapp.com",
  projectId: "hanashi-beta",
  storageBucket: "hanashi-beta.appspot.com", // ✅ fix: should be .app**spot**.com
  messagingSenderId: "428591119484",
  appId: "1:428591119484:web:b40803b47bf70ba1fc5df9",
  measurementId: "G-XXND8L5ES7",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app); // ✅ Add this

export { db, storage, auth }; // ✅ Export it
