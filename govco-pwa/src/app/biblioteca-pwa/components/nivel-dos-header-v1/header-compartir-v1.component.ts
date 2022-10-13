import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { BottomMenuService } from 'src/app/transversales/services/bottom-menu/bottom-menu.service';

@Component({
  selector: 'app-header-compartir-v1',
  templateUrl: './header-compartir-v1.component.html',
  styleUrls: ['./header-compartir-v1.component.css'],
})
export class HeaderCompartirV1Component implements OnInit {
  @Input() urlTramite: string;
  @Input() titleTramite: any;
  @Input() botonAtras: { url: string, estadoMenuInferior: boolean, itemMenu: number };

  constructor(
    private router: Router,
    public bottomService: BottomMenuService,
  ) { }

  ngOnInit(): void { }

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
    this.router.navigate([this.botonAtras.url]);
    this.bottomService.putOcultandoBottomMenu(this.botonAtras.estadoMenuInferior);
    setTimeout(() => {
      this.bottomService.seleccionandoItem(this.botonAtras.itemMenu);
    }, 100);
  }
}
