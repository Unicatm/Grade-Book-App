import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDiQPlfbyH575UFy_gIUFDJSVAh7r92wOw",
  authDomain: "proiecttic-aa464.firebaseapp.com",
  projectId: "proiecttic-aa464",
  storageBucket: "proiecttic-aa464.firebasestorage.app",
  messagingSenderId: "215403862767",
  appId: "1:215403862767:web:039e39e73e99b25302191a",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
