import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ValidarUrlService {

  servicioUrl = environment.serverUrlValidarUrl;

  constructor() { }

  validarLink(link:string) {

    return new Promise((resolve, reject) => {
      const validarFichaTramites = link.includes("ficha-tramites-y-servicios");
      
      if (!validarFichaTramites) {
        const url = this.servicioUrl + `/utils/ValidateUrl?url=${link}`;
        fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        }).then(response => {
            response.json().then(resp => {
            resolve(resp);
          }).catch( () => {
            reject(true);
          });
        });
      } else {
        resolve(false);
      }
    });
  }
}
