import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeneralIterceptorService implements HttpInterceptor {

  constructor(private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    document.querySelectorAll('link').forEach((link) => {
      if (link.getAttribute('rel') === "canonical") {
        link.setAttribute('href', `${window.location.href}` );
      }
    });
  
    return next.handle(req);
  }
}
