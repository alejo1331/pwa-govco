import { Component, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalTutorialesComponent } from '../modal-tutoriales/modal-tutoriales.component';

@Component({
  selector: 'app-tutoriales',
  templateUrl: './tutoriales.component.html',
  styleUrls: ['./tutoriales.component.scss']
})
export class TutorialesComponent {

  @Input() infoTramite:any;

  constructor(
    private modalService: NgbModal
  ) { }


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

}
