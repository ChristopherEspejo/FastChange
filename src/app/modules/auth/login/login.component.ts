import { Component } from '@angular/core';
import { ToastrService } from "ngx-toastr";
import {
  Auth,
  User,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
} from '@angular/fire/auth';
import { OAuthProvider } from '@angular/fire/auth';
import { Observable, of } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { AuthService } from "../auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  user$: Observable<User | null>;
  loading: boolean = false;  // Bandera para controlar el overlay de carga

  constructor(
    private auth: Auth,
    private http: HttpClient,
    private authService: AuthService,
    private toast: ToastrService,
    private router: Router
  ) {
    this.user$ = of(null);
  }

  ngOnInit() {
    this.user$ = new Observable((subscriber) => {
      onAuthStateChanged(this.auth, (user) => {
        subscriber.next(user);
        if (user) {
          user.getIdToken().then((idToken) => {
            console.log('User ID Token: ', idToken);
          });
        }
      });
    });
  }

  loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
      prompt: 'select_account'
    });
    signInWithPopup(this.auth, provider)
      .then((result) => {
        if (result.user) {
          result.user.getIdToken().then((idToken) => {
            this.authService.saveToken(idToken);
            this.verifyAccess(idToken);
          });
        }
      })
      .catch((error) => {
        console.log(error.message, 'Error de inicio de sesión con Google');
      });
  }

  loginWithApple() {
    const provider = new OAuthProvider('apple.com');
    signInWithPopup(this.auth, provider)
      .then((result) => {
        if (result.user) {
          result.user.getIdToken().then((idToken) => {
            this.authService.saveToken(idToken);
            this.verifyAccess(idToken);
          });
        }
      })
      .catch((error) => {
        console.error('Error en el inicio de sesión con Apple:', error);
      });
  }

  verifyAccess(idToken: string) {
    this.loading = true; // Activar el overlay de carga
    this.authService.verifyLogin(idToken).subscribe({
      next: (data: any) => {
        this.loading = false; // Desactivar el overlay de carga
        if (data.user) {
          if (data.user.rol === 'admin') {
            this.router.navigate(['/admin']);
          } else if (data.user.rol === 'usuario') {
            this.router.navigate(['/user']);
          }
        } else {
          this.toast.error('Error inesperado. Por favor, intente nuevamente más tarde.', 'Error');
        }
      },
      error: ({ error }) => {
        this.loading = false; // Desactivar el overlay de carga
        if (error.exists === false) {
          this.toast.warning('Usuario no encontrado. Por favor, regístrate.', 'Advertencia');
          this.router.navigate(['/auth/register']);
        } else if (error.exists === undefined) {
          this.toast.error('Error en el servidor. Por favor, intente nuevamente más tarde.', 'Error');
        } else {
          this.toast.error(error.message, 'Error');
        }
      }
    });
  }

  logout() {
    signOut(this.auth)
      .then(() => {
        console.log('Usuario ha cerrado sesión');
      })
      .catch((error) => {
        console.error('Error al cerrar sesión:', error);
      });
  }
}
