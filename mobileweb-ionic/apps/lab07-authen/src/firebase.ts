// 1. ส่วน Import (เพิ่ม getAuth เข้าไป)
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // <--- เพิ่มบรรทัดนี้

// 2. ส่วน Config (วางค่าที่คุณก๊อปปี้มาทับตรงนี้ได้เลย)
const firebaseConfig = {
  apiKey: "AIzaSyDptAyjHZYGSVnZSvwEFiJYX6_yUFGcFtY",
  authDomain: "lab06-expense-43990.firebaseapp.com",
  projectId: "lab06-expense-43990",
  storageBucket: "lab06-expense-43990.firebasestorage.app",
  messagingSenderId: "884593441112",
  appId: "1:884593441112:web:491d15e87fb2a2025f4d2d"
};

// 3. ส่วน Initialize
const app = initializeApp(firebaseConfig);

// 4. ส่วนสร้าง Auth instance (ต้องเพิ่มเอง โค้ดในรูปไม่มีให้)
const auth = getAuth(app); // <--- เพิ่มบรรทัดนี้

// 5. ส่งออกไปใช้ (Export)
export { auth }; // <--- เพิ่มบรรทัดนี้ เพื่อให้ไฟล์อื่นเรียกใช้ auth ได้