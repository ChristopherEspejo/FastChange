import { Component } from '@angular/core';
import { ToastrService } from "ngx-toastr";
import {
  Auth,
  User,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  OAuthProvider
} from '@angular/fire/auth';
import { Observable, of } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { AuthService } from "../auth.service";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { RegisterData } from "../auth.interface";
import { Router } from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  flagCreateAccount: boolean = false;

  registerForm = new FormGroup({
    nombre: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z ]+$'), Validators.maxLength(30)]),
    apellido: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z ]+$'), Validators.maxLength(30)]),
    dni: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$'), Validators.minLength(8), Validators.maxLength(11)]),
    email: new FormControl('', [Validators.email])
  });

  user$: Observable<User | null>;

  constructor(private auth: Auth, private http: HttpClient,
              private authService: AuthService,
              private toast: ToastrService,
              private router: Router) {
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

  registerWithApple() {
    const provider = new OAuthProvider('apple.com');

    signInWithPopup(this.auth, provider)
      .then((result) => {
        console.log('Result: ', result);
        if (result.user) {
          console.log('User: ', result.user);
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

  registerWithGoogle() {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
      prompt: 'select_account'
    });
    signInWithPopup(this.auth, provider)
      .then((result) => {
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
        console.error('Error en el inicio de sesión con Google:', error);
        this.toast.error(error.message, 'Error de inicio de sesión con Google');
      });
  }

  verifyAccess(idToken: string) {
    this.authService.verifyLogin(idToken).subscribe({
      next: (data: any) => {
        if (data.user.rol === 'admin') {
          this.router.navigate(['/admin']);
        } else if (data.user.rol === 'usuario') {
          this.router.navigate(['/user']);
        }
      },
      error: ({ error }) => {
        this.flagCreateAccount = true;
      }
    });
  }

  sendRegister() {
    if (this.registerForm.valid) {
      const formData: RegisterData = this.registerForm.value as RegisterData;
      this.authService.registerUser(formData).subscribe({
        next: (data) => {
          console.log('Usuario registrado correctamente', data);
          this.toast.success('Usuario registrado correctamente', 'Registro');
          this.router.navigate(['/user']);
        },
        error: ({ error }) => {
          this.toast.error(`Error al registrar el usuario, ${error.message}`, 'Registro');
        }
      });
    } else {
      this.toast.error('Por favor, completa el formulario correctamente.', 'Error');
    }
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
