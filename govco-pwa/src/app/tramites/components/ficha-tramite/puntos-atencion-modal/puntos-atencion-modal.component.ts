import { Component, Input, OnInit, HostListener } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OrderPipe } from 'ngx-order-pipe';
import { UtilsService } from 'src/app/tramites/services/utils.service';
import { ValidateUrlService } from 'src/app/tramites/services/validate-url.service';
import { MapaModalComponent } from '../mapa-modal/mapa-modal.component';

@Component({
  selector: 'app-puntos-atencion-modal',
  templateUrl: './puntos-atencion-modal.component.html',
  styleUrls: ['./puntos-atencion-modal.component.scss']
})
export class PuntosAtencionModalComponent implements OnInit {

  @Input() puntosAtencion: any;
  @Input() normatividad: any;

  p = 1;
  serchText: string;
  order = 'PuntoAtencionNombre';
  reverseDepartamento = false;
  reversePunto = false;
  sortedCollection: any[];

  windowWidth = window.innerWidth;

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.windowWidth = window.innerWidth;
  }

  constructor(
    private modalService: NgbModal,
    private activeModal: NgbActiveModal,
    private validateUrlService: ValidateUrlService,
    private utilsService: UtilsService,
    private orderPipe: OrderPipe
  ) {
    
  }

  ngOnInit(): void {
    this.sortedCollection = this.orderPipe.transform(this.puntosAtencion, 'PuntoAtencionNombre');
  }

  printCoordenadas(latitud:any, longitud:any, direccion:any){
    const modal = this.modalService.open(MapaModalComponent,{ size: 'lg', backdrop: 'static', keyboard: false});
    modal.componentInstance.latitud = latitud;
    modal.componentInstance.longitud = longitud;
    modal.componentInstance.direccion = direccion;
  }

  closeModal() {
    this.activeModal.close();
  }

  validateUrl(url: string, e: any) {
    e.preventDefault();
    this.validateUrlService.validate(url)
      .subscribe((data: boolean) => {
        if (data) {
          url = url.match(/^https?:/) ? url : '//' + url;
          location.href = url;
        } else {
          this.utilsService.openModalErrorValidateUrl();
        }
      });
  }

  setOrder(value: string) {
    if (value === 'PuntoAtencionNombre') {
      this.reversePunto = !this.reversePunto;
    } else {
      this.reverseDepartamento = !this.reverseDepartamento;
    }
    this.order = value;
  }
  
  @HostListener('document:keydown', ['$event'])onkeydown(e:Event){
    this.p = 1;
  }

}
