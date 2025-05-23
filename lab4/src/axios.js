import axios from "axios";
import { getAuth, signOut } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

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
getAnalytics();

const api = axios.create({
  baseURL: "http://localhost:5173/",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        const auth = getAuth();
        const user = auth.currentUser;
        if (user) {
          const refreshedToken = await user.getIdToken(true);
          localStorage.setItem("accessToken", refreshedToken);
          api.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${refreshedToken}`;
          originalRequest.headers["Authorization"] = `Bearer ${refreshedToken}`;
          return api(originalRequest);
        } else {
          signOut(auth);
          window.location.href = "/login";
        }
      } catch (tokenRefreshError) {
        return Promise.reject(tokenRefreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
