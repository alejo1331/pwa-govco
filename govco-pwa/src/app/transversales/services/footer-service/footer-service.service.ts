import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FooterInterface } from '../../models/footer-models/footer-interface';

@Injectable({
  providedIn: 'root'
})
export class FooterServiceService {

  ulrApiFooter : string =  environment.urlApiFooter;

  constructor(private htpp: HttpClient) { }

  getInformacionFooter():Observable<FooterInterface>{
    return this.htpp.get<FooterInterface>(this.ulrApiFooter + '/Footer/Movil')
  }
}
