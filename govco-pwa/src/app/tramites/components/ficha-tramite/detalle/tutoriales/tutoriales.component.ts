import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalTutorialesComponent } from '../modal-tutoriales/modal-tutoriales.component';

@Component({
  selector: 'app-tutoriales',
  templateUrl: './tutoriales.component.html',
  styleUrls: ['./tutoriales.component.scss']
})
export class TutorialesComponent implements OnInit {

  @Input() infoTramite:any;

  constructor(
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
  }

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
