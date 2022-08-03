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
    
    let request = req;
    
    const link = document.getElementsByTagName('link');
    
    for (let i = 0; i < link.length; i++) {
      if (link[i].getAttribute('rel') === "canonical") {
        link[i].setAttribute('href', `${window.location.href}` );
      }
    }
  
    return next.handle(request);
  }
}