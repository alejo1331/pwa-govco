import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { DataBasicaPuntosInterface } from '../../models/puntos-de-atencion/data-basica-puntos-interface';
import { TramitesPorIdService } from '../../services/tramites-por-id-service/tramites-por-id.service';
import { TipoEnlace } from '../../models/tramites-id-models/tramites-por-id-interface';
import { ValidateUrlService } from '../../services/validate-url.service';
import { ModalFechasDisponiblesComponent } from 'src/app/tramites/components/ficha-tramite/modal-fechas-disponibles/modal-fechas-disponibles.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


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
  nombreEnlace: string;

  showBotonFechas: boolean;

  constructor(
    protected fichaTramiteService: TramitesPorIdService,
    public validarUrlService: ValidateUrlService,
    private modalService: NgbModal) { }

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
    this.urlBoton = this.data.UrlTramiteEnLinea;
    this.getIconoTramite(this.data.Tipotramite);
    this.setDataBoton(this.data.Tipotramite);
    this.showBotonFecha();
    this.nombreEnlaceFechas()
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
    this.iconoCosto = data === 'SI'? 'monetization_on' : 'money_off';
  }

  showBotonFecha() {
    this.fichaTramiteService.GetFechasByTramite(this.data.IdTramite).subscribe(
      (resp: any) => {
        if(resp.UrlCalendarioEjecucion != null || resp.fechasEspecificas.length > 0) {
          return this.showBotonFechas = true
        } else {
          return this.showBotonFechas = false;
        }
      },
      (error) => console.log(error)
    );
  }

  nombreEnlaceFechas(){
    this.fichaTramiteService.GetFechasByTramite(this.data.IdTramite).subscribe(
      (resp:any)=> {
      if(resp.UrlCalendarioEjecucion != null) {
        return this.nombreEnlace = "Ir a página web";
      } else {
        return this.nombreEnlace = "Ver fechas";
      }
    });

  }

  getFechas(){

    if(this.data.UrlCalendarioEjecucion){
      console.log(this.data.UrlCalendarioEjecucion)
      console.log(this.data)
      window.open(this.data.UrlCalendarioEjecucion,'_blank');
    } else {
      this.fichaTramiteService.GetFechasByTramite(this.data.IdTramite).subscribe(  (resp)=> {
        this.showModalFechas(resp.fechasEspecificas)
      });
    }
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
      idAccion: 0,
    };
    this.abrirPuntosAtencion.emit(data);
  }

  showModalFechas(data: any) {
    console.log(data)
    const modal = this.modalService.open(ModalFechasDisponiblesComponent, {
      size: 'lg',
      backdrop: 'static',
      keyboard: false,
    });
    modal.componentInstance.fechas = data;
  }
}
