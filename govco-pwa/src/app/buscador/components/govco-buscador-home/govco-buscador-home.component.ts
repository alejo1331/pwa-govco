import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD
import { BannerPrincipalInterface } from '../../../inicio/models/banner/banner-principal-interface'
import { BannerService } from '../../../inicio/services/banner-servivice/banner.service';

@Component({
  selector: 'buscador-home',
  templateUrl: './govco-buscador-home.component.html',
  styleUrls: ['./govco-buscador-home.component.scss']
})
export class BuscadorHomeComponent implements OnInit {

  banner: BannerPrincipalInterface;
  imagen: string;
  descripcionImagen: string;
  storage: any;
  constructor(private bannerService: BannerService) {
  }

  ngOnInit() {
    this.iniciarBannerPrincipal();
  }

  iniciarBannerPrincipal() {
    this.bannerService.getbannerPrincipal()
      .subscribe(
        (data: any) => { // Success
          if (data["succeeded"]) {
            this.banner = data["data"];
            var obj = this;
            // this.storage = this.isMobile()?sessionStorage:localStorage;
            this.storage = localStorage;
            var intervalo = setInterval(() => {
              if (obj.storage.getItem("sesionNueva")) {
                obj.asignarImagenRamdon();
                clearInterval(intervalo);
              }
            }, 10);
          } else {
            console.log("Errors: " + data["errors"] + " Message: " + data["message"]);
          }
        },
        (error) => {
          console.error(error);
        }
      );
  }

  asignarImagenRamdon() {
    let objImagenBanner = JSON.parse(this.storage.getItem("objImagenBanner")) == undefined ? { posImagen: 0, imagenBannePrincipal: "", descripcionImagen: "" } : JSON.parse(this.storage.getItem("objImagenBanner"));
    if (this.storage.getItem("sesionNueva") === "true") {
      objImagenBanner = { posImagen: 0, imagenBannePrincipal: "", descripcionImagen: "" };
      let num = Math.floor(Math.random() * (this.banner.listaImagenes.length));
      if (this.banner.listaImagenes.length > 0) {
        if (objImagenBanner.imagenBannePrincipal != "") {
          while (num == parseInt(objImagenBanner.posImagen)) {
            num = Math.floor(Math.random() * (this.banner.listaImagenes.length));
          }
        }
        objImagenBanner.posImagen = num;
        let re = /\ /gi;
        this.imagen = this.banner.listaImagenes[num].urlImagen.replace(re, "%20");
        objImagenBanner.imagenBannePrincipal = this.imagen;

        this.descripcionImagen = this.banner.listaImagenes[num].textoDescriptivo;
        objImagenBanner.descripcionImagen = this.descripcionImagen;
      } else {
        this.imagen = "";
        this.descripcionImagen = "";
      }
      this.storage.setItem("objImagenBanner", JSON.stringify(objImagenBanner));
    } else {
      this.imagen = objImagenBanner.imagenBannePrincipal;
      this.descripcionImagen = objImagenBanner.descripcionImagen;
    }
  }

  isMobile() {
    return (
      (navigator.userAgent.match(/Android/i)) ||
      (navigator.userAgent.match(/webOS/i)) ||
      (navigator.userAgent.match(/iPhone/i)) ||
      (navigator.userAgent.match(/iPod/i)) ||
      (navigator.userAgent.match(/iPad/i)) ||
      (navigator.userAgent.match(/BlackBerry/i))
    );
  }
=======

@Component({
  selector: 'app-govco-buscador-home',
  templateUrl: './govco-buscador-home.component.html',
  styleUrls: ['./govco-buscador-home.component.css']
})
export class GovcoBuscadorHomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

>>>>>>> Creacion de componentes
}
