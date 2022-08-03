import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ValidarUrlService {

  public openModal = false;
  private loadingSubject = new Subject<boolean>();
  public loading$: Observable<boolean> = this.loadingSubject.asObservable();
  url_apiUtils: string = environment.apiUtils;

  constructor(private http: HttpClient) { }

  private validate(url: string) {    
    return this.http.get(this.url_apiUtils+`validateurl?url=${url}`)
                    .pipe(map( m => {
                      // Pruebas
                      //m = false;
                      if(!m){
                        this.loadingSubject.next(true);
                      }
                      return m;
                    }));
  }

  public openLink(url:string){
    this.validate(url).subscribe( resp => {
      if(resp){ 
        window.open(url, "target='_blank'");
      }       
    });
  }

  eventoValidarUrlModal = ( data: boolean | undefined ) => this.loadingSubject.next( data );
  accionModal = (evento:any)=> this.openModal = evento.detail;
}
