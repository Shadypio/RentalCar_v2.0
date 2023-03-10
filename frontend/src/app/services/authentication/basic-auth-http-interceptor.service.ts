import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BasicAuthHttpInterceptorService implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {


    if (sessionStorage.getItem('username') && sessionStorage.getItem('token')) {
      req = req.clone({
        setHeaders: {
          Authorization: <string> sessionStorage.getItem('token'),
        }
      })
    }


    return next.handle(req);

  }

}
