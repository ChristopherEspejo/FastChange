import { Component } from '@angular/core';
import {FooterHomeComponent} from "../../components/footer-home/footer-home.component";

@Component({
  selector: 'app-frequent-questions',
  standalone: true,
  imports: [
    FooterHomeComponent
  ],
  templateUrl: './frequent-questions.component.html',
  styleUrl: './frequent-questions.component.scss'
})
export class FrequentQuestionsComponent {

}
