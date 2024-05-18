import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from "./user.component";
import {HomepageComponent} from "./pages/homepage/homepage.component";
import {HistoryOpComponent} from "./pages/history-op/history-op.component";
import {ProfileComponent} from "./pages/profile/profile.component"; // Asegúrate de importar tus componentes

const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    children: [
      { path: 'homepage', component: HomepageComponent },
      { path: 'history', component: HistoryOpComponent },
      { path: 'profile', component: ProfileComponent },
      { path: '', redirectTo: 'homepage', pathMatch: 'full' },
      { path: '**', redirectTo: 'homepage' }
    ]
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
