import { Component } from '@angular/core';
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-user-nav',
  standalone: true,
    imports: [
        NgIf
    ],
  templateUrl: './user-nav.component.html',
  styleUrl: './user-nav.component.scss'
})
export class UserNavComponent {

}
