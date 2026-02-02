import { camera } from 'ionicons/icons';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonFab,
  IonFabButton,
  IonIcon,
  IonGrid,  // เพิ่ม: Import Grid
  IonRow,   // เพิ่ม: Import Row
  IonCol,   // เพิ่ม: Import Col
  IonImg,   // เพิ่ม: Import Img
} from '@ionic/react';
import { usePhotoGallery } from '../hooks/usePhotoGallery';
import './Tab2.css';

const Tab2: React.FC = () => {
  // CHANGE: ดึงตัวแปร `photos` ออกมาจาก Hook เพื่อนำมาใช้งาน
  const { photos, addNewToGallery } = usePhotoGallery();

  return (
    <IonPage>
     

      <IonHeader>
        <IonToolbar>
          <IonTitle>Photo Gallery</IonTitle>
          <IonTitle size="small">Lab 05 - โดย ณัฐรภา ศรีวิชา รหัส 663380504-5</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Photo Gallery</IonTitle>
            <IonTitle size="small">Lab 05 - โดย ณัฐรภา ศรีวิชา รหัส 663380504-5</IonTitle>
          </IonToolbar>
        </IonHeader>




        {/* CHANGE: เพิ่มส่วน Grid สำหรับแสดงรูปภาพที่ถ่ายมา */}
        <IonGrid>
          <IonRow>
            {photos.map((photo, index) => (
              <IonCol size="6" key={photo.filepath || index}>
                <IonImg src={photo.webviewPath} />
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>

        {/* ปุ่มถ่ายรูป (FAB) */}
        <IonFab vertical="bottom" horizontal="center" slot="fixed">
          <IonFabButton onClick={() => addNewToGallery()}>
            <IonIcon icon={camera}></IonIcon>
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;