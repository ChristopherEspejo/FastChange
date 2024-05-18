import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from "./register/register.component";
import { LoginComponent } from "./login/login.component";

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' }, // Cambio aquí
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  // No es necesario el objeto de ruta vacío al final
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { } // Corregido el nombre del módulo
