import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA9hNhz7vq5vttx1E4eW4eaov-33CQjRY8",
  authDomain: "nlw-setup-6b337.firebaseapp.com",
  projectId: "nlw-setup-6b337",
  storageBucket: "nlw-setup-6b337.appspot.com",
  messagingSenderId: "455553716091",
  appId: "1:455553716091:web:f1c57a983603f4131c37de",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
