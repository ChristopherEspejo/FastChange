import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

// Extend the global window interface
declare global {
  interface Window {
    __env?: {
      firebaseConfig?: {
        apiKey?: string;
        authDomain?: string;
        projectId?: string;
        storageBucket?: string;
        messagingSenderId?: string;
        appId?: string;
        measurementId?: string;
      }
    };
  }
}

// Override environment settings with __env settings if they exist
if (window.__env && window.__env.firebaseConfig) {
  Object.assign(environment.firebaseConfig, window.__env.firebaseConfig);
}

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
