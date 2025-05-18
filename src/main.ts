import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideFirebaseApp(() => initializeApp({
      apiKey: "AIzaSyDEof4k9Et-I-3yCggGt3kwDA4hleeKmYU",
      authDomain: "vizilabdainfo.firebaseapp.com",
      projectId: "vizilabdainfo",
      storageBucket: "vizilabdainfo.firebasestorage.app",
      messagingSenderId: "871425095199",
      appId: "1:871425095199:web:5c32108f904aa6c2a1c72a"
    })),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore())
  ]
});
