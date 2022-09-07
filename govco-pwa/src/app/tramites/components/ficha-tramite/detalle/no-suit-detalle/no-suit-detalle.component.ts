import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FichaTramiteService } from '../../../../services/ficha-tramite.service';
import { ModalFechasDisponiblesComponent } from '../../modal-fechas-disponibles/modal-fechas-disponibles.component';

@Component({
  selector: 'app-no-suit-detalle',
  templateUrl: './no-suit-detalle.component.html',
  styleUrls: ['./no-suit-detalle.component.scss']
})
export class NoSuitDetalleComponent implements OnInit {

  @Input() dataTratmite:any;
  @Input() informacionFicha:any;
  @Output() eventoGetPuntos = new EventEmitter<boolean>();

  constructor(
    private fichaTramiteService: FichaTramiteService,
    private modalService: NgbModal,
  ) { }

  ngOnInit() {}

  getPuntosAtencion(){
    this.eventoGetPuntos.emit(true);
  }

  getFechas(){
    this.fichaTramiteService.GetFechasByTramite(this.informacionFicha.id).subscribe( (resp:any[])=> {
      if(resp && resp.length > 0){
        this.showModalFechas(resp);
      }
    });
  }

  showModalFechas(data:any) {
    const modal = this.modalService.open(ModalFechasDisponiblesComponent, {
      size: 'lg',
      backdrop: 'static',
      keyboard: false
    });
    modal.componentInstance.fechas = data;
  }
}
