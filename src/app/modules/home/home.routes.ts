import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import {TermsAndConditionsComponent} from "./pages/terms-and-conditions/terms-and-conditions.component";
import {AboutUsComponent} from "./pages/about-us/about-us.component";
import {FrequentQuestionsComponent} from "./pages/frequent-questions/frequent-questions.component";
import { PrivacyComponent } from './pages/privacy/privacy.component';
// Importaciones de componentes eliminadas ya que no se manejarán aquí

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    // Hijos eliminados o movidos a sus respectivos módulos
  },
  {
    path: 'terms',
    component: TermsAndConditionsComponent
  },
  {
    path: 'about-us',
    component: AboutUsComponent
  },
  {
    path: 'faq',
    component: FrequentQuestionsComponent
  },
  {
    path: 'privacy',
    component: PrivacyComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
  // Puedes incluir aquí otras rutas relacionadas específicamente con el Home si es necesario
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
