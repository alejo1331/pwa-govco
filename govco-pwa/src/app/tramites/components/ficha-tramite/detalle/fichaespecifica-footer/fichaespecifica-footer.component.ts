import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FichaTramiteService } from 'src/app/tramites/services/ficha-tramite.service';
import { UtilsService } from 'src/app/tramites/services/utils.service';
import { ValidateUrlService } from 'src/app/tramites/services/validate-url.service';
import { PuntosAtencionModalComponent } from '../../puntos-atencion-modal/puntos-atencion-modal.component';
import { ModalAlertasComponent } from '../modal-alertas/modal-alertas.component';

@Component({
  selector: 'app-fichaespecifica-footer',
  templateUrl: './fichaespecifica-footer.component.html',
  styleUrls: ['./fichaespecifica-footer.component.scss']
})
export class FichaespecificaFooterComponent implements OnInit {

  @Input() data: any;
  @Input() itemid: number;
  urlTramite: string;
  isEnLinea: boolean;

  constructor(
    private fichaTramiteService: FichaTramiteService,
    private modalService: NgbModal,
    private validateUrlService: ValidateUrlService,
    private utilsService: UtilsService
  ) { }

  ngOnInit(): void {
    this.fichaTramiteService.GetBarraProcesoTramite(this.data.IdTramite).subscribe(res => {
      this.urlTramite = res.urlTramite.match(/^https?:/) ? res.urlTramite : res.urlTramite.includes("embebido") && res.urlTramite.includes("tramites-y-servicios") ? res.urlTramite : res.urlTramite;
      this.isEnLinea = res.isEnlinea;
    });
  }

  showModal(data: { tipo: string; data: any; }) {

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
  getNormatividadById() {
    this.fichaTramiteService.GetNormatividadById(this.data.IdTramite).subscribe(
      // Success response
      response => {
        this.showModal({ tipo: 'normatividad', data: response });
      },
      // Failure response
      error => {
        this.showModal({ tipo: 'normatividad', data: [] });
      },
    );
  }

  validateUrl(url: string, e: any) {
    e.preventDefault();
    if (!url.includes('embebido') && !url.includes('tramites-y-servicios')) {
      this.validateUrlService.validate(url)
        .subscribe((data: boolean) => {
          if (data) {
            window.open(url, "target='_blank'");
          } else {
            this.utilsService.openModalErrorValidateUrl();
          }
        });
    } else {
      location.href = url;
    }
  }

  openModalAlerta(entidad: string, url: string) {
    const modalRef = this.modalService.open(ModalAlertasComponent, {centered: true, windowClass: 'modal-alerta-salida vw-100'});
    // tslint:disable-next-line: max-line-length
    modalRef.componentInstance.message = 'Estás ingresando al sitio de ' + entidad + ', con esta acción abrirás una nueva pestaña. ¡Te esperamos pronto!';
    modalRef.componentInstance.linkUrl = url;
  }

}
