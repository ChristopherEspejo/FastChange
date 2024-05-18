import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef}  from  "@angular/material/dialog";
import {Bank, banks} from "../../interfaces/BankInterface";
import {NgForOf, NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-bank-dialog',
  standalone: true,
  imports: [
    NgForOf,
    NgOptimizedImage
  ],
  templateUrl: './bank-dialog.component.html',
  styleUrl: './bank-dialog.component.scss'
})
export class BankDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<BankDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { banks: Bank[] }
  ) {
  }

  selectBank(bank: Bank) {
    this.dialogRef.close(bank);
  }

}
