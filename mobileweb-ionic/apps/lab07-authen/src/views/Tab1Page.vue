<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Tab 1 - Profile</ion-title>
        <ion-buttons slot="end">
          <ion-button @click="handleLogout">Logout</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    
    <ion-content :fullscreen="true" class="ion-padding ion-text-center">
      <div v-if="currentUser">
        <ion-avatar style="margin: 0 auto; width: 100px; height: 100px;">
          <img :src="currentUser.photoUrl || 'https://ionicframework.com/docs/img/demos/avatar.svg'" />
        </ion-avatar>
        
        <h2>ยินดีต้อนรับ</h2>
        <p><strong>ชื่อ:</strong> {{ currentUser.displayName || 'ไม่ระบุ' }}</p>
        <p><strong>Email:</strong> {{ currentUser.email }}</p>
        <p><strong>UID:</strong> {{ currentUser.uid }}</p>
      </div>

      <ExploreContainer name="Tab 1 page" />
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { 
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, 
  IonAvatar, IonButton, IonButtons 
} from '@ionic/vue';
import ExploreContainer from '@/components/ExploreContainer.vue';
import { ref, onMounted } from 'vue';
import { authService } from '@/auth/auth-service';
import { useRouter } from 'vue-router';
import type { AuthUser } from '@/auth/auth-interface';

const router = useRouter();
const currentUser = ref<AuthUser | null>(null);

// ใช้ onMounted เพื่อดึงข้อมูล User เมื่อหน้าจอโหลดเสร็จ
onMounted(async () => {
  const user = await authService.getCurrentUser();
  currentUser.value = user;
});

const handleLogout = async () => {
  await authService.logout();
  router.replace('/login'); // ออกจากระบบแล้วส่งไปหน้า Login
};
</script>