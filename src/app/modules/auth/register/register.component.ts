import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import {
  Auth,
  User,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  OAuthProvider,
} from '@angular/fire/auth';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RegisterData } from '../auth.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  flagCreateAccount: boolean = false;
  loading: boolean = false; // Bandera para controlar el overlay de carga

  // Formulario reactivo para el registro
  registerForm = new FormGroup({
    nombre: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-zA-Z ]+$'),
      Validators.maxLength(30),
    ]),
    apellido: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-zA-Z ]+$'),
      Validators.maxLength(30),
    ]),
    dni: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]+$'),
    ]), // Inicialmente sin longitud fija
    email: new FormControl('', [Validators.email]),
    tipoPersona: new FormControl('N', [Validators.required]), // 'N' seleccionado por defecto
  });

  user$: Observable<User | null>;

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
    // Suscripción para manejar el estado del usuario autenticado
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

    // Aplicar la validación inicial según el tipo de persona predeterminado
    this.onTipoPersonaChange();
  }

  // Detectar cambios en el tipo de persona y ajustar la validación del campo DNI
  onTipoPersonaChange() {
    const tipoPersona = this.registerForm.get('tipoPersona')?.value;
    const dniControl = this.registerForm.get('dni');

    // Limpiar el valor actual antes de aplicar nuevas validaciones
    dniControl?.setValue('');

    if (tipoPersona === 'N') {
      // Persona natural - 8 dígitos
      dniControl?.setValidators([
        Validators.required,
        Validators.pattern('^[0-9]+$'), // Solo números
        Validators.minLength(8),
        Validators.maxLength(8),
      ]);
    } else if (tipoPersona === 'J') {
      // Persona jurídica - 11 dígitos
      dniControl?.setValidators([
        Validators.required,
        Validators.pattern('^[0-9]+$'), // Solo números
        Validators.minLength(11),
        Validators.maxLength(11),
      ]);
    }

    // Revalidar el campo para aplicar los nuevos validadores
    dniControl?.updateValueAndValidity(); // Actualiza las validaciones
  }

  // Registro con Apple
  registerWithApple() {
    this.loading = true; // Mostrar el loading
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
        this.loading = false; // Ocultar el loading si ocurre un error
        console.error('Error en el inicio de sesión con Apple:', error);
        this.toast.error('Error en el inicio de sesión con Apple', 'Error');
      });
  }

  // Registro con Google
  registerWithGoogle() {
    this.loading = true; // Mostrar el loading
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
      prompt: 'select_account',
    });
    signInWithPopup(this.auth, provider)
      .then((result) => {
        if (result.user) {
          result.user.getIdToken().then((idToken) => {
            console.log('User ID Token: ', idToken);
            this.authService.saveToken(idToken);
            this.verifyAccess(idToken);
          });
        }
      })
      .catch((error) => {
        this.loading = false; // Ocultar el loading si ocurre un error
        console.error('Error en el inicio de sesión con Google:', error);
      });
  }

  // Verificación del acceso del usuario registrado
  verifyAccess(idToken: string) {
    this.authService.verifyLogin(idToken).subscribe({
      next: (data: any) => {
        this.loading = false; // Ocultar el loading después de la verificación
        if (data.user.rol === 'admin') {
          this.router.navigate(['/admin']);
        } else if (data.user.rol === 'usuario') {
          this.router.navigate(['/user']);
        }
      },
      error: ({ error }) => {
        this.loading = false; // Ocultar el loading en caso de error
        if (error.exists === false) {
          this.flagCreateAccount = true;
        } else if (error.exists === undefined) {
          this.toast.error(
            'Error en el servidor. Por favor, intente nuevamente más tarde.',
            'Error'
          );
        } else {
          this.toast.error(error.message, 'Error');
        }
      },
    });
  }

  // Envío del formulario de registro
  sendRegister() {
    // Verifica si el formulario es válido antes de enviar
    if (this.registerForm.valid) {
      this.loading = true; // Activar el overlay de carga al enviar el formulario
      const formData: RegisterData = this.registerForm.value as RegisterData;

      this.authService.registerUser(formData).subscribe({
        next: (data) => {
          this.loading = false; // Desactivar el overlay de carga
          this.toast.success('Usuario registrado correctamente', 'Registro');
          this.router.navigate(['/user']);
        },
        error: ({ error }) => {
          this.loading = false; // Desactivar el overlay de carga
          this.toast.error(
            `Error al registrar el usuario, ${error.message}`,
            'Registro'
          );
        },
      });
    } else {
      this.toast.error(
        'Por favor, completa el formulario correctamente.',
        'Error'
      );
    }
  }

  // Cerrar sesión del usuario
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
