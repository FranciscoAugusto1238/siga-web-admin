import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDr0DMz0DpzSMPaHfXwZEbI4Mm5YHdkfYo",
  authDomain: "aom-login.firebaseapp.com",
  projectId: "aom-login",
  storageBucket: "aom-login.appspot.com",
  messagingSenderId: "915787193152",
  appId: "1:915787193152:web:9f77968fb95cb0c98378a5",
  measurementId: "G-GMCMYLKHV7"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
