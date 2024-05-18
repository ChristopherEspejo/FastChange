import { Component, EventEmitter, Output, ElementRef, HostListener, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-date-range-selector',
  templateUrl: './date-range-selector.component.html',
  styleUrls: ['./date-range-selector.component.scss'],
  standalone: true,
  imports: [
    NgIf,
    FormsModule
  ]
})
export class DateRangeSelectorComponent implements OnInit {
  @Output() dateRangeSelected: EventEmitter<{startDate: string, endDate: string}> = new EventEmitter();

  showCalendar = false;
  startDate: string | undefined;
  endDate: string | undefined;

  constructor(private eRef: ElementRef) {}

  ngOnInit(): void {
    this.initializeDates();
    this.emitDateRange();
  }

  toggleCalendar(): void {
    this.showCalendar = !this.showCalendar;
  }

  @HostListener('document:click', ['$event'])
  closeCalendar(event: MouseEvent): void {
    if (this.showCalendar && !this.eRef.nativeElement.contains(event.target)) {
      this.showCalendar = false;
      this.emitDateRange();
    }
  }

  onDateChange(): void {
    this.emitDateRange();
  }

  private initializeDates(): void {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() );

    this.startDate = this.formatDate(yesterday);
    this.endDate = this.formatDate(today);
  }

  private emitDateRange(): void {
    if (this.startDate && this.endDate) {
      const start = new Date(this.startDate);
      const end = new Date(this.endDate);
      start.setDate(start.getDate() + 1); // Sumar un día al inicio del rango (para incluirlo en la consulta
      end.setDate(end.getDate() + 1); // Sumar un día al final del rango

      this.dateRangeSelected.emit({
        startDate: start.toISOString(),
        endDate: end.toISOString()
      });
    }
  }



  private formatDate(date: Date): string {
    return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
  }

  updateInputPlaceholder(): string {
    if (this.startDate && this.endDate) {
      return `${this.startDate} - ${this.endDate}`;
    } else if (this.startDate) {
      return `${this.startDate} - Fin`;
    } else if (this.endDate) {
      return `Inicio - ${this.endDate}`;
    } else {
      return 'Seleccionar rango de fechas';
    }
  }
}
