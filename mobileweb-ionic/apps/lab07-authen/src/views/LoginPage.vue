<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Login</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding ion-text-center">
      <div class="login-container">
        <h2>ยินดีต้อนรับ</h2>
        <p>กรุณาเลือกวิธีเข้าสู่ระบบ</p>

        <!-- EMAIL LOGIN -->
        <ion-item lines="full">
          <ion-label position="stacked">Email</ion-label>
          <ion-input v-model="email" type="email"></ion-input>
        </ion-item>

        <ion-item lines="full">
          <ion-label position="stacked">Password</ion-label>
          <ion-input v-model="password" type="password"></ion-input>
        </ion-item>

        <ion-button expand="block" @click="handleEmailLogin" class="ion-margin-top">
          Login with Email
        </ion-button>

        <ion-item-divider class="ion-margin-vertical">OR</ion-item-divider>

        <!-- GOOGLE LOGIN -->
        <ion-button expand="block" color="danger" @click="handleGoogleLogin">
          <ion-icon slot="start" :icon="logoGoogle"></ion-icon>
          Login with Google
        </ion-button>

        <!-- PHONE LOGIN -->
        <ion-button
          expand="block"
          color="success"
          @click="showPhoneInput = !showPhoneInput"
          class="ion-margin-top"
        >
          <ion-icon slot="start" :icon="callOutline"></ion-icon>
          Login by Phone
        </ion-button>

        <div v-if="showPhoneInput" class="ion-margin-top">

          <!-- INPUT PHONE -->
          <ion-item>
            <ion-input
              v-model="phoneNumber"
              type="tel"
              maxlength="10"
              placeholder="0845172812"
              @ionInput="onPhoneInput"
            ></ion-input>
          </ion-item>

          <ion-button
            size="small"
            @click="handlePhoneLogin"
            :disabled="phoneNumber.length !== 10 || loading"
          >
            ส่งรหัส OTP
          </ion-button>

          <!-- OTP -->
          <div v-if="otpSent" class="ion-margin-top">
            <ion-item>
              <ion-input
                v-model="otpCode"
                type="tel"
                maxlength="6"
                placeholder="กรอกรหัส OTP 6 หลัก"
              ></ion-input>
            </ion-item>

            <ion-button
              size="small"
              @click="handleVerifyOtp"
              :disabled="otpCode.length !== 6 || loading"
            >
              ยืนยันรหัส
            </ion-button>
          </div>
        </div>

        <div id="recaptcha-container"></div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonItem, IonLabel, IonInput, IonButton, IonIcon, IonItemDivider
} from '@ionic/vue';

import { logoGoogle, callOutline } from 'ionicons/icons';
import { authService } from '@/auth/auth-service';
import { useRouter } from 'vue-router';

const router = useRouter();

// EMAIL
const email = ref('');
const password = ref('');

// PHONE
const showPhoneInput = ref(false);
const phoneNumber = ref('');
const otpCode = ref('');
const otpSent = ref(false);
const verificationId = ref('');

const loading = ref(false);

// 🔥 รับเฉพาะตัวเลข + จำกัด 10 หลัก
const onPhoneInput = () => {
  phoneNumber.value = phoneNumber.value.replace(/[^0-9]/g, '').slice(0, 10);
};

// ไปหน้า tab1 เมื่อ login สำเร็จ
const loginSuccess = () => {
  router.push('/tabs/tab1');
};

// EMAIL LOGIN
const handleEmailLogin = async () => {
  try {
    loading.value = true;

    await authService.loginWithEmailPassword({
      email: email.value,
      password: password.value
    });

    loginSuccess();
  } catch (error: any) {
    alert('Login Failed: ' + error.message);
  } finally {
    loading.value = false;
  }
};

// GOOGLE LOGIN
const handleGoogleLogin = async () => {
  try {
    loading.value = true;

    await authService.loginWithGoogle();
    loginSuccess();

  } catch (error: any) {
    alert('Google Login Failed: ' + error.message);
  } finally {
    loading.value = false;
  }
};

// STEP 1: SEND OTP
const handlePhoneLogin = async () => {
  try {
    loading.value = true;

    const res = await authService.startPhoneLogin({
      phoneNumberE164: phoneNumber.value
    });

    verificationId.value = res.verificationId;
    otpSent.value = true;

    alert('ส่งรหัส OTP เรียบร้อยแล้ว');

  } catch (error: any) {
    alert('Phone Login Failed: ' + error.message);
  } finally {
    loading.value = false;
  }
};

// STEP 2: VERIFY OTP
const handleVerifyOtp = async () => {
  try {
    loading.value = true;

    await authService.confirmPhoneCode({
      verificationId: verificationId.value,
      verificationCode: otpCode.value
    });

    loginSuccess();

  } catch (error: any) {
    alert('OTP ไม่ถูกต้อง: ' + error.message);
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 0 auto;
  margin-top: 50px;
}

#recaptcha-container {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}
</style>
