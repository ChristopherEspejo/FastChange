import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import {RouterOutlet} from "@angular/router";
import {HomeRoutingModule} from "./home.routes";
import {FormsModule} from "@angular/forms";
import {FooterHomeComponent} from "./components/footer-home/footer-home.component";

@NgModule({
  declarations: [
    HomeComponent
  ],
    imports: [
        CommonModule,
        RouterOutlet,
        HomeRoutingModule,
        FormsModule,
        FooterHomeComponent
    ]
})
export class HomeModule { }
