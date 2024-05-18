import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UserComponent} from "./user.component";
import {RouterOutlet} from "@angular/router";
import {UserRoutingModule} from "./user.routes";
import {UserNavComponent} from "./components/user-nav/user-nav.component";
import {HomepageComponent} from "./pages/homepage/homepage.component";
import {FormsModule} from "@angular/forms";
import {HistoryOpComponent} from "./pages/history-op/history-op.component";
import {DateRangeSelectorComponent} from "../../shared/components/date-range-selector/date-range-selector.component";




@NgModule({
  declarations: [
    HistoryOpComponent,
    UserComponent,
    HomepageComponent
  ],
  imports: [
    CommonModule,
    RouterOutlet,
    UserRoutingModule,
    UserNavComponent,
    FormsModule,
    DateRangeSelectorComponent
  ]
})
export class UserModule { }
