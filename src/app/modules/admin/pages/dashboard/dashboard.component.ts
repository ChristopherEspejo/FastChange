import { Component } from '@angular/core';
import { AdminService } from "../../admin.service";
import { ToastrService } from "ngx-toastr";
import { MatDialog } from "@angular/material/dialog";
import { ConfirmationDialogComponent } from "../../../../shared/components/confirmation-dialog/confirmation-dialog.component";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  changeType = { tipoCompra: '', tipoVenta: '' };
  isLoading: boolean = false;

  constructor(private adminService: AdminService,
              private toast: ToastrService,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadChangeType();
  }

  loadChangeType(): void {
    this.isLoading = true;
    this.adminService.getChangeType().subscribe({
      next: (data) => {
        this.changeType = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching change type:', err);
        this.toast.error('Error al cargar el tipo de cambio');
        this.isLoading = false;
      }
    });
  }

  openConfirmationDialog(): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: { message: "¿Estás seguro de que deseas actualizar el tipo de cambio?" }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.updateChangeType();
      }
    });
  }

  updateChangeType(): void {
    this.isLoading = true; // Activar el indicador de carga
    const updatedData = { tipoCompra: this.changeType.tipoCompra, tipoVenta: this.changeType.tipoVenta };
    this.adminService.updateChangeType(updatedData).subscribe({
      next: (data) => {
        console.log('Change type updated successfully:', data);
        this.loadChangeType(); // Recargar el tipo de cambio después de la actualización
        this.toast.success('Tipo de cambio actualizado correctamente');
        this.isLoading = false; // Desactivar el indicador de carga
      },
      error: (err) => {
        const message = err.error?.message || 'Error desconocido al actualizar el tipo de cambio.';
        this.toast.error(message, 'Error');
        this.isLoading = false; // Desactivar el indicador de carga en caso de error
      }
    });
  }
}
