import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AdminComponent} from "./admin.component";
import {DashboardComponent} from "./pages/dashboard/dashboard.component";
import {ConfigurationComponent} from "./pages/configuration/configuration.component";
import {TransactionHistoryComponent} from "./pages/transaction-history/transaction-history.component";
import {ActiveTransactionsComponent} from "./pages/active-transactions/active-transactions.component";


const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children:[
    { path: 'dashboard', component: DashboardComponent },
    { path: 'configuration', component: ConfigurationComponent},
    { path: 'history', component: TransactionHistoryComponent},
    { path: 'active-transactions', component: ActiveTransactionsComponent},
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: '**', redirectTo: 'dashboard' }
    ]
    // Hijos eliminados o movidos a sus respectivos módulos
},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { } // Corregido el nombre del módulo
