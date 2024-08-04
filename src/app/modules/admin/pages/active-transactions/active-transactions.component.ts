import { Component } from '@angular/core';
import { AdminService } from "../../admin.service";
import { ToastrService } from "ngx-toastr";
import { MatDialog } from "@angular/material/dialog";
import { ConfirmationDialogComponent } from "../../../../shared/components/confirmation-dialog/confirmation-dialog.component";
import { TransactionConfirmationDialogComponent } from "../../../../shared/components/transaction-confirmation-dialog/transaction-confirmation-dialog.component";

@Component({
  selector: 'app-active-transactions',
  templateUrl: './active-transactions.component.html',
  styleUrls: ['./active-transactions.component.scss']
})
export class ActiveTransactionsComponent {
  transactions: any[] = [];
  filteredTransactions: any[] = [];
  isLoading: boolean = false;
  searchTerm: string = '';

  constructor(private adminService: AdminService,
              private toast: ToastrService,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    this.fetchTransactions();
  }

  fetchTransactions(): void {
    this.isLoading = true;  // Activar el indicador de carga
    this.adminService.getAllTransactions().subscribe({
      next: (data) => {
        this.transactions = data.filter((transaction:any) => transaction.estado === 'pendiente');
        this.filteredTransactions = [...this.transactions];  // Inicialmente, muestra todas las transacciones
        this.isLoading = false;  // Desactivar el indicador de carga
      },
      error: (error) => {
        console.error(error);
        this.isLoading = false;  // Desactivar el indicador de carga en caso de error
      }
    });
  }

  refreshTransactions(): void {
    this.fetchTransactions();
  }

  completeTransaction(id: string): void {
    const dialogRef = this.dialog.open(TransactionConfirmationDialogComponent, {
      width: '450px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const { comment, image } = result;
        if (image) {
          this.isLoading = true;
          this.adminService.completeTransaction(id, image, comment).subscribe({
            next: () => {
              this.isLoading = false;
              this.fetchTransactions(); // Actualiza la lista de transacciones
              this.toast.success('Transacción completada exitosamente');
            },
            error: (error) => {
              this.isLoading = false;
              this.toast.error('Error al completar la transacción');
              console.error(error);
            }
          });
        } else {
          this.toast.error('Por favor, selecciona una imagen antes de confirmar.');
        }
      }
    });
  }

  cancelTransaction(id: string): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '450px',
    });

    dialogRef.afterClosed().subscribe(confirm => {
      if (confirm) {
        this.adminService.cancelTransaction(id).subscribe({
          next: () => {
            this.fetchTransactions();
            this.toast.success('Transacción cancelada exitosamente');
          },
          error: error => {
            this.toast.error('Error al cancelar la transacción');
            console.error(error);
          }
        });
      }
    });
  }

  filterTransactions(): void {
    const term = this.searchTerm.trim().toLowerCase();
    if (term) {
      this.filteredTransactions = this.transactions.filter(transaction =>
        transaction.idTransaction.toLowerCase().includes(term)
      );
    } else {
      this.filteredTransactions = [...this.transactions];  // Muestra todas las transacciones si no hay término de búsqueda
    }
  }
}
