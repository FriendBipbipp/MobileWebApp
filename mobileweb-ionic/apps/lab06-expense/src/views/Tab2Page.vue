<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Add Expense</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Add Expense</ion-title>
        </ion-toolbar>
      </ion-header>

      <div class="ion-padding">
        <ion-item>
          <ion-input label="ชื่อรายการ (Title)" label-placement="floating" v-model="title" placeholder="Enter title"></ion-input>
        </ion-item>

        <ion-item>
          <ion-input label="จำนวนเงิน (Amount)" label-placement="floating" type="number" v-model="amount" placeholder="Enter amount"></ion-input>
        </ion-item>
        
        <ion-item>
          <ion-select label="ประเภท (Type)" label-placement="floating" v-model="type" placeholder="Select type">
            <ion-select-option value="income">รายรับ (Income)</ion-select-option>
            <ion-select-option value="expense">รายจ่าย (Expense)</ion-select-option>
          </ion-select>
        </ion-item>

        <ion-item>
          <ion-select label="หมวดหมู่ (Category)" label-placement="floating" v-model="category" placeholder="Select category">
            <ion-select-option value="Food">Food</ion-select-option>
            <ion-select-option value="Travel">Travel</ion-select-option>
            <ion-select-option value="Salary">Salary</ion-select-option>
            <ion-select-option value="General">General</ion-select-option>
          </ion-select>
        </ion-item>

        <ion-item>
          <ion-textarea label="หมายเหตุ (Note)" label-placement="floating" v-model="note" placeholder="Enter note" :auto-grow="true"></ion-textarea>
        </ion-item>

        <ion-button expand="block" shape="round" class="ion-margin-top" @click="saveExpense">
          บันทึกข้อมูล (Save)
        </ion-button>
        
        <ion-button expand="block" fill="outline" shape="round" class="ion-margin-top" router-link="/tabs/tab1">
          กลับไปหน้ารายการหลัก (Back)
        </ion-button>
      </div>
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
  IonItem, 
  IonInput, 
  IonSelect, 
  IonSelectOption, 
  IonTextarea, 
  IonButton,
  alertController
} from '@ionic/vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase.ts'; // Adjust path if needed, usually absolute import is better but file is in root

const title = ref('');
const amount = ref('');
const type = ref('');
const category = ref('');
const note = ref('');
const router = useRouter();

const saveExpense = async () => {
  if (!title.value || !amount.value || !type.value || !category.value) {
    const alert = await alertController.create({
      header: 'Incomplete Form',
      message: 'Please fill in all required fields.',
      buttons: ['OK'],
    });
    await alert.present();
    return;
  }

  try {
    const docRef = await addDoc(collection(db, 'expenses'), {
      title: title.value,
      amount: Number(amount.value),
      type: type.value,
      category: category.value,
      note: note.value,
      date: new Date()
    });
    console.log("Document written with ID: ", docRef.id);
    
    // Reset form
    title.value = '';
    amount.value = '';
    type.value = '';
    category.value = '';
    note.value = '';
    
    // Navigate back
    router.push('/tabs/tab1'); 
  } catch (e) {
    console.error("Error adding document: ", e);
    const alert = await alertController.create({
      header: 'Error',
      message: 'Could not save expense. Please try again.',
      buttons: ['OK'],
    });
    await alert.present();
  }
};
</script>
