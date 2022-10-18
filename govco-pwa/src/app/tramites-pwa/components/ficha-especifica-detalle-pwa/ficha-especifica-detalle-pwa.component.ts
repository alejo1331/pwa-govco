import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { DataBasicaPuntosInterface } from '../../models/puntos-de-atencion/data-basica-puntos-interface';
import { TramitesPorIdService } from '../../services/tramites-por-id-service/tramites-por-id.service';

@Component({
  selector: 'app-ficha-especifica-detalle-pwa',
  templateUrl: './ficha-especifica-detalle-pwa.component.html',
  styleUrls: ['./ficha-especifica-detalle-pwa.component.scss'],
})
export class FichaEspecificaDetallePwaComponent implements OnInit {
  @Input() data: any;
  @Output() abrirPuntosAtencion = new EventEmitter<DataBasicaPuntosInterface>();

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

  constructor(protected fichaTramiteService: TramitesPorIdService) {}

  ngOnInit(): void {
    this.fichaTramiteService
      .GetServicioYTramiteEspecifico(this.data.IdTramite)
      .subscribe((data: any) => {
        this.infoDescripcionTramite = data;
        this.getIconoCosto(data?.Costo);
        this.contenidoDescripcion =
          this.infoDescripcionTramite.DescripcionTramite.substring(0, 250);
        this.contenidoLeido = this.infoDescripcionTramite.DescripcionTramite;
        if (this.contenidoDescripcion.length > 249) {
          this.caracteresCategoria = true;
        }
      });
    this.urlBoton = this.data.PaginaWeb;
    this.getIconoTramite(this.data.Tipotramite);
    this.setDataBoton(this.data.Tipotramite);
    this.showBotonFecha();
  }

  goToLink(url: string) {
    window.open(url, '_blank');
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
        this.infoDescripcionTramite.DescripcionTramite.substring(0, 250);
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

  showBotonFecha() {
    this.fichaTramiteService.GetFechasByTramite(this.data.IdTramite).subscribe(
      (resp: any) => {
        this.showBotonFechas = resp.fechasEspecificas.length > 0;
      },
      (error) => console.log(error)
    );
  }

  getFechas() {
    this.fichaTramiteService
      .GetFechasByTramite(this.data.IdTramite)
      .subscribe((resp) => {
        console.log('getFechas', resp);
        // this.showModalFechas(resp)
      });
  }

  setDataBoton(data: any) {
    if (data === 'En línea') {
      this.textoBoton = 'Realizar trámite';
    } else {
      this.textoBoton = 'Ver los puntos de atención';
    }
  }

  abrirPuntosAtencionClic() {
    let data: DataBasicaPuntosInterface = {
      transitionPuntosAtencion: '0%',
      transitionTramitesId: '-100%',
      activar: true,
      idTipo: 1,
      idMomento: 0,
      idAccion: 0
    }
    this.abrirPuntosAtencion.emit(data);
  }
}
