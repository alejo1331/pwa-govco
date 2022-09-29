import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ValidarUrlService {

  public openModal = false;
  private loadingSubject = new Subject<boolean>();
  public loading$: Observable<boolean> = this.loadingSubject.asObservable();

  constructor(private http: HttpClient) { }

  private validate(url: string) {
    return this.http.get(`https://api-interno.www.gov.co/api/utils/validateurl?url=${url}`)
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
        window.open(url, `target='_blank', rel=${url}`);
      }
    });
  }

  eventoValidarUrlModal = ( data: boolean | undefined ) => this.loadingSubject.next( data );
  accionModal = (evento:any)=> this.openModal = evento.detail;
}
