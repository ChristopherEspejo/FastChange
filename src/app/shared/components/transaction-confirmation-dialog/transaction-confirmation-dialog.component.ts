import { Component, Inject } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent
} from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-transaction-confirmation-dialog',
  standalone: true,
  imports: [
    FormsModule, // Importar FormsModule para usar ngModel
    MatFormFieldModule, // Módulo para mat-form-field
    MatInputModule, // Módulo para inputs de Material
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    NgIf,
    // Módulo para botones de Material
  ],
  templateUrl: './transaction-confirmation-dialog.component.html',
  styleUrls: ['./transaction-confirmation-dialog.component.scss']
})
export class TransactionConfirmationDialogComponent {
  selectedFile: File | null = null;
  imagePreview: string | null = null;
  comment: string = '';

  constructor(public dialogRef: MatDialogRef<TransactionConfirmationDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {}

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files![0];
    this.selectedFile = file;

    // Generar vista previa de la imagen
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }
}
