import { Component } from '@angular/core';
import {AdminService} from "../../admin.service";
import {ToastrService} from "ngx-toastr";
import {MatDialog} from "@angular/material/dialog";
import {
  ConfirmationDialogComponent
} from "../../../../shared/components/confirmation-dialog/confirmation-dialog.component";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  changeType = { tipoCompra: '', tipoVenta: '' };

  constructor(private adminService: AdminService,
              private toast:ToastrService,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadChangeType();
  }

  loadChangeType(): void {
    this.adminService.getChangeType().subscribe({
      next: (data) => this.changeType = data,
      error: (err) => console.error('Error fetching change type:', err)
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
  // Asume un método para actualizar que llamarías con un formulario o similar
  updateChangeType(): void {
    const updatedData = { tipoCompra: this.changeType.tipoCompra, tipoVenta: this.changeType.tipoVenta };
    this.adminService.updateChangeType(updatedData).subscribe({
      next: (data) => {
        console.log('Change type updated successfully:', data);
        this.loadChangeType();
        this.toast.success('Tipo de cambio actualizado correctamente');


      },
      error: (err) => {
        const message = err.error?.message || 'Error desconocido al actualizar el tipo de cambio.';
        this.toast.error(message, 'Error');
      }
    });
  }
}
