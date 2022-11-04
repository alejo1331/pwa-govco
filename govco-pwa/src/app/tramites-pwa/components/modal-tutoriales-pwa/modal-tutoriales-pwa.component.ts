import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ValidateUrlService } from '../../services/validate-url.service';

@Component({
  selector: 'app-modal-tutoriales-pwa',
  templateUrl: './modal-tutoriales-pwa.component.html',
  styleUrls: ['./modal-tutoriales-pwa.component.scss'],
})
export class ModalTutorialesPwaComponent implements OnInit {
  @Input() data: any;
  constructor(
    public activeModal: NgbActiveModal,
    private validateUrlService: ValidateUrlService
  ) {}

  ngOnInit(): void {}

  validateUrl(url: string) {
    this.validateUrlService.validate(url).subscribe((data: boolean) => {
      if (data) {
        url = url.match(/^https?:/) ? url : '//' + url;
        window.open(url);
      } else {
        // this.utilsService.openModalErrorValidateUrl();
      }
    });
  }
}
