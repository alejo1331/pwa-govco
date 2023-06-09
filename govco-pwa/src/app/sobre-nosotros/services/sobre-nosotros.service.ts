import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ConoceModel, NosotrosResponse } from "../models/conoce.model";
import { Observable } from 'rxjs';
import { SobreNosotrosModel } from '../models/sobre-nosotros.model';
import { NosotrosModelV2 } from '../models/nosotros.model';

@Injectable({
    providedIn: 'root'
})

export class SobreNosotrosService {
    urlCross: string = environment.apiCrossUrl;
    urlHome: string = environment.serverUrlHomeSNosotros;
    urlHomeAdmin: string = environment.serverUrlHomeAdmP;

    constructor(private http: HttpClient) { }

    getTitleAndDescription(codigo: string) {
        let params = new HttpParams().set('codigo', codigo);
        return this.http.get<NosotrosResponse>(`${this.urlCross}cross/ObtenerTituloPagina`, { params })
    }

    getInfoConoce(): Observable<ConoceModel> {
        return this.http.get<ConoceModel>(`${this.urlHome}/conoce`);
    }

    ObtenerSeccion(): Observable<SobreNosotrosModel> {
        return this.http.get<SobreNosotrosModel>(`${this.urlHomeAdmin}/sobre-nosotros/ObtenerSeccion`);
    }

    getInfoPaginaSobreNosotros(): Observable<NosotrosModelV2> {
        return this.http.get<NosotrosModelV2>(`${this.urlHome}/sobre-nosotros`);
      }
}
