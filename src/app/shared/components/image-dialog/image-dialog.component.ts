import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  standalone: true,
  imports: [],
  selector: 'app-image-dialog',
  template: `<img [src]="data.imageUrl" class="max-w-full h-auto" alt="Imagen del recibo">`,
  styleUrl: './image-dialog.component.scss'
})
export class ImageDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { imageUrl: string }) {}
}
