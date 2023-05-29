import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-tramite',
  templateUrl: './card-tramite.component.html',
  styleUrls: ['./card-tramite.component.scss']
})
export class CardTramiteComponent {

  public items = [
    {
      active: false,
      titulo: 'Matrícula profesional',
      subtitulo: 'Consejo Profesional Nacional de Ingeniería.',
      descripcion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam gravida.',
      integrado: true
    },
    {
      active: false,
      titulo: 'Matrícula profesional',
      subtitulo: 'Consejo Profesional Nacional de Ingeniería.',
      descripcion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam gravida.',
      integrado: true
    },
    {
      active: false,
      titulo: 'Matrícula profesional',
      subtitulo: 'Consejo Profesional Nacional de Ingeniería.',
      descripcion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam gravida.',
      integrado: true
    }
  ]


  activarItem(index:number) {
    this.items[index].active = !this.items[index].active;
    this.items.forEach(function(item, indexItem){
      if (indexItem != index) {
        item.active = false;
      }
    });
  }
}
