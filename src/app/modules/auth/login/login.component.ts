import { Component } from '@angular/core';
import {ToastrService} from "ngx-toastr";

import {
  Auth,
  User,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  onAuthStateChanged,
} from '@angular/fire/auth';
import { OAuthProvider } from '@angular/fire/auth';
import {Observable, of} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  user$: Observable<User | null>;


  constructor(private auth: Auth, private http: HttpClient,
              private authService: AuthService,
              private toast: ToastrService,
              private router:Router) {
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
    })
    signInWithPopup(this.auth, provider)
      .then((result) => {
        // Esto se ejecutará si el inicio de sesión es exitoso
        console.log('User: ', result.user);
        if (result.user) {
          result.user.getIdToken().then((idToken) => {
            console.log('User ID Token: ', idToken);
            this.authService.saveToken(idToken);
            this.verifyAccess(idToken);
          });
        }
      })
      .catch((error) => {
        // Manejo de errores, por ejemplo, si el usuario cancela el inicio de sesión
        console.error('Error en el inicio de sesión con Google:', error);
        this.toast.error(error.message, 'Error de inicio de sesión con Google');
      });
  }

  loginWithApple() {
    const provider = new OAuthProvider('apple.com');
    signInWithPopup(this.auth, provider)
      .then((result) => {
        console.log('Result: ', result);
        if (result.user) {
          console.log('User: ', result.user);
          result.user.getIdToken().then((idToken) => {
            console.log('User ID Token: ', idToken)
            this.authService.saveToken(idToken);
            this.verifyAccess(idToken)
          });
        }
      })
      .catch((error) => {
        console.error('Error en el inicio de sesión con Apple:', error);
      });
  }

  verifyAccess(idToken: string) {
    this.authService.verifyLogin(idToken).subscribe({
      next: (data: any) => {
        // Este bloque solo se ejecutará si la solicitud es exitosa y no hay error
        if (data.user) {
          // Usuario encontrado
          if (data.user.rol === 'admin') {
            this.router.navigate(['/admin']); // Redirige a la página de admin
          } else if (data.user.rol === 'usuario') {
            this.router.navigate(['/user']); // Redirige a la página de usuario
          }
        } else {
          // Si por alguna razón data.user no está presente
          this.toast.error('Error inesperado. Por favor, intente nuevamente más tarde.', 'Error');
        }
      },
      error: ({ error }) => {
        if (error.exists === false) {
          // Usuario no encontrado
          this.toast.warning('Usuario no encontrado. Por favor, regístrate.', 'Advertencia');
          this.router.navigate(['/auth/register']);// Redirige a la página de registro
        } else if (error.exists === undefined) {
          // Error 500 u otro error inesperado
          this.toast.error('Error en el servidor. Por favor, intente nuevamente más tarde.', 'Error');
        } else {
          // Otros tipos de errores
          this.toast.error(error.message, 'Error');
        }
        console.log(error);
      }
    });
  }
  



  logout() {
    signOut(this.auth)
      .then(() => {
        console.log('Usuario ha cerrado sesión');
        // Aquí puedes añadir lógica adicional después del logout si es necesario
      })
      .catch((error) => {
        console.error('Error al cerrar sesión:', error);
      });
  }


}
