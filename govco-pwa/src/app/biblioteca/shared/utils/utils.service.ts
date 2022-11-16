import { Injectable } from '@angular/core';
import { GlobalConstants } from '../../common/global-constants';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(private global: GlobalConstants) { }

  newItem(data: any) {
    for (let d of data) {
      if (d && d.publicaciones && d.publicaciones.length > 0) {
        for (let publicacion of d.publicaciones) {
          publicacion.nuevo = this.validateDate(publicacion.fecha);
        }
      } else if (d && d.recursos && d.recursos.length > 0) {
        for (let recurso of d.recursos) {
          recurso.nuevo = this.validateDate(recurso.fecha);
        }
      } else {
        d.nuevo = this.validateDate(d.fecha);
      }
    }
  }

  validateDate(date: any) {
    const dayInMillis = this.global.tiempoEtiqueta * 3600000;
    const fecha = new Date(date).getTime() / dayInMillis;
    const now = new Date().getTime() / dayInMillis;
    const dif = now - fecha;
    return dif < 1 ? true : false;
  }
}
