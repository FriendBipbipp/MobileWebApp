import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import TabsPage from '../views/TabsPage.vue';
// 1. เพิ่มการ Import LoginPage (ตรวจสอบชื่อไฟล์ให้ตรงกับที่คุณสร้างจริง)
import LoginPage from '../views/LoginPage.vue'; 
import { authService } from '@/auth/auth-service';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/tabs/tab1'
  },
  {
    path: "/login",
    component: LoginPage,
  },
  {
    path: '/tabs/',
    component: TabsPage,
    children: [
      {
        path: '',
        redirect: '/tabs/tab1'
      },
      {
        path: 'tab1',
        component: () => import('@/views/Tab1Page.vue'),
        // 2. เพิ่ม meta เพื่อบอกว่าหน้านี้ต้องล็อกอินก่อนเข้าถึง
        meta: { requiresAuth: true } 
      },
      {
        path: 'tab2',
        component: () => import('@/views/Tab2Page.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: 'tab3',
        component: () => import('@/views/Tab3Page.vue'),
        meta: { requiresAuth: true }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// 3. Navigation Guard (ตรวจสอบสิทธิ์ก่อนเข้าหน้า)
router.beforeEach(async (to) => {
  const user = await authService.getCurrentUser();
  
  // ถ้าล็อกอินแล้ว จะเข้าหน้า login ไม่ได้ (ให้เด้งไปหน้าหลัก)
  if (to.path === "/login" && user) {
    return "/tabs/tab1";
  }

  // ถ้าหน้าที่จะไปต้องใช้สิทธิ์ (requiresAuth) แต่ยังไม่ได้ล็อกอิน ให้ไปหน้า login
  if (to.meta.requiresAuth && !user) {
    return "/login";
  }

  return true;
});

export default router;