import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AdminComponent} from "./admin.component";
import {RouterOutlet} from "@angular/router";
import {AdminRoutingModule} from "./admin.routes";
import {DashboardComponent} from "./pages/dashboard/dashboard.component";
import {FormsModule} from "@angular/forms";
import {TransactionHistoryComponent} from "./pages/transaction-history/transaction-history.component";
import {ActiveTransactionsComponent} from "./pages/active-transactions/active-transactions.component";
import {MatDialogModule} from "@angular/material/dialog";
import {MatDivider} from "@angular/material/divider";
import {MatIcon} from "@angular/material/icon";
import {DateRangeSelectorComponent} from "../../shared/components/date-range-selector/date-range-selector.component";
import { PdfReportComponent } from './components/pdf-report/pdf-report.component';



@NgModule({
  declarations: [AdminComponent, DashboardComponent, TransactionHistoryComponent,ActiveTransactionsComponent],
    imports: [
        PdfReportComponent,
        CommonModule,
        RouterOutlet,
        AdminRoutingModule,
        FormsModule,
        MatDialogModule,
        MatDivider,
        MatIcon,
        DateRangeSelectorComponent
    ]
})
export class AdminModule { }
