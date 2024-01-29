import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import {RouterOutlet} from "@angular/router";
import {HomeRoutingModule} from "./home.routes";

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    RouterOutlet,
    HomeRoutingModule
  ]
})
export class HomeModule { }
