import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import {ToastrService} from "ngx-toastr";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router: Router,
              private toast: ToastrService ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          console.log("adios bro")
          this.toast.warning('Tu sesión ha expirado, por favor inicia sesión nuevamente', 'Sesión expirada')
          // Verificar si el error está relacionado con la expiración del token
          // Aquí puedes agregar tu lógica específica para identificar el error de expiración del token
          // Si el token ha expirado, redirige al usuario a la página de inicio de sesión
          this.router.navigate(['/auth']);
        }
        return  throwError(()=>error);
      })
    );
  }
}
