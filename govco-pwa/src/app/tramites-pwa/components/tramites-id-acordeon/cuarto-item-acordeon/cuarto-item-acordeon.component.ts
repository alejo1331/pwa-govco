import { Component, Input, SimpleChanges } from '@angular/core';
import { TramitesPorIdService } from 'src/app/tramites-pwa/services/tramites-por-id-service/tramites-por-id.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalTutorialesPwaComponent } from '../../modal-tutoriales-pwa/modal-tutoriales-pwa.component';

@Component({
  selector: 'app-cuarto-item-acordeon',
  templateUrl: './cuarto-item-acordeon.component.html',
  styleUrls: ['./cuarto-item-acordeon.component.scss']
})
export class CuartoItemAcordeonComponent{
  @Input() dataAcordeon: any;
  @Input() urlManualEnlinea: string;
  canalesMedios:any = []

  constructor(
    protected fichaTramiteService: TramitesPorIdService,
    private modalService: NgbModal,
  ) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.dataAcordeon.currentValue != undefined) {
      this.dataAcordeon = changes.dataAcordeon.currentValue;
      this.getMediosSeguimientoNoPersonal(this.dataAcordeon)
    }
  }

  getMediosSeguimientoNoPersonal(dataAcordeon:any) {
    this.fichaTramiteService.GetMediosSeguimientoNoPersonal(dataAcordeon.idTramite)
    .subscribe(
      (data) => {
        this.canalesMedios = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  aprenderConTutoriales(){
    const modalRef = this.modalService.open(ModalTutorialesPwaComponent, {
      size: 'lg',
      backdrop: 'static',
      keyboard: false,
      centered: true,
      windowClass: 'background-modal',
    });
    modalRef.componentInstance.data = this.urlManualEnlinea;

  }

}
