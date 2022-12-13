import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UtilsService } from 'src/app/tramites/services/utils.service';
import { ValidateUrlService } from 'src/app/tramites/services/validate-url.service';

@Component({
  selector: 'app-modal-tutoriales',
  templateUrl: './modal-tutoriales.component.html',
  styleUrls: ['./modal-tutoriales.component.scss'],
})
export class ModalTutorialesComponent {
  @Input() data: any;

  constructor(
    public activeModal: NgbActiveModal,
    private validateUrlService: ValidateUrlService,
    private utilsService: UtilsService
  ) {}


  validateUrl(url: string) {
    this.validateUrlService.validate(url).subscribe((data: boolean) => {
      if (data) {
        url = url.match(/^https?:/) ? url : '//' + url;
        window.open(url);
      } else {
        this.utilsService.openModalErrorValidateUrl();
      }
    });
  }

}
