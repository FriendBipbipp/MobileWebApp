// 1. IMPORT ต้องอยู่บนสุดเสมอ
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithPhoneNumber,
  RecaptchaVerifier,
  type ConfirmationResult
} from "firebase/auth";

import type {
  AuthUser,
  IAuthService,
  EmailPasswordCredentials,
  PhoneCredentials
} from "./auth-interface";


// 2. CONFIG
const firebaseConfig = {
  apiKey: "AIzaSyDptAyjHZYGSVnZSvwEFiJYX6_yUFGcFtY",
  authDomain: "lab06-expense-43990.firebaseapp.com",
  projectId: "lab06-expense-43990",
  storageBucket: "lab06-expense-43990.firebasestorage.app",
  messagingSenderId: "884593441112",
  appId: "1:884593441112:web:491d15e87fb2a2025f4d2d"
};


// 3. INITIALIZE
export const firebaseApp = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(firebaseApp);


// ✅ แปลงเบอร์ไทย → E.164
function toE164Thai(phone: string): string {
  const cleaned = phone.replace(/\D/g, "");

  if (cleaned.startsWith("0")) {
    return "+66" + cleaned.substring(1);
  }

  if (cleaned.startsWith("66")) {
    return "+" + cleaned;
  }

  if (phone.startsWith("+66")) {
    return phone;
  }

  throw new Error("รูปแบบเบอร์โทรไม่ถูกต้อง");
}


// แปลง user → interface
function mapUser(u: any): AuthUser {
  return {
    uid: u.uid,
    email: u.email,
    displayName: u.displayName,
    photoUrl: u.photoURL,
    phoneNumber: u.phoneNumber || null
  };
}


// ตัวแปรสำหรับ Phone Auth
let verifier: RecaptchaVerifier | null = null;
let confirmationResult: ConfirmationResult | null = null;

const recaptchaContainerId = "recaptcha-container";


// สร้าง Recaptcha
export function getRecaptchaVerifier(containerId: string): RecaptchaVerifier {
  if (!verifier) {
    verifier = new RecaptchaVerifier(firebaseAuth, containerId, {
      size: "invisible"
    });
  }
  return verifier;
}


// 4. CLASS SERVICE
export class FirebaseWebAuthService implements IAuthService {

  async getCurrentUser(): Promise<AuthUser | null> {
    await firebaseAuth.authStateReady();
    return firebaseAuth.currentUser
      ? mapUser(firebaseAuth.currentUser)
      : null;
  }

  async loginWithEmailPassword(
    creds: EmailPasswordCredentials
  ): Promise<AuthUser> {

    const r = await signInWithEmailAndPassword(
      firebaseAuth,
      creds.email,
      creds.password!
    );

    return mapUser(r.user);
  }

  async loginWithGoogle(): Promise<AuthUser> {
    const provider = new GoogleAuthProvider();
    const r = await signInWithPopup(firebaseAuth, provider);
    return mapUser(r.user);
  }

  async logout(): Promise<void> {
    await firebaseAuth.signOut();
  }


  // ✅ เริ่ม login ด้วยเบอร์โทร (รองรับ 084xxxxxxx)
  async startPhoneLogin(
    creds: PhoneCredentials
  ): Promise<{ verificationId: string }> {

    const appVerifier = getRecaptchaVerifier(recaptchaContainerId);

    try {
      const phoneE164 = toE164Thai(creds.phoneNumberE164);

      confirmationResult = await signInWithPhoneNumber(
        firebaseAuth,
        phoneE164,
        appVerifier
      );

      return {
        verificationId: confirmationResult.verificationId
      };

    } catch (error) {

      if (appVerifier) appVerifier.clear();
      verifier = null;

      throw error;
    }
  }


  // ✅ ยืนยัน OTP
  async confirmPhoneCode(payload: {
    verificationId: string;
    verificationCode: string;
  }): Promise<AuthUser> {

    if (!confirmationResult) {
      throw new Error("No confirmation result");
    }

    const r = await confirmationResult.confirm(
      payload.verificationCode
    );

    return mapUser(r.user);
  }
}
