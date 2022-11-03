import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { PortalTransversalesInterface } from 'src/app/buscador-pwa/models/portal-transversales-interface';
import { urlsLocal } from 'src/variables-globales/urlsLocal';
import { ValidarUrlService } from 'src/app/buscador-pwa/services/validar-url.service';

@Component({
  selector: 'app-buscador-card-portales',
  templateUrl: './buscador-card-portales.component.html',
  styleUrls: ['./buscador-card-portales.component.scss'],
})
export class BuscadorCardPortalesComponent implements OnInit, OnChanges {

  @Input() data: PortalTransversalesInterface[];

  public items: {
    active: boolean,
    descripcion: string;
    entidadNombre: string;
    link: string;
    linkEntidad: string;
    titulo: string;
  }[] = [];
  href: boolean = true;

  infoDescripcionTramite: any;
  contenidoDescripcion: string;
  contenidoLeido: string;
  caracteresCategoria: boolean = false;
  nombreExpanded: string = 'Leer más...';

  showBotonFechas: boolean;

  constructor(
    public validarUrlService: ValidarUrlService
  ) {}

  ngOnInit(): void {

  }

  ngDoCheck() {
    if (this.items.length > 0){
      if(document.getElementById('acordeonPortales')){
        $('#acordeonPortales div.card:nth-child(-n+5)').addClass('actived')
      }
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.data.previousValue != changes.data.currentValue) {
      this.items = []
    };
    changes.data.currentValue.forEach((element:PortalTransversalesInterface) => {
      this.href = true;
      Object.values(urlsLocal).find(url => {
         element.link.indexOf(url) >= 0 ? this.href = false : null;
      })
      this.items.push(
        {
          active: false,
          descripcion: element.descripcion,
          entidadNombre: element.entidadNombre,
          link: element.link,
          linkEntidad: element.linkEntidad,
          titulo: element.titulo
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

  VerMasResultados(){
    let resultadosActivos = $('div.card');
    let ultimoActivo = resultadosActivos.filter('.actived:last').index();
    resultadosActivos.filter(':lt(' + (ultimoActivo + 6) + ')').addClass('actived');

  }

}
