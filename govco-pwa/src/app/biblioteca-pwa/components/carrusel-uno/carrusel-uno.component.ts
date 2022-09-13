import { Component, OnInit } from '@angular/core';
import { CarruselUnoInterface } from '../carrusel-uno-interface';
import { CarruselUnoInterface1 } from '../carrusel-uno-interface-1';
import { CarruselUnoService } from '../carrusel-uno.service';

@Component({
  selector: 'app-carrusel-uno',
  templateUrl: './carrusel-uno.component.html',
  styleUrls: ['./carrusel-uno.component.scss']
})
export class CarruselUnoComponent implements OnInit {
  tramites: CarruselUnoInterface1[];
  titulo: string = "";
  codigoMunicipio: any;
  nombreMunicipio: any = "";
  pagina: number | null;
  textoCarga: string = "Cargando..."
  codigoCategoria: string;
  seccion: string;
  id_: string = "pwa";
  idTarjetas: string;
  idTarjetaEnGrupo: string;
  idSlide: string = "";
  n: number = 1;
  m: number = 0;

  ubicacion: any;

  constructor(protected carruselServe: CarruselUnoService) {
    this.idTarjetas = "tarjetas-carrusel-pwa";
    this.idSlide = ""
    this.idTarjetaEnGrupo = "tarjetaPwa"
  }

  ngOnInit(): void {
    this.carruselServe.getTramitesMasConsultadosAsync().subscribe((info: CarruselUnoInterface) => {
      this.tramites = info.data;
      this.construirCarrucel();
    })
  }

  obetenerNumeroPaginas(): number {
    var obj = this;
    var elementos = 4;

    var division = obj.tramites.length / elementos;
    var decimal = division % 1;
    var res = Number((decimal >= 0.5) ? division.toFixed(0) : (decimal == 0 ? Number(division.toFixed(0)) : Number(division.toFixed(0)) + 1));
    return res;
  }

  obetenerElementosPorPagina() {
    return 3;

  }

  obtenerSlideActivo() {
    var long = this.obetenerNumeroPaginas();
    for (var i = 0; i < long; i++) {
      var contiene = document.getElementById(this.idSlide + i);
      if (contiene) {
        if (contiene.classList.contains("active")) {
          this.pagina = i;
          return i;
        }
      }
    }
    this.pagina = null;
    return 0;
  }

  clic(){
    var elementosPorPagina = 3;
    var paginasEnTotal = 4;
    var html = "";
    document.querySelector("#" + this.idTarjetas)!.innerHTML = "";

    var indice = 1;
    var pagina = this.obtenerSlideActivo();
    
    for (this.m = this.m; this.m < ( elementosPorPagina * this.n); this.m++) {
      // console.log("pagina actual",this.n)
      console.log("m",this.m)
      var active;
      if (this.n == 0) {
        active = this.m > 0 ? "carousel-item" : "carousel-item active";
      } else {
        active = this.m == this.n ? "carousel-item active" : "carousel-item";
      }

      var n = 0;
      for (var j = (this.m * elementosPorPagina); j < (elementosPorPagina * indice); j++) {
        // var oli = this.m == j ? "carousel-item active" : "carousel-item"
        console.log('j',j)
        if (this.tramites[j] != undefined) {
          var nombre = (this.tramites[j].nombre.length > 85) ? this.tramites[j].nombre.substring(0, 85) + "..." : this.tramites[j].nombre;
          var icono = this.tramites[j].iconoCategoria != "" ? this.tramites[j].iconoCategoria : "https://govco-prod-webutils.s3.amazonaws.com/uploads/2021-10-26/d8f3f555-6765-451f-8ea8-d8109692f458-CAT_DEFAULT-80px.svg";
          icono = this.codigoCategoria ? '' : `<img src="` + icono + `" alt="" />`;
          html += `<div id="` + this.idTarjetaEnGrupo + n + `"class=" ` + active  + ` col-ms-12 col-md-6 col-lg-4">
                <a role="link" class="tarjetas-link" aria-label="`+ nombre + `" href="/ficha-tramites-y-servicios/T` + this.tramites[j].id + `"><div class="tarjeta-pwa">
                  `+ icono + `
                  <span>`+ nombre + `</span>
                </div></a>
              </div>`;
        }
        n += 1;
        if (n == elementosPorPagina) {
          n = 0
        }
      }
      html += '</div>' +
        '</div>';
      indice++;
    }
    document.querySelector("#" + this.idTarjetas)!.innerHTML = html;
    this.n += 1;
    if(paginasEnTotal < this.n ){
      this.n = 1; this.m = 0
    }
  }

  construirCarrucel() {
    var html = "";
    document.querySelector("#" + this.idTarjetas)!.innerHTML = "";
    var long = this.obetenerNumeroPaginas();
    var elementosPorPagina = this.obetenerElementosPorPagina();

    var indice = 1;
    var pagina = this.obtenerSlideActivo();

    for (var i = 0; i < long; i++) {
      var active;
      if (pagina == 0) {
        active = i > 0 ? "carousel-item" : "carousel-item active";
      } else {
        active = i == pagina ? "carousel-item active" : "carousel-item";
      }

      // html += '<div id="' + this.idSlide + i + '" tabindex="0" class="contenedor-pwa ' + active + '" aria-label="Grupo ' + (i + 1) + ' . Use tab para consultar cada elemento del grupo.">' +
      //   '<div class="row col-12 px-0 mx-0">';
      var n = 0;
      for (var j = (i * elementosPorPagina); j < (elementosPorPagina * indice); j++) {
        if (this.tramites[j] != undefined) {
          var nombre = (this.tramites[j].nombre.length > 85) ? this.tramites[j].nombre.substring(0, 85) + "..." : this.tramites[j].nombre;
          var icono = this.tramites[j].iconoCategoria != "" ? this.tramites[j].iconoCategoria : "https://govco-prod-webutils.s3.amazonaws.com/uploads/2021-10-26/d8f3f555-6765-451f-8ea8-d8109692f458-CAT_DEFAULT-80px.svg";
          icono = this.codigoCategoria ? '' : `<img src="` + icono + `" alt="" />`;
          html += `<div id="` + this.idTarjetaEnGrupo + n + `"class=" ` + active + ` col-ms-12 col-md-6 col-lg-4">
                <a role="link" class="tarjetas-link" aria-label="`+ nombre + `" href="/ficha-tramites-y-servicios/T` + this.tramites[j].id + `"><div class="tarjeta-pwa">
                  `+ icono + `
                  <span>`+ nombre + `</span>
                </div></a>
              </div>`;
        }
        n += 1;
        if (n == this.obetenerElementosPorPagina()) {
          n = 0
        }
      }
      html += '</div>' +
        '</div>';
      indice++;
    }
    document.querySelector("#" + this.idTarjetas)!.innerHTML = html;
  }

}
