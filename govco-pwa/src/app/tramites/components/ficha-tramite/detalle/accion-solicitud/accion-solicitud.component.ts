import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FichaTramiteService } from 'src/app/tramites/services/ficha-tramite.service';
import { UtilsService } from 'src/app/tramites/services/utils.service';
import { ValidateUrlService } from 'src/app/tramites/services/validate-url.service';
import { PuntosAtencionModalComponent } from '../../puntos-atencion-modal/puntos-atencion-modal.component';

@Component({
  selector: 'app-accion-solicitud',
  templateUrl: './accion-solicitud.component.html',
  styleUrls: ['./accion-solicitud.component.scss']
})
export class AccionSolicitudComponent implements OnInit {

  constructor(
    private fichaTramiteService: FichaTramiteService,
    private modalService: NgbModal,
    private validateUrlService: ValidateUrlService,
    private utilsService: UtilsService
  ) { }

  @Input() data: any;

  dataAccion: any[] = [];
  dataCanales: any[] = [];

  ngOnInit(): void {
    this.validarEstadoExcepcion();
  }

  private validarEstadoExcepcion() {
    console.log('data accion solicitud', this.data)
    if (typeof (this.data.length) !== 'undefined') {
      this.dataAccion = this.data;
    } else {
      this.dataAccion.push(this.data);
    }
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

  getPuntosAtencion(IdTramite: number, OrdenMomento: number, AccionCondicionId: number) {
    const tipoAtencionPresencial = this.fichaTramiteService.getTipoAtencionPresencial();
    this.fichaTramiteService.GetPuntosAtencion(tipoAtencionPresencial, 2, IdTramite, OrdenMomento, AccionCondicionId).subscribe(
      // Success response
      response => {
        this.showModal({ tipo: 'puntos', data: response });
      },
      // Failure response
      error => {
        this.showModal({ tipo: 'puntos', data: [] });
      },
    );
  }

  validateUrl(url: string, e: any) {
    e.preventDefault();
    this.validateUrlService.validate(url)
      .subscribe((data: boolean) => {
        if (data) {
          url = url.match(/^https?:/) ? url : 'http://' + url;
          window.open(url);
        } else {
          this.utilsService.openModalErrorValidateUrl();
        }
      })
  }

}
