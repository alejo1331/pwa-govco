import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../services/home.service';
import { BannerPrincipalModel } from '../../models/banner-principal.model';

@Component({
  selector: 'app-banner-principal-pwa',
  templateUrl: './banner-principal-pwa.component.html',
  styleUrls: ['./banner-principal-pwa.component.scss']
})
export class BannerPrincipalPwaComponent implements OnInit {
  public titleBanner: string = 'Bienvenido a GOV.CO';
  public textoBanner: string = '!No mas vueltas! Encuentra tramites, servicios e informacion del Estado colombiano'
  public textoPrimario: string = 'Facilitamos tu busqueda.'
  public textoSecundario: string = ''
  public textoBoton: string = ''
  public imagen: string = '';
  public descripcionImagen: string = '';
  public urlBoton: string = ''

  constructor(private homeService : HomeService) { }

  ngOnInit (): void {
    this.homeService.getBannerPrincipal().subscribe( ( info: BannerPrincipalModel ) => {
      if ( info['succeeded'] ) {
        const { textoBienvenida, textoBuscador, textoAuxiliar, textoBotonAuxiliar, urlBotonAuxiliar, listaImagenes } = info['data'];
        const textoIndex = textoAuxiliar.indexOf( '.' );
        const textoLength = textoAuxiliar.length;
        this.titleBanner = textoBienvenida;
        this.textoBanner = textoBuscador;
        this.textoPrimario = textoAuxiliar.slice(0, textoIndex + 1);
        this.textoSecundario = textoAuxiliar.slice(textoIndex + 1, textoLength);
        this.textoBoton = textoBotonAuxiliar;
        this.urlBoton = urlBotonAuxiliar;
        console.log(urlBotonAuxiliar)
        const imagenAleatoria = listaImagenes[Math.floor( Math.random() * listaImagenes.length )];
        const { urlImagen, textoDescriptivo } = imagenAleatoria;
        this.imagen = urlImagen;
        this.descripcionImagen = textoDescriptivo;
      }
    })
  }

  goToLink(url: string){
    window.open( url, "_blank" );
  }

}
