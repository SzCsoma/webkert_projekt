import { CanActivateFn, UrlTree } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { onAuthStateChanged } from 'firebase/auth';
import { Auth } from '@angular/fire/auth';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const auth = inject(Auth);
  return new Promise<boolean | UrlTree>((resolve) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        resolve(true);
      } else {
        resolve(router.createUrlTree(['/auth']));
      }
    });
  });
};