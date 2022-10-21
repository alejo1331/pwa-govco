import { Component, OnInit } from '@angular/core';
import { BannerInterface } from '../../models/banner/banner-interface';
import { BannerPrincipalInterface } from '../../models/banner/banner-principal-interface';
import { BannerService } from '../../services/banner-servivice/banner.service';

@Component({
  selector: 'app-banner-principal',
  templateUrl: './banner-principal.component.html',
  styleUrls: ['./banner-principal.component.scss']
})
export class BannerPrincipalComponent implements OnInit {

  banner: BannerPrincipalInterface;
  imagen: string;
  descripcionImagen: string;
  storage: any;
  urlBotonAuxiliar: string;

  constructor(private bannerService: BannerService) {
  }

  ngOnInit() {
    this.iniciarBannerPrincipal();
  }

  iniciarBannerPrincipal() {
    this.bannerService.getbannerPrincipal()
      .subscribe(
        (data: BannerInterface) => {
          if (data.succeeded) {
            this.banner = data.data;
            let urlCategorias: number = data.data.urlBotonAuxiliar.indexOf('/categorias-subcategorias');
            if (urlCategorias >= 0) {
              this.urlBotonAuxiliar = "/categorias-subcategorias"
            } else {
              this.urlBotonAuxiliar = data.data.urlBotonAuxiliar;
            }
            this.ramdonImagen(data.data)
          } else {
            console.log("Errors: " + data.error + " Message: " + data.mensaje);
          }
        },
        (error) => {
          console.error(error);
        }
      );
  }

  ramdonImagen(data: BannerPrincipalInterface) {
    var ramdon = Math.floor(Math.random() * data.listaImagenes.length);
    let re = /\ /gi;
    this.imagen = data.listaImagenes[ramdon].urlImagen.replace(re, "%20");
    this.descripcionImagen = data.listaImagenes[ramdon].textoDescriptivo;
  }

}
