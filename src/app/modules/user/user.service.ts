import { Injectable } from '@angular/core';
import {catchError, Observable, throwError} from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://fastchange.up.railway.app/api';

  constructor(private http: HttpClient) { }

  // Método para obtener los headers con el token más reciente
  private getHeaders(): HttpHeaders {
    const token = sessionStorage.getItem('userToken'); // Obtiene el token más reciente en cada llamada
    if (token) {
      return new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    } else {
      return new HttpHeaders(); // Devuelve headers vacíos si no hay token
    }
  }

  getChangeType(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/changetype/change-type`, { headers: this.getHeaders() });
  }

  verifyChangeType(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/transactions/verify-change`, data, { headers: this.getHeaders() });
  }

  createTransaction(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/transactions/create-transaction`, data, { headers: this.getHeaders() });
  }

  updateTransaction(id: string, numeroOperacion: string): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/transactions/${id}/update`, { numeroOperacion }, { headers: this.getHeaders() });
  }

  cancelTransaction(id: string, comentario?: string): Observable<any> {
    const body = comentario ? { comentario } : {};
    return this.http.patch<any>(`${this.apiUrl}/transactions/${id}/cancel`, body, { headers: this.getHeaders() });
  }

  getAllTransactions(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/transactions`, { headers: this.getHeaders() });
  }

  getUser(): Observable<any> {
    return this.http.get(`${this.apiUrl}/users/profile`,  {
      headers: this.getHeaders()
    }).pipe(
      catchError(error => {
        return throwError(() => error);
      })
    );
  }
  updateUser(data: { nombre: string, apellido: string, dni: string, email?: string }): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/users/update`, data, {
      headers: this.getHeaders()
    }).pipe(
      catchError(error => {
        return throwError(() => error);
      })
    );
  }
  // Método para obtener todos los CompanyBanks
  getAllCompanyBanks(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/banks/companyBanks`, { headers: this.getHeaders() }).pipe(
      catchError(error => {
        return throwError(() => error);
      })
    );
  }

  // Método para obtener todos los Banks
  getAllBanks(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/banks/banks`, { headers: this.getHeaders() }).pipe(
      catchError(error => {
        return throwError(() => error);
      })
    );
  }



}
