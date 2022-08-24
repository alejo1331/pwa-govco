import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-modal-informacion',
  templateUrl: './modal-informacion.component.html',
  styleUrls: ['./modal-informacion.component.css']
})
export class ModalInformacionComponent implements OnInit {
  @Input() detail:any;
  constructor(
    public activeModal: NgbActiveModal,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  direccionar(routePage:any){
    this.activeModal.close();
    this.router.navigate([routePage]);
  }


}
