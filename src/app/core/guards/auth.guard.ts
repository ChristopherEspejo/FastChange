import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../../modules/auth/auth.service';
import { Observable, of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard   {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    console.log('AuthGuard#canActivate called');
    const expectedRole = route.data['expectedRole'];

    return this.authService.isAuthenticated().pipe(
      switchMap(isAuthenticated => {
        if (!isAuthenticated) {
          this.router.navigate(['/login']);
          return of(false);
        }
        return this.authService.hasRole(expectedRole).pipe(
          map(hasRole => {
            if (!hasRole) {
              this.router.navigate(['/home']);
              return false;
            }
            return true;
          })
        );
      }),
      catchError(error => {
        console.error('Error in AuthGuard', error);
        this.router.navigate(['/home']);
        return of(false);
      })
    );
  }
}
