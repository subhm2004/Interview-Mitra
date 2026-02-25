import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "interview-cf862.firebaseapp.com",
  projectId: "interview-cf862",
  storageBucket: "interview-cf862.firebasestorage.app",
  messagingSenderId: "844408640419",
  appId: "1:844408640419:web:bccdec4a4837d0878e8016",
  measurementId: "G-M37YDK8PM3"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);
const provider = new GoogleAuthProvider();

export { auth, provider, storage };