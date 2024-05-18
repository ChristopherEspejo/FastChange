import { Component } from '@angular/core';
import {UserService} from "../../user.service";
import {ProfileResponse, UserInterface} from "../../user.interface";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  user: UserInterface ={} as UserInterface;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getUser().subscribe((response:ProfileResponse) => {
      if (response.exists) {
        this.user = response.user;
      }
    });
  }
  saveChanges() {
    console.log('Saving changes', this.user);
    // Aquí iría la lógica para guardar los cambios en el servidor
  }


}
