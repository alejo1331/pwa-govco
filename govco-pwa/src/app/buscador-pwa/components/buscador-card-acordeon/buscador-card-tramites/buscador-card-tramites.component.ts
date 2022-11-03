import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { TramitesServiciosInterface } from 'src/app/buscador-pwa/models/tramites-servicios-interface';
import { urlsLocal } from 'src/variables-globales/urlsLocal';

@Component({
  selector: 'app-buscador-card-tramites',
  templateUrl: './buscador-card-tramites.component.html',
  styleUrls: ['./buscador-card-tramites.component.scss'],
})
export class BuscadorCardTramitesComponent implements OnInit, OnChanges {
  @Input() data: TramitesServiciosInterface[];
  items: TramitesServiciosInterface[] = [];
  href: boolean = true;

  infoDescripcionTramite: any;
  contenidoDescripcion: string;
  contenidoLeido: string;
  caracteresCategoria: boolean = false;
  nombreExpanded: string = 'Leer más...';

  showBotonFechas: boolean;

  constructor() { }

  ngOnInit(): void {
  }

  ngDoCheck() {

    if (this.items.length > 0){

      if(document.getElementById('tramitesAcordeon')){
        $('#tramitesAcordeon div.card:nth-child(-n+5)').addClass('actived')
      }
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.data.previousValue != changes.data.currentValue) {
      this.items = []
    };
    changes.data.currentValue.forEach((element: TramitesServiciosInterface) => {
      this.href = true;
      Object.values(urlsLocal).find(url => {
         element.link.indexOf(url) >= 0 ? this.href = false : null;
      })
      console.log()
      this.items.push(
        {
          costo: element.costo,
          descripcion: element.descripcion,
          enLinea: element.enLinea,
          entidad: element.entidad,
          link: element.link,
          linkEntidad: element.linkEntidad,
          tiempoObtencion: element.tiempoObtencion,
          titulo: element.titulo
        }
      )
    })
    // this.infoDescripcionTramite = this.items;
    // this.contenidoDescripcion =
    //   this.infoDescripcionTramite.DescripcionTramite.substring(0, 125) + '...';
    // this.contenidoLeido = this.infoDescripcionTramite.DescripcionTramite;
    // if (this.contenidoDescripcion.length > 124) {
    //   this.caracteresCategoria = true;
    // }
  }

  showExpended() {
    if (this.nombreExpanded === 'Leer más...') {
      this.contenidoDescripcion =
        this.infoDescripcionTramite.DescripcionTramite;
      this.nombreExpanded = 'Leer menos';
    }
    return this.contenidoDescripcion;
  }

  showBotonLeer() {
    if (this.nombreExpanded === 'Leer más...') {
      this.contenidoDescripcion =
        this.infoDescripcionTramite.DescripcionTramite;
      this.nombreExpanded = 'Leer menos';
    } else {
      this.nombreExpanded = 'Leer más...';
      this.contenidoDescripcion =
        this.infoDescripcionTramite.DescripcionTramite.substring(0, 125) +
        '...';
    }
    return this.contenidoDescripcion;
  }

  activarItem(index: number) {
    let collection = document.querySelectorAll('.card-header.active');
    collection.forEach((element) => element.classList.toggle('active'));
    let cardActive = document.getElementById('heading' + index);
    cardActive?.classList.toggle('active');
  }
  VerMasResultados(){
    let resultadosActivos = $('div.card');
    let ultimoActivo = resultadosActivos.filter('.actived:last').index();
    resultadosActivos.filter(':lt(' + (ultimoActivo + 6) + ')').addClass('actived');

  }
}
