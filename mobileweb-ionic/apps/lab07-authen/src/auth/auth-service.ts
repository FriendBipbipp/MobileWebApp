import { Capacitor } from '@capacitor/core';
import { FirebaseAppAuthService } from './auth-app';
import { FirebaseWebAuthService } from './auth-web';
import type { IAuthService } from './auth-interface';

// ถ้าทำงานบนมือถือ (iOS/Android) ให้ใช้ AppService ถ้าบน Browser ให้ใช้ WebService
export const authService: IAuthService = Capacitor.isNativePlatform() 
  ? new FirebaseAppAuthService() 
  : new FirebaseWebAuthService();