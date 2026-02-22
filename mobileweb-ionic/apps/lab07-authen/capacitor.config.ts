import type { CapacitorConfig } from '@capacitor/cli';


const config: CapacitorConfig = {
  appId: 'cpkku.fnatrapa.lab07',
  appName: 'lab07-authen',
  webDir: 'dist'
};

plugins: {
  FirebaseAuthentication: {
    skipNativeAuth: false
  }
}

export default config;
