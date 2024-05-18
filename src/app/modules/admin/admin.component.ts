import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {
  isMenuOpen = false;


  constructor(private router: Router) {}

  logout() {
    this.router.navigate(['/']);
  }
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
