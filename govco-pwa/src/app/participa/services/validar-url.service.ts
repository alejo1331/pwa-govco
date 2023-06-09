import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ModalSitioNoDisponibleComponent } from '../components/participa/modal-sitio-no-disponible/modal-sitio-no-disponible.component';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class ValidarUrlService {

  public openModal = false;
  private loadingSubject = new Subject<boolean>();
  public loading$: Observable<boolean> = this.loadingSubject.asObservable();
  url_apiUtils: string = environment.apiUtils;

  constructor(
    private http: HttpClient,
    public dialog: MatDialog
    ) { }

  public validate(url: string) {    
    return this.http.get(this.url_apiUtils+`validateurl?url=${url}`)
                    .pipe(map( m => {
                      if(!m){
                        this.loadingSubject.next(true);
                      }
                      return m;
                    }));
  }

  public openLink(url:string){
    this.validate(url).subscribe( resp => {
      if (resp) { 
        window.open(url, "target='_blank'");
      } else {
        this.dialog.open(ModalSitioNoDisponibleComponent);
      }
    });
  }

  eventoValidarUrlModal = ( data: boolean | undefined ) => this.loadingSubject.next( data );
  accionModal = (evento:any)=> this.openModal = evento.detail;
}
