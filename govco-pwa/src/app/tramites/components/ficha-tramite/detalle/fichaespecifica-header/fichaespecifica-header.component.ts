import { Component, Input } from '@angular/core';
import { UtilsService } from 'src/app/tramites/services/utils.service';
import { ValidateUrlService } from 'src/app/tramites/services/validate-url.service';

@Component({
  selector: 'app-fichaespecifica-header',
  templateUrl: './fichaespecifica-header.component.html',
  styleUrls: ['./fichaespecifica-header.component.scss']
})
export class FichaespecificaHeaderComponent {

  @Input() data: any;

  constructor(
    private validateUrlService: ValidateUrlService,
    private utilsService: UtilsService
  ) { }

  validateUrl(url: string, e: any) {
    e.preventDefault();
    this.validateUrlService.validate(url)
      .subscribe((data: boolean) => {
        if (data) {
          url = url.match(/^https?:/) ? url : '//' + url;
          window.open(url);
        } else {
          this.utilsService.openModalErrorValidateUrl();
        }
      })
  }

}
