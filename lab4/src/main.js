import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCP8r-SBvgAAQJmKedgMjYztk27Lt3Csv0",
  authDomain: "lab4-64f30.firebaseapp.com",
  projectId: "lab4-64f30",
  storageBucket: "lab4-64f30.firebasestorage.app",
  messagingSenderId: "669754879256",
  appId: "1:669754879256:web:422a3bee5e51374079826d",
  measurementId: "G-80WLNHXN5W"
};

initializeApp(firebaseConfig);

createApp(App).use(router).mount("#app");
