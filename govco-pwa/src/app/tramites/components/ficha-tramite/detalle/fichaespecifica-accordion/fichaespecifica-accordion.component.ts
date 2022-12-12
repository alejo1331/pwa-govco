import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbAccordionConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-fichaespecifica-accordion',
  templateUrl: './fichaespecifica-accordion.component.html',
  styleUrls: ['./fichaespecifica-accordion.component.scss'],
  providers: [NgbAccordionConfig]
})
export class FichaespecificaAccordionComponent implements OnInit {

  active = 1;
  @Input() data: any[];
  @Input() tramite: any;
  @Output() cargarDetalleMomento =  new EventEmitter<any>();
  @Output() cargarMomentosAudiencia =  new EventEmitter<any>();
  IE: boolean;
  estadoAcordeon: string;

  constructor(
    config: NgbAccordionConfig
  ) {}

  ngOnInit(): void {
    this.IE = this.isIE();
  }

  isIE() {
    const ua = navigator.userAgent;
    return ua.indexOf('MSIE ') > -1 || ua.indexOf('Trident/') > -1;
  }

  eventoTabAudiencia(data: any) {
    // Valida si ya existen información del momento
    this.data.forEach( n => {
      if ( n.detalle === data.detalle ) {
        if (!n.momentos) {
         this.cargarMomentosAudiencia.emit(data);
        }
      }
    });
  }

  dataDetalleMomentoAudiencia(audiencia: string , momento: number) {
    const dataSolicitud = {
      audiencia,
      momento
    };
    this.cargarDetalleMomento.emit(dataSolicitud);
    // Valida si ya existen las acciones para el momento
    this.data.forEach( n => {
      if ( n.detalle === audiencia ) {
          n.momentos.forEach((m: any) => {
            if ( m.Orden === momento) {
              if (!m.acciones) {
                this.cargarDetalleMomento.emit(dataSolicitud);
                return;
              }
            }
          });
        }
    });
  }
  tooggleAccordian(event: any, audiencia: string) {
    const panelIndex = event.panelId.split("-")[1];
    const itemPanel = this.data.find(x => x.detalle === audiencia).momentos[panelIndex];

    if(event.nextState){
      this.estadoAcordeon = "Contraido"
      this.dataDetalleMomentoAudiencia(audiencia, itemPanel.MomentoId);
    } else {
      this.estadoAcordeon = "Ampliado"
    }

    if (this.IE) {
      const id = 'btn-' + event.panelId;
      const element = document.getElementById(id);
      if (element) element.click();
    }

  }

  beforeChange(event: any) {
    const id = 'title-' + event.nextId;
    const element = document.getElementById(id);
    if (element) element.click();
  }

  urlIconos(data: string){
    if(data === "Ciudadano"){
      return "https://govco-prod-webutils.s3.amazonaws.com/uploads/2022-06-03/1eb8a16c-8bc1-4415-8700-7d59dfbc5ca2-Icon_user.svg"
    } else if (data === "Extranjero") {
      return "https://govco-prod-webutils.s3.amazonaws.com/uploads/2022-06-03/76a3a782-9c19-425a-9e49-5b0a8be87e08-Icon_extranjero.svg"
    } else if(data === "Empresa privada"){
      return "https://govco-prod-webutils.s3.amazonaws.com/uploads/2022-06-03/572adca6-8a84-4091-bdb8-82e7d4ce1c54-Icon_Empresa_P.svg"
    } else if(data === "Entidad pública"){
      return "https://govco-prod-webutils.s3.amazonaws.com/uploads/2022-06-03/534fbc02-835e-41d0-b8dc-d3ab7cc510ed-Icon_entidad_P.svg"
    }else {
      return ""
    }
  }

  isMobile(){
    return (
        (navigator.userAgent.match(/Android/i)) ||
        (navigator.userAgent.match(/webOS/i)) ||
        (navigator.userAgent.match(/iPhone/i)) ||
        (navigator.userAgent.match(/iPod/i)) ||
        (navigator.userAgent.match(/iPad/i)) ||
        (navigator.userAgent.match(/BlackBerry/i))
    );
  }

}
