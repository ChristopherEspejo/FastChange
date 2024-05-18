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

  verifyAccess(idToken: string){
    this.authService.verifyLogin(idToken).subscribe({
      next: (data:any) => {
        if(data.user.rol === 'admin'){
          this.router.navigate(['/admin']); // Usa esto para redirigir
        }else if(data.user.rol === 'usuario'){
          this.router.navigate(['/user']); // Usa esto para redirigir

        }


      },
      error: ({error}) => {
        console.log(error)
        this.toast.error(error.message, 'Error');
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
