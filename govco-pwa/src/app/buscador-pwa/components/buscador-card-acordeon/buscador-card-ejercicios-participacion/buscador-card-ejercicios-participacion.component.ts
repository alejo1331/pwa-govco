import { Component, Input, OnInit } from '@angular/core';
import { EjerciciosParticipacionInterface } from 'src/app/buscador-pwa/models/ejercicios-participacion-interface';
import { urlsLocal } from 'src/variables-globales/urlsLocal';

@Component({
  selector: 'app-buscador-card-ejercicios-participacion',
  templateUrl: './buscador-card-ejercicios-participacion.component.html',
  styleUrls: ['./buscador-card-ejercicios-participacion.component.scss']
})
export class BuscadorCardEjerciciosParticipacionComponent implements OnInit {

  @Input() data: EjerciciosParticipacionInterface[];
  meses: string[] = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
  mesesNum: string[] = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
  href: boolean = true;

  public items: {
    active: boolean,
    titulo: string,
    urlParticipacion: string,
    descripcion: string,
    estado: string,
    fechaPublicacion: string,
    fechaCierre: string
  }[] = [];

  constructor() { }

  ngOnInit(): void {
    this.data.forEach((element) => {
      var fechaPublicacion: Array<String> = Array.from((element.fechaPublicacion.split(/\s+/).join('')).split("de"));
      var fechaCierre: Array<String> = Array.from((element.fechaCierre.split(/\s+/).join('')).split("de"));
      this.meses.forEach((mes, i) => {
        mes == fechaPublicacion[1] ?
          element.fechaPublicacion = fechaPublicacion[0] + '/' + this.mesesNum[i] + '/' + fechaPublicacion[2]
          : null;
        mes == fechaCierre[1] ?
          element.fechaCierre = fechaCierre[0] + '/' + this.mesesNum[i] + '/' + fechaCierre[2]
          : null;
      });
      Object.values(urlsLocal).forEach(url => {
        this.href = element.link.indexOf(url) >= 0 ? false : true;
      })
      
      this.items.push(
        {
          active: false,
          titulo: element.titulo,
          urlParticipacion: element.link,
          descripcion: element.descripcion,
          estado: element.estado,
          fechaPublicacion: element.fechaPublicacion,
          fechaCierre: element.fechaCierre
        }
      )
    })
  }

  activarItem(index: number) {
    this.items[index].active = !this.items[index].active;
    this.items.forEach(function (item, indexItem) {
      if (indexItem != index) {
        item.active = false;
      }
    });
  }

}
