import { Component } from '@angular/core';
import {FooterHomeComponent} from "../../components/footer-home/footer-home.component";

@Component({
  selector: 'app-terms-and-conditions',
  standalone: true,
  imports: [
    FooterHomeComponent
  ],
  templateUrl: './terms-and-conditions.component.html',
  styleUrl: './terms-and-conditions.component.scss'
})
export class TermsAndConditionsComponent {

}
