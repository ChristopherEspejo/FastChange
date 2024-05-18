import { Component } from '@angular/core';
import {FooterHomeComponent} from "../../components/footer-home/footer-home.component";

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [
    FooterHomeComponent
  ],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.scss'
})
export class AboutUsComponent {

}
