import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-modal-informacion',
  templateUrl: './modal-informacion.component.html',
  styleUrls: ['./modal-informacion.component.scss']
})
export class ModalInformacionComponent  {
  @Input() detail:any;
  constructor(
    public activeModal: NgbActiveModal,
    private router: Router,
  ) { }

  direccionar(routePage:any){
    this.activeModal.close();
    this.router.navigate([routePage]);
  }


}
