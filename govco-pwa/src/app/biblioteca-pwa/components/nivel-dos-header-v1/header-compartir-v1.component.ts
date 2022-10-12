import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-header-compartir-v1',
  templateUrl: './header-compartir-v1.component.html',
  styleUrls: ['./header-compartir-v1.component.css'],
})
export class HeaderCompartirV1Component implements OnInit {
  @Input() urlTramite: string;
  @Input() titleTramite: any;

  constructor() {}

  ngOnInit(): void {}

  async shareTramite() {
    let shareData = {
      url: this.urlTramite,
      title: this.titleTramite.NombreEstandarizado,
    };

    try {
      await navigator.share(shareData);
    } catch (err) {
      console.log('error al compartir tramite.');
    }
  }
}
