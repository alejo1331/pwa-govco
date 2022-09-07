import { Component, Input, OnInit } from '@angular/core';
import { UtilsService } from '../../../../services/utils.service';
import { ValidateUrlService } from '../../../../services/validate-url.service';

@Component({
  selector: 'app-no-suit-header',
  templateUrl: './no-suit-header.component.html',
  styleUrls: ['./no-suit-header.component.scss']
})
export class NoSuitHeaderComponent implements OnInit {

  @Input() data: any;
  @Input() informacionFicha: any;

  constructor(
    private validateUrlService: ValidateUrlService,
    private utilsService: UtilsService
  ) { }

  ngOnInit () {
  }

  validateUrl(url: string, e:any) {
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
