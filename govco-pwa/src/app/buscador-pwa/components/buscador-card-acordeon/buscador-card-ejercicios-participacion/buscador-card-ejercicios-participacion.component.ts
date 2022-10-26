import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-buscador-card-ejercicios-participacion',
  templateUrl: './buscador-card-ejercicios-participacion.component.html',
  styleUrls: ['./buscador-card-ejercicios-participacion.component.scss']
})
export class BuscadorCardEjerciciosParticipacionComponent implements OnInit {

  public items = [
    {
      active: false,
      titulo: 'Abierta la convocatoria “Maestro Investigador de Colombia”',
      urlParticipacion: '/buscar-pwa',
      descripcion: 'El Ministerio de Educación Nacional y el Ministerio de Ciencia, Tecnología e Innovación invitan a los Docentes y Direc…',
      estado: 'Activo',
      fechaPublicacion: '02/04/2022',
      fechaCierre: '16/08/2022'
    }, 
    {
      active: false,
      titulo: 'Abierta la convocatoria “Maestro Investigador de Colombia”',
      urlParticipacion: '/buscar-pwa',
      descripcion: 'El Ministerio de Educación Nacional y el Ministerio de Ciencia, Tecnología e Innovación invitan a los Docentes y Direc…',
      estado: 'Activo',
      fechaPublicacion: '02/04/2022',
      fechaCierre: '16/08/2022'
    },
    {
      active: false,
      titulo: 'Abierta la convocatoria “Maestro Investigador de Colombia”',
      urlParticipacion: '/buscar-pwa',
      descripcion: 'El Ministerio de Educación Nacional y el Ministerio de Ciencia, Tecnología e Innovación invitan a los Docentes y Direc…',
      estado: 'Activo',
      fechaPublicacion: '02/04/2022',
      fechaCierre: '16/08/2022'
    }      
  ]

  constructor() { }

  ngOnInit(): void {
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
