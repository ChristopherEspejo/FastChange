import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, map, Observable, of, tap, throwError} from 'rxjs';
import {ToastrService} from "ngx-toastr";
import {UserService} from "../user/user.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url = 'https://fastchange.up.railway.app/api';

  constructor(private httpClient: HttpClient,
              private userService: UserService) {
  }

  saveToken(token: string): void {
    sessionStorage.setItem('userToken', token);
  }

  // Obtiene el token desde sessionStorage
  getToken(): string | null {
    return sessionStorage.getItem('userToken');
  }

  verifyLogin(token: string) {
    return this.httpClient.post(`${this.url}/api/users/login`, {}, {
      headers: {'Authorization': `Bearer ${token}`}
    }).pipe(
      catchError(error => {
        return throwError(() => error);
      })
    );
  }

  registerUser(user: { nombre: string, apellido: string, dni: string, email?: string }) {
    // Asume que el token ya está guardado en sessionStorage después de la autenticación
    const token = this.getToken();
    if (!token) {
      // Manejar el caso de que no haya token disponible
      console.error('No hay token disponible');
      return throwError(() => new Error('No hay token disponible'));
    }

    return this.httpClient.post(`${this.url}/api/users/register`, user, {
      headers: {'Authorization': `Bearer ${token}`}
    }).pipe(
      catchError(error => {
        // Aquí podrías manejar errores específicos o simplemente reemitir el error
        return throwError(() => error);
      })
    );
  }

  isAuthenticated(): Observable<boolean> {
    return this.userService.getUser().pipe(
      tap(user => {
        console.log('Received user data:', user); // Aquí puedes ver los datos que se reciben
        console.log('User validity check:', !!user); // Verifica si user es truthy
      }),
      map(user => {
        return !!user; // Convierte user a boolean
      })
    );
  }

  //Obtiene el rol del usuario desde el token
  hasRole(expectedRole: string): Observable<boolean> {
    console.log('expectedRole', expectedRole);
    const token = this.getToken();
    if (!token) {
      console.error('No hay token disponible');
      return of(false);
    }
    return this.userService.getUser().pipe(
      map(user => {
        return user && user.user.rol === expectedRole;
      }),
      catchError(error => {
        return of(false);
      })
    );
  }


  // hasRole(expectedRole: string): boolean {
  //   const user = firebase.auth().currentUser;
  //   // Aquí asumimos que el rol está guardado como un claim en el token; puede necesitar ajustes dependiendo de tu implementación
  //   if (user && user['role'] === expectedRole) {
  //     return true;
  //   }
  //   return false;
  // }
}
