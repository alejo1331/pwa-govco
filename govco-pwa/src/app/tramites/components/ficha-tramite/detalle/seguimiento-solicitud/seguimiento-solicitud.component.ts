import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FichaTramiteService } from 'src/app/tramites/services/ficha-tramite.service';
import { UtilsService } from 'src/app/tramites/services/utils.service';
import { ValidateUrlService } from 'src/app/tramites/services/validate-url.service';
import { PuntosAtencionModalComponent } from '../../puntos-atencion-modal/puntos-atencion-modal.component';
import { ModalTutorialesComponent } from '../modal-tutoriales/modal-tutoriales.component';

@Component({
  selector: 'app-seguimiento-solicitud',
  templateUrl: './seguimiento-solicitud.component.html',
  styleUrls: ['./seguimiento-solicitud.component.scss']
})
export class SeguimientoSolicitudComponent implements OnInit {

  
  @Input() data: any[];
  @Input() dataInpersonal: any[];
  @Input() itemid: number;
  @Input() infoTramite:any;
  indice: number = 0;

  constructor(
    private fichaTramiteService: FichaTramiteService,
    private modalService: NgbModal,
    private validateUrlService: ValidateUrlService,
    private utilsService: UtilsService
  ) { }

  ngOnInit() {

    window.addEventListener('resize', () => {
      if(this.isMobile()){
        this.esResponsive();
      }
    });

    this.indice = this.indice + 1;
  }

  private showModal(data: { tipo: string; data: any; }) {
    const modal = this.modalService.open(PuntosAtencionModalComponent, {
      size: 'lg',
      backdrop: 'static',
      keyboard: false
    });
    if (data.tipo === 'puntos') {
      modal.componentInstance.puntosAtencion = data.data;
    }
    if (data.tipo === 'normatividad') {
      modal.componentInstance.normatividad = data.data;
    }
  }

  getPuntosAtencion() {
    const tipoAtencionPresencial = this.fichaTramiteService.getTipoAtencionPresencial();
    this.fichaTramiteService.GetPuntosAtencion(tipoAtencionPresencial, 3, this.itemid, 0, 0).subscribe(
      // Success response
      response => {
        console.log(response);
          this.showModal({tipo: 'puntos', data:  response});
      },
      // Failure response
      error => {
        console.error(error);
      },
    );
   }

  validateUrl(url: string, e: Event) {
    e.preventDefault();
    this.validateUrlService.validate(url)
      .subscribe((data: boolean) => {
        if (data) {
          url = url.match(/^https?:/) ? url : '//' + url;
          window.open(url);
        } else {
          this.utilsService.openModalErrorValidateUrl();
        }
      })
  }

  nombreCanal(tipoCanal: string){
    if(tipoCanal === 'WEB'){
      return null;
    }else if(tipoCanal === 'PRESENCIAL'){
      return null;
    }else if(tipoCanal === 'TELEFONICO'){
      return 'Telefónico'
    }else {
      return tipoCanal;
    }
  }

  urlIconos(data: string){
    if(data === "TELEFONICO"){
      return "https://govco-prod-webutils.s3.amazonaws.com/uploads/2022-06-03/e7702a0c-bf98-4a09-9b09-f36d94b9cf68-Icon_tel.svg"
    } else if (data === "Correo electrónico:") {
      return "https://govco-prod-webutils.s3.amazonaws.com/uploads/2022-06-03/dafc13cb-aff3-4383-aa3e-f8e8bd73a2aa-Icon_mail.svg"
    } else if(data === "Aprenda con tutoriales"){
      return "https://govco-prod-webutils.s3.amazonaws.com/uploads/2022-06-03/5f3dd9f5-7d55-4970-906a-6d031c97e912-Icon_tutorial.svg"
    } else if(data === "REDES"){
      return "https://govco-prod-webutils.s3.amazonaws.com/uploads/2022-06-30/6571ea8a-1628-4f24-ba4c-9b71c5a7d248-Icon_Redes.svg"
    } else {
      return ""
    }
  }

  // Metodo que abre el modal del botón ver tutoriales en las tables
  open() {
    if(this.infoTramite?.UrlManualEnLinea){
      const modalRef = this.modalService.open(ModalTutorialesComponent, {
        size: 'lg',
        // backdrop: 'static',
        // keyboard: false,
        windowClass: 'login-modal-error'
      });
  
      modalRef.componentInstance.data = this.infoTramite.UrlManualEnLinea;
    }
    
  }

  //Metodo para validar dimension de la pantalla
  esResponsive(){
    if(window.matchMedia("(max-width: 960px)").matches){
      return true;
    }
  }

  // Metodo de control del refresh en Mobiles
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
