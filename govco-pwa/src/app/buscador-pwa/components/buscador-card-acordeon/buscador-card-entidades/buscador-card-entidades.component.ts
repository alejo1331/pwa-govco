import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { EntidadesInterface } from 'src/app/buscador-pwa/models/entidades-interface';
import { urlsLocal } from 'src/variables-globales/urlsLocal';
import { ValidarUrlService } from 'src/app/buscador-pwa/services/validar-url.service';

@Component({
  selector: 'app-buscador-card-entidades',
  templateUrl: './buscador-card-entidades.component.html',
  styleUrls: ['./buscador-card-entidades.component.scss'],
})
export class BuscadorCardEntidadesComponent implements OnInit, OnChanges {

  @Input() data: EntidadesInterface[];

  public items: {
    active: boolean,
    link: string;
    linkEntidad: string;
    orden: string;
    titulo: string;
  }[] = [];
  href: boolean = true;

  constructor(
    public validarUrlService: ValidarUrlService
  ) {}

  ngOnInit(): void {
  }

  ngDoCheck() {

    if (this.items.length > 0){

      if(document.getElementById('acordeonEntidades')){
        $('#acordeonEntidades div.card:nth-child(-n+5)').addClass('actived')
      }
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.data.previousValue != changes.data.currentValue) {
      this.items = []
    };
    changes.data.currentValue.forEach((element: EntidadesInterface) => {
      this.href = true;
      Object.values(urlsLocal).find(url => {
         element.link.indexOf(url) >= 0 ? this.href = false : null;
      })
      this.items.push(
        {
          active: false,
          titulo: element.titulo,
          link: element.link,
          linkEntidad: element.linkEntidad,
          orden: element.orden
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

  VerMasResultados(){
    let resultadosActivos = $('div.card');
    let ultimoActivo = resultadosActivos.filter('.actived:last').index();
    resultadosActivos.filter(':lt(' + (ultimoActivo + 6) + ')').addClass('actived');
  }
}
