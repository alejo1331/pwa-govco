import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-ficha-especifica-header-pwa',
  templateUrl: './ficha-especifica-header-pwa.component.html',
  styleUrls: ['./ficha-especifica-header-pwa.component.scss'],
})
export class FichaEspecificaHeaderPwaComponent implements OnInit {
  @Input() data: any;
  constructor() {}

  ngOnInit(): void {}

  // validateUrl(url: string, e: any) {
  //   e.preventDefault();
  //   this.validateUrlService.validate(url).subscribe((data: boolean) => {
  //     if (data) {
  //       url = url.match(/^https?:/) ? url : '//' + url;
  //       window.open(url);
  //     } else {
  //       this.utilsService.openModalErrorValidateUrl();
  //     }
  //   });
  // }
}
