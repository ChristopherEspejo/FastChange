import { Component } from '@angular/core';
import { AdminService } from '../../admin.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pdf-report',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pdf-report.component.html',
  styleUrl: './pdf-report.component.scss'
})
export class PdfReportComponent {
  isLoading: boolean = false;

  constructor(private adminService: AdminService) { }

  downloadReport(dateRange: 'today' | 'week'): void {
    this.isLoading = true;
    this.adminService.downloadTransactionReport(dateRange).subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `transactions-report-${dateRange}.pdf`;
        a.click();
        window.URL.revokeObjectURL(url);
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error downloading the report:', err);
        this.isLoading = false;
      }
    });
  }
}
