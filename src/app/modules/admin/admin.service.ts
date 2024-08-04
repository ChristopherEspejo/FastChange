import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private cloudinaryUrl = 'https://api.cloudinary.com/v1_1/dxuofpp4v/image/upload';
  private uploadPreset = 'srrear4h'; // Tu preset de carga sin firmar
  private apiUrl = 'https://fastchange.up.railway.app/api';

  constructor(private http: HttpClient) { }

  // Método para obtener los headers con el token
  private getHeaders(): HttpHeaders {
    const token = sessionStorage.getItem('userToken'); // o localStorage.getItem('userToken')
    return token ? new HttpHeaders({ 'Authorization': `Bearer ${token}` }) : new HttpHeaders();
  }

  getChangeType(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/changetype/change-type`, { headers: this.getHeaders() });
  }

  getAllTransactions(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl.replace('/changetype/change-type', '')}/transactions`, { headers: this.getHeaders() });
  }

  updateChangeType(changeTypeData: any): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/changetype/change-type`, changeTypeData, { headers: this.getHeaders() });
  }

  cancelTransaction(id: string): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/transactions/${id}/cancel`, {}, { headers: this.getHeaders() });
  }

  uploadImage(image: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', image);
    formData.append('upload_preset', this.uploadPreset);

    return this.http.post(this.cloudinaryUrl, formData);
  }

  completeTransaction(id: string, image: File, comentario?: string): Observable<any> {
    return new Observable(observer => {
      this.uploadImage(image).subscribe({
        next: response => {
          const imageUrl = response.url; // URL de la imagen subida

          const headers = this.getHeaders();
          this.http.patch<any>(`${this.apiUrl}/transactions/${id}/complete`, {
            imagen: imageUrl,
            comentario
          }, { headers }).subscribe({
            next: res => observer.next(res),
            error: err => observer.error(err)
          });
        },
        error: err => observer.error(err)
      });
    });
  }

  // Nuevo método para descargar reporte de transacciones
  downloadTransactionReport(dateRange: 'today' | 'week'): Observable<Blob> {
    const headers = this.getHeaders();
    return this.http.get(`${this.apiUrl}/transactions/download-report?dateRange=${dateRange}`, {
      headers,
      responseType: 'blob'  // Asegúrate de que el tipo de respuesta sea 'blob'
    });
  }
  
}
