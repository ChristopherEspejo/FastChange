import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { Auth, signOut } from '@angular/fire/auth';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
  showDropdown = false;
  isMenuOpen = false;

  constructor(private router: Router, private auth: Auth) {}

  logout() {
    signOut(this.auth)
      .then(() => {
        console.log('Usuario ha cerrado sesión');
        sessionStorage.removeItem('userToken');
        // Redirigir al usuario a la página de inicio o login
        this.router.navigate(['/auth']);
      })
      .catch((error) => {
        console.error('Error al cerrar sesión:', error);
        // Opcional: Mostrar algún mensaje de error o manejar el error de otra manera
      });
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
