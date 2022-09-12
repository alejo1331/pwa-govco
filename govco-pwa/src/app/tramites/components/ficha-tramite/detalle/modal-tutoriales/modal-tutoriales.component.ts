import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UtilsService } from 'src/app/tramites/services/utils.service';
import { ValidateUrlService } from 'src/app/tramites/services/validate-url.service';

@Component({
  selector: 'app-modal-tutoriales',
  templateUrl: './modal-tutoriales.component.html',
  styleUrls: ['./modal-tutoriales.component.scss']
})
export class ModalTutorialesComponent implements OnInit {
  @Input() data: any;

  constructor(
    public activeModal: NgbActiveModal,
    private validateUrlService:ValidateUrlService,
    private utilsService: UtilsService,
  ) { }

  ngOnInit(): void {
  }

  validateUrl(url: string) {

    this.validateUrlService.validate(url)
      .subscribe((data: boolean) => {
        if (data) {
          console.log("data", data)
          url = url.match(/^https?:/) ? url : '//' + url;
          window.open(url);
        } else {
          this.utilsService.openModalErrorValidateUrl();
        }
      })
  }

  direccionar(routePage: any){
    // this.activeModal.close();
    // this.router.navigate([routePage]);
  }

}
