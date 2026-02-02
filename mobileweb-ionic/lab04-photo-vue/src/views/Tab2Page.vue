<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Photo Gallery</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Photo Gallery</ion-title>
        </ion-toolbar>
      </ion-header>

      <div id="student-info" class="ion-text-center ion-padding">
        <h2>รหัสนักศึกษา: 663380504-5</h2>
        <h3>ชื่อ-นามสกุล: ณัฐรภา ศรีวิชา</h3>
      </div>

      <ion-grid>
        <ion-row>
          <ion-col size="6" :key="photo.filepath" v-for="photo in photos">
            <ion-img :src="photo.webviewPath"></ion-img>
          </ion-col>
        </ion-row>
      </ion-grid>

      <ion-fab vertical="bottom" horizontal="center" slot="fixed">
        <ion-fab-button @click="addNewToGallery()">
          <ion-icon :icon="camera"></ion-icon>
        </ion-fab-button>
      </ion-fab>

    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { camera } from 'ionicons/icons';
// เพิ่มการ Import Components ที่ต้องใช้แสดงผลรูปภาพ (IonGrid, IonRow, IonCol, IonImg)
import { 
  IonPage, 
  IonHeader, 
  IonFab, 
  IonFabButton, 
  IonIcon, 
  IonToolbar, 
  IonTitle, 
  IonContent, 
  IonGrid, 
  IonRow, 
  IonCol, 
  IonImg 
} from '@ionic/vue';

import { usePhotoGallery } from '@/composables/usePhotoGallery';

// ดึงตัวแปร photos ออกมาด้วย เพื่อเอาไปวนลูปแสดงผล
const { addNewToGallery, photos } = usePhotoGallery();
</script>

<style scoped>
#student-info {
  margin-top: 10px;
  color: #333;
}
</style>