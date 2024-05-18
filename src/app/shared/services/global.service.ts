import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor() { }

  getToday(): Date {
    return new Date();
  }

  getYesterday(): Date {
    const date = new Date();
    date.setDate(date.getDate() - 1);
    return date;
  }

  // Establece la hora de inicio del día para una fecha
  setStartOfDay(date: Date): Date {
    date.setHours(0, 0, 0, 0);
    return date;
  }

  // Establece la hora de fin del día para una fecha
  setEndOfDay(date: Date): Date {
    date.setHours(23, 59, 59, 999);
    return date;
  }

  // Ajusta la fecha para incluir to do el día
  adjustDateRange(startDate: string | null, endDate: string | null): { start: Date; end: Date } {
    const start = new Date(startDate!);
    const end = new Date(endDate!);
    this.setStartOfDay(start);
    this.setEndOfDay(end);
    return { start, end };
  }

  applyFilters(transactions: any[], startDate: string | null, endDate: string | null, selectedStatus: string): any[] {
    const { start, end } = this.adjustDateRange(startDate, endDate);

    return transactions.filter(transaction => {
      const createdAt = new Date(transaction.createdAt);
      return (!selectedStatus || transaction.estado === selectedStatus) &&
        (!startDate || createdAt >= start) &&
        (!endDate || createdAt < end);
    });
  }

}
