import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDptAyjHZYGSVnZSvwEFiJYX6_yUFGcFtY",
  authDomain: "lab06-expense-43990.firebaseapp.com",
  projectId: "lab06-expense-43990",
  storageBucket: "lab06-expense-43990.firebasestorage.app",
  messagingSenderId: "884593441112",
  appId: "1:884593441112:web:c7dc3751ae8696be5f4d2d"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
