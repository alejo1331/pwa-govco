import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { BottomMenuService } from 'src/app/transversales/services/bottom-menu/bottom-menu.service';

@Component({
  selector: 'app-header-compartir-v1',
  templateUrl: './header-compartir-v1.component.html',
  styleUrls: ['./header-compartir-v1.component.css'],
})
export class HeaderCompartirV1Component {
  @Input() urlTramite: string;
  @Input() titleTramite: any;
  @Input() botonAtras: { url: string, tipoNavegacion: string };

  constructor(
    private router: Router,
    public bottomService: BottomMenuService,
  ) { }

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

  accionAtras(): void {
    switch (this.botonAtras.tipoNavegacion) {
      case 'href':
        location.href = this.botonAtras.url
        break;
      case 'router':
        this.router.navigate([this.botonAtras.url]);
        break;
    }
  }
}
