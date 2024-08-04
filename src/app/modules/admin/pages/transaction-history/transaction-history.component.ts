import { Component, OnInit } from '@angular/core';
import { AdminService } from "../../admin.service";
import { ImageDialogComponent } from "../../../../shared/components/image-dialog/image-dialog.component";
import { MatDialog } from "@angular/material/dialog";
import { GlobalService } from "../../../../shared/services/global.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-transaction-history',
  templateUrl: './transaction-history.component.html',
  styleUrls: ['./transaction-history.component.scss']
})
export class TransactionHistoryComponent implements OnInit {
  transactions: any[] = [];
  allTransactions: any[] = [];
  selectedStatus = '';
  startDate: string | null = null;
  endDate: string | null = null;
  isLoading: boolean = false;

  constructor(private adminService: AdminService,
              private dialog: MatDialog,
              private global: GlobalService,
              private toast: ToastrService) { }

  ngOnInit() {
    this.loadTransactions();
  }

  loadTransactions() {
    this.isLoading = true;
    this.adminService.getAllTransactions().subscribe({
      next: (transactions: any) => {
        this.allTransactions = transactions;
        this.applyFilters(); // Apply filters once transactions are loaded
        this.isLoading = false;
      },
      error: (error: any) => {
        console.error('Error al obtener las transacciones', error);
        this.toast.error('Error al cargar transacciones');
        this.isLoading = false;
      }
    });
  }

  refreshTransactions(): void {
    this.loadTransactions();
  }

  applyFilters(): void {
    this.transactions = this.global.applyFilters(this.allTransactions, this.startDate, this.endDate, this.selectedStatus);
  }

  handleDateRange(event: { startDate: string, endDate: string }) {
    this.startDate = event.startDate;
    this.endDate = event.endDate;
    this.applyFilters();
  }

  filterByStatus(): void {
    this.applyFilters();
  }

  openImageDialog(imageUrl: string): void {
    this.dialog.open(ImageDialogComponent, {
      data: { imageUrl: imageUrl },
      width: '500px',
      height: '600px'
    });
  }
}
