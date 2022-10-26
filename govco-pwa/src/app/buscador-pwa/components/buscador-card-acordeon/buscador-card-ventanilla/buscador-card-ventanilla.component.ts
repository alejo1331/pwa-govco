import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-buscador-card-ventanilla',
  templateUrl: './buscador-card-ventanilla.component.html',
  styleUrls: ['./buscador-card-ventanilla.component.scss']
})
export class BuscadorCardVentanillaComponent implements OnInit {

  public items = [
    {
      active: false,
      titulo: 'Ventanilla Única Empresarial',
      responsable:'Ministerio de Comercio, Industria y Turismo',
      urlVentanillas: '/buscar-pwa',
      descripcion: 'Es una estrategia de articulación público privada que busca mejorar el entorno para el desarrollo de la actividad.',
    }, 
    {
      active: false,
      titulo: 'Ventanilla Única Empresarial',
      responsable:'Ministerio de Comercio, Industria y Turismo',
      urlVentanillas: '/buscar-pwa',
      descripcion: 'Es una estrategia de articulación público privada que busca mejorar el entorno para el desarrollo de la actividad.',
    },
    {
      active: false,
      titulo: 'Ventanilla Única Empresarial',
      responsable:'Ministerio de Comercio, Industria y Turismo',
      urlVentanillas: '/buscar-pwa',
      descripcion: 'Es una estrategia de articulación público privada que busca mejorar el entorno para el desarrollo de la actividad.',
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
