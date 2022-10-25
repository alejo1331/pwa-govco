import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-buscador-card-tramites',
  templateUrl: './buscador-card-tramites.component.html',
  styleUrls: ['./buscador-card-tramites.component.scss'],
})
export class BuscadorCardTramitesComponent implements OnInit {
  titleAcordeon =
    'Servicio de crédito para Instituciones de Educación Superior - IES';
  data = {
    Entidad: 'Alcaldia',
    PaginaWeb: 'www.google.com',
    Tipotramite: 'En línea',
    Costo: 'SI',
    DescripcionTramite:
      ' Otorgar el registro sanitario para producir, importar, comercializar y distribuir plaguicidas  de fabricación nacional e importados, de uso doméstico o de uso en salud pública, basado en un proceso técnico-científico y administrativo para evitar que se afecte la salud de la comunidad, la sanidad animal y vegetal sin  causar  deterioro al medio ambiente',
  };

  infoDescripcionTramite: any;
  contenidoDescripcion: string;
  contenidoLeido: string;
  caracteresCategoria: boolean = false;
  nombreExpanded: string = 'Leer más...';
  textoBoton: string;
  urlBoton = '';
  iconoTramite = '';
  iconoCosto = '';

  showBotonFechas: boolean;

  constructor() {}

  ngOnInit(): void {
    this.infoDescripcionTramite = this.data;
    this.contenidoDescripcion =
      this.infoDescripcionTramite.DescripcionTramite.substring(0, 125) + '...';
    this.contenidoLeido = this.infoDescripcionTramite.DescripcionTramite;
    if (this.contenidoDescripcion.length > 124) {
      this.caracteresCategoria = true;
    }
    this.getIconoCosto(this.data?.Costo);
    this.getIconoTramite(this.data.Tipotramite);
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

  getIconoTramite(data: any) {
    if (data === 'En línea') {
      this.iconoTramite = 'laptop_mac';
    } else if (data === 'Presencial') {
      this.iconoTramite = 'person';
    } else {
      this.iconoTramite = 'co_present';
    }
  }

  getIconoCosto(data: any) {
    data === 'SI'
      ? (this.iconoCosto = 'monetization_on')
      : (this.iconoCosto = 'money_off');
  }
}
