import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-buscador-card-portales',
  templateUrl: './buscador-card-portales.component.html',
  styleUrls: ['./buscador-card-portales.component.scss'],
})
export class BuscadorCardPortalesComponent implements OnInit {
  titleAcordeon = 'Portal de Datos del Estado colombiano';
  data = {
    Entidad: 'I.P.S. Centro de Salud - Macaravita',
    PaginaWeb: 'www.google.com',
    DescripcionTramite:
      ' Es una estrategia de articulación público privada que busca mejorar el entorno para el desarrollo de la actividad. El Ministerio de Educación Nacional y el Ministerio de Ciencia, Tecnología e Innovación invitan a los Docentes.',
  };

  infoDescripcionTramite: any;
  contenidoDescripcion: string;
  contenidoLeido: string;
  caracteresCategoria: boolean = false;
  nombreExpanded: string = 'Leer más...';

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
}
