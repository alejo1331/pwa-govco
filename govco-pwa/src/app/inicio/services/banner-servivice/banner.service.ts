import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BannerInterface } from '../../models/banner/banner-interface';

@Injectable({
  providedIn: 'root'
})
export class BannerService {
  url_Home: string = environment.serverUrlHome;

  constructor(private http: HttpClient) { }

  getbannerPrincipal():Observable<BannerInterface>{
    return this.http.get<BannerInterface>(`${this.url_Home}/BannerPrincipal`);
  }
}
