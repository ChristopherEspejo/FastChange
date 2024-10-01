import { Component } from '@angular/core';
import { Router } from "@angular/router";
import {UserService} from "../user/user.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  toggleValue = false;
  changeValue = "tipoCompra"
  amount: number = 0;
  currency: string = 'USD_PEN';
  result: number | null = null;
  amountPen: any;
  amountUsd: any;
  cantidadEnvio: number = 100;
  changeType = {tipoCompra: 0, tipoVenta: 0};
  constructor(private router: Router,
              private userService: UserService) { }

  ngOnInit(): void {
    this.loadChangeType();
  }
  loadChangeType(): void {
    this.userService.getChangeType().subscribe({
      next: (data) => this.changeType = data,
      error: (err) => console.error('Error fetching change type:', err)
    });
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }

  goToUser() {
    this.router.navigate(['/user']);
  }

  goToAdmin() {
    this.router.navigate(['/admin']);
  }

  toggleCurrency() {
    this.toggleValue = !this.toggleValue;
    this.changeValue = this.toggleValue ? "tipoVenta" : "tipoCompra";
  }
}
