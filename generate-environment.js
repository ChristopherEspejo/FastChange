const fs = require('fs');

// Definir las variables de entorno de Firebase que esperas obtener de Cloudflare
const firebaseConfig = {
  apiKey: process.env.NG_APP_FIREBASE_API_KEY,
  authDomain: process.env.NG_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NG_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NG_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NG_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NG_APP_FIREBASE_APP_ID,
  measurementId: process.env.NG_APP_FIREBASE_MEASUREMENT_ID,
};

// Crear el contenido del archivo `environment.ts`
const environmentFileContent = `
export const environment = {
  production: ${process.env.NODE_ENV === 'production'},
  firebaseConfig: ${JSON.stringify(firebaseConfig, null, 2)}
};
`;

// Crear el archivo `environment.ts` en `src/environments`
fs.writeFileSync('./src/environments/environment.ts', environmentFileContent, 'utf8');

console.log(`Environment file generated: ${environmentFileContent}`);
