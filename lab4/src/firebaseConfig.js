import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyCP8r-SBvgAAQJmKedgMjYztk27Lt3Csv0",
  authDomain: "lab4-64f30.firebaseapp.com",
  projectId: "lab4-64f30",
  storageBucket: "lab4-64f30.firebasestorage.app",
  messagingSenderId: "669754879256",
  appId: "1:669754879256:web:422a3bee5e51374079826d",
  measurementId: "G-80WLNHXN5W"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };
