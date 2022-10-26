import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UtilsService } from 'src/app/tramites/services/utils.service';
import { ValidateUrlService } from 'src/app/tramites/services/validate-url.service';
import { ModalAlertasComponent } from '../detalle/modal-alertas/modal-alertas.component';

@Component({
  selector: 'app-btn-tramite-linea',
  templateUrl: './btn-tramite-linea.component.html',
  styleUrls: ['./btn-tramite-linea.component.scss']
})
export class BtnTramiteLineaComponent implements OnInit {

  @Input() data: any;
  urlTramite: string;
  isEnLinea: boolean;
  nombreAccion: string;
  integrated: boolean = false;

  constructor(
    private validateUrlService: ValidateUrlService,
    private modalService: NgbModal,
    private utilsService: UtilsService,
  ) { }

  ngOnInit(): void {
    this.cambioNombreAccion();
  }

  validateUrl(url: string, e: any) {
    console.log('data btn tramite',this.data)

    // e.preventDefault();
    // if (!url.includes('embebido') && !url.includes('tramites-y-servicios')) {
    //   this.validateUrlService.validate(url)
    //     .subscribe((data: boolean) => {
    //       if (data) {
    //         window.open(url, "target='_blank'");
    //       } else {
    //         this.utilsService.openModalErrorValidateUrl();
    //       }
    //     });
    // } else {
    //   location.href = url;
    // }
  }

  openModalAlerta(entidad: string, url: string) {
    const modalRef = this.modalService.open(ModalAlertasComponent, {centered: true, windowClass: 'modal-alerta-salida vw-100'});
    // tslint:disable-next-line: max-line-length
    modalRef.componentInstance.message = 'Estás ingresando al sitio de ' + entidad + ', con esta acción abrirás una nueva pestaña. ¡Te esperamos pronto!';
    modalRef.componentInstance.linkUrl = url;
  }

  cambioNombreAccion() {
    if(this.integrated === true){
      return this.nombreAccion = "Ir al siguiente paso ";
    }else {
      return this.nombreAccion = "Realizar trámite ";
    }
  }

}
