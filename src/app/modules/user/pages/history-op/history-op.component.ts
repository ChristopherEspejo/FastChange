import { Component, OnInit } from '@angular/core';
import { UserService } from "../../user.service";
import { ToastrService } from "ngx-toastr";
import { MatDialog } from "@angular/material/dialog";
import { ConfirmationDialogComponent } from "../../../../shared/components/confirmation-dialog/confirmation-dialog.component";
import { ImageDialogComponent } from "../../../../shared/components/image-dialog/image-dialog.component";
import { GlobalService } from "../../../../shared/services/global.service";

@Component({
  selector: 'app-history-op',
  templateUrl: './history-op.component.html',
  styleUrls: ['./history-op.component.scss']
})
export class HistoryOpComponent implements OnInit {
  transactions: any[] = [];
  allTransactions: any[] = [];
  selectedStatus = '';
  startDate: string | null = null;
  endDate: string | null = null;
  loading: boolean = false;

  constructor(
    private userService: UserService,
    private toastr: ToastrService,
    private dialog: MatDialog,
    private global: GlobalService
  ) {}

  ngOnInit() {
    this.loadTransactions();
  }

  handleDateRange(event: { startDate: string, endDate: string }) {
    this.startDate = event.startDate;
    this.endDate = event.endDate;
    this.applyFilters();
  }

  filterByStatus(): void {
    this.applyFilters();
  }

  applyFilters(): void {
    this.transactions = this.global.applyFilters(this.allTransactions, this.startDate, this.endDate, this.selectedStatus);
  }

  loadTransactions() {
    this.loading = true;
    this.userService.getAllTransactions().subscribe({
      next: (transactions: any) => {
        this.allTransactions = transactions;
        this.applyFilters(); // Aplica los filtros después de recargar las transacciones
      },
      error: (error: any) => {
        console.error('Error al obtener las transacciones', error);
        this.toastr.error('Error al cargar transacciones');
      },
      complete: () => {
        this.loading = false;
      }
    });
  }

  confirmPayment(transaction: any): void {
    if (!transaction.numeroOperacionTemp || isNaN(transaction.numeroOperacionTemp)) {
      this.toastr.error('Por favor, introduce un número de operación válido.');
      return;
    }

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '450px',
      data: { message: '¿Estás seguro de que quieres confirmar este pago?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.updateTransaction(transaction._id, transaction.numeroOperacionTemp).subscribe({
          next: () => {
            this.toastr.success('Pago confirmado exitosamente');
            this.loadTransactions(); // Reload transactions to reflect the updated state
          },
          error: (err: any) => {
            this.toastr.error('Error al confirmar el pago');
            console.error(err);
          }
        });
      }
    });
  }

  openImageDialog(imageUrl: string): void {
    this.dialog.open(ImageDialogComponent, {
      data: { imageUrl: imageUrl },
      width: '500px',
      height: '600px'
    });
  }
}
