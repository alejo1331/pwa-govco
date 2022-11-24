import { Component, Input } from '@angular/core';
import { ValidateUrlService } from '../../services/validate-url.service';

@Component({
  selector: 'app-ficha-especifica-header-pwa',
  templateUrl: './ficha-especifica-header-pwa.component.html',
  styleUrls: ['./ficha-especifica-header-pwa.component.scss'],
})
export class FichaEspecificaHeaderPwaComponent {
  @Input() data: any;
  constructor(private validateUrlService: ValidateUrlService) {}


  validateUrl(url: string, e: any) {
    e.preventDefault();
    this.validateUrlService.validate(url).subscribe((data: boolean) => {
      if (data) {
        url = url.match(/^https?:/) ? url : '//' + url;
        window.open(url);
      }
    });
  }
}
