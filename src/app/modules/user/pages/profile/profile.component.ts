import { Component } from '@angular/core';
import { UserService } from "../../user.service";
import { ProfileResponse, UserInterface } from "../../user.interface";
import { FormsModule } from "@angular/forms";
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr'; // Si usas Toastr para notificaciones

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  user: UserInterface = {} as UserInterface;
  userLoaded: boolean = false;  // Bandera para indicar si los datos están cargados

  constructor(private userService: UserService, private toastr: ToastrService) { } // Inyecta ToastrService

  ngOnInit() {
    this.userService.getUser().subscribe((response: ProfileResponse) => {
      if (response.exists) {
        this.user = response.user;
      }
      this.userLoaded = true;  // Indicamos que los datos están listos
    });
  }

  saveChanges() {
    this.userService.updateUser(this.user).subscribe({
      next: (response) => {
        this.toastr.success('Perfil actualizado exitosamente');
        console.log('Perfil actualizado', response);
      },
      error: (error) => {
        this.toastr.error('Hubo un error al actualizar el perfil');
        console.error('Error al actualizar el perfil', error);
      }
    });
  }
}
