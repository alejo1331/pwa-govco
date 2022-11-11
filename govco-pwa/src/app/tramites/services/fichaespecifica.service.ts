import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FichaespecificaService {

  private tramite: any;

  setTramite(data: any) {
    this.tramite = data;
  }

  getTramite(){
    return this.tramite;
  }

}
