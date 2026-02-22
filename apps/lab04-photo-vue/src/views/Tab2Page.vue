<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Photo Gallery</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <!-- Large title (condensed header) -->
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Photo Gallery</ion-title>
        </ion-toolbar>
      </ion-header>

      <!-- Student information -->
      <div class="student-info ion-padding">
        <p><strong>โดย ณัฐรภา ศรีวิชา รหัส:</strong> 663380504-5</p>
      </div>

      <!-- Floating Action Button (Camera) -->
      
      <ion-fab vertical="bottom" horizontal="center" slot="fixed">
        <!-- CHANGE: Add a click event listener to the floating action button. -->
        <ion-fab-button @click="addNewToGallery()">
          <ion-icon :icon="camera"></ion-icon>
      </ion-fab-button>
      </ion-fab>
      <!-- ExploreContainer intentionally removed per lab -->
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonFab,
  IonFabButton,
  IonIcon
} from '@ionic/vue'

import { camera } from 'ionicons/icons'

// CHANGE: Add `usePhotoGallery` import
import { usePhotoGallery } from '@/composables/usePhotoGallery';

// CHANGE: Destructure `addNewToGallery` from `usePhotoGallery()
const { addNewToGallery } = usePhotoGallery();
</script>

<style scoped>
.student-info {
  text-align: center;
  font-size: 1rem;
}
</style>