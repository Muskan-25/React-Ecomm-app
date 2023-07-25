// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAKNw6tVkVfeKqTV9hIEPR1WydeWvU_W5w",
  authDomain: "ecommerce-cake-app.firebaseapp.com",
  projectId: "ecommerce-cake-app",
  storageBucket: "ecommerce-cake-app.appspot.com",
  messagingSenderId: "373446885797",
  appId: "1:373446885797:web:33ad608720c63bf751e84c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);