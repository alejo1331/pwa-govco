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
  id_: string = "pwa";
  idTarjetas: string;
  classOrdenTarjetas: string;
  // variables contador
  ultimaPagina: number = 0;
  primerPagina: number = 0;
  siguientePagina: number = 0;
  k: number = 0;

  ubicacion: any;

  constructor(protected carruselServe: CarruselUnoService) {
    this.idTarjetas = "tarjetas-carrusel-pwa";
    this.classOrdenTarjetas = "grupo"
  }

  ngOnInit(): void {
    this.ultimaPagina = this.obetenerNumeroPaginas() - 1;
    this.carruselServe.getTramitesMasConsultadosAsync().subscribe((info: CarruselUnoInterface) => {
      this.tramites = info.data;
      this.construirCarrucel(0, true);
    })
  }

  obetenerNumeroPaginas(): number {
    // var obj = this;
    // var elementos = 4;
    // var division = obj.tramites.length / elementos;
    // var decimal = division % 1;
    // var res = Number((decimal >= 0.5) ? division.toFixed(0) : (decimal == 0 ? Number(division.toFixed(0)) : Number(division.toFixed(0)) + 1));
    return 4;
  }

  obetenerElementosPorPagina() {
    return 3;
  }

  flechaIzquierda() {
    this.paginaActual(120);
    var totalPaginas = this.obetenerNumeroPaginas();
    this.k -= 1;
    if (this.k < 0) {
      this.k = totalPaginas - 1;
    }
    setTimeout(() => {
      this.construirCarrucel(this.k, false);
    }, 800);
  }

  flechaDerecha() {
    this.paginaActual(-120);

    var totalPaginas = this.obetenerNumeroPaginas();
    this.k += 1;
    if (this.k >= totalPaginas) {
      this.k = 0;
    }
    // setTimeout(() => {
    //   this.paginaSiguiente(-120, 2);
    // }, 800);
    setTimeout(() => {
      this.construirCarrucel(this.k, false);
    }, 800);


  }

  paginaSiguiente(orientacion: number, grupo: number) {
    var paginaSiguiente = Array.from((document.querySelectorAll('.' + this.classOrdenTarjetas + grupo) as NodeListOf<HTMLElement>));
    paginaSiguiente.forEach((elemento, i) => {
      paginaSiguiente[i].classList.add('active');
      setTimeout(() => {
        paginaSiguiente[i].style.transition = 'transform ' + 0.4 * (i + 1) + 's';
        paginaSiguiente[i].style.transform = 'translate(' + orientacion + '%, 0)';
      }, 1);
    });
  }

  paginaActual(orientacion: number) {
    var paginaSiguiente = Array.from((document.querySelectorAll('.' + this.classOrdenTarjetas + '1') as NodeListOf<HTMLElement>)).reverse();
    paginaSiguiente.forEach((elemento, i) => {
      paginaSiguiente[i].style.transition = 'transform ' + 0.4 * (i + 1) + 's';
      paginaSiguiente[i].style.transform = 'translate(' + orientacion + '%, 0)';
    });
  }

  construirCarrucel(paginaActual: number, ngOn: boolean) {

    var pagina_Siguiente: number = paginaActual + 1 > this.ultimaPagina ? this.primerPagina : paginaActual + 1;
    var pagina_Anterior: number = paginaActual - 1 < 0 ? this.ultimaPagina : paginaActual - 1;

    var html = "";
    document.getElementById(this.idTarjetas)!.innerHTML = "";
    var elementosPorPagina = this.obetenerElementosPorPagina();

    // construccion pagina-anterior, pagina-actual y pagina-siguiente, total 3 paginas
    var totalPaginas = 3;

    for (var i = 0; i < totalPaginas; i++) {
      for (var n = 0; n < elementosPorPagina; n++) {
        var active: string, posicion: number, microIteracion: string = "", transition: string, transform: string;
        // microIteracion = i == 0 ? "" : " ";
        // transition = `style="transition: transform ` + 0.4 * (n + 1) + `s ease 0s;"`
        // transform = `style="transform: translate(` + -120 + `%, 0px);"`
        active = i == 1 ? "carrusel-uno-item active" : "carrusel-uno-item";
        posicion = i == 0 ? n + pagina_Anterior * 3 : (i == 1 ? n + paginaActual * 3 : n + pagina_Siguiente * 3);

        if (this.tramites[posicion] != undefined) {
          var nombre = (this.tramites[posicion].nombre.length > 85) ? this.tramites[posicion].nombre.substring(0, 85) + "..." : this.tramites[posicion].nombre;
          var icono = this.tramites[posicion].iconoCategoria != "" ? this.tramites[posicion].iconoCategoria : "https://govco-prod-webutils.s3.amazonaws.com/uploads/2021-10-26/d8f3f555-6765-451f-8ea8-d8109692f458-CAT_DEFAULT-80px.svg";
          icono = this.codigoCategoria ? '' : `<img src="` + icono + `" alt="" />`;

          html += `<div class="` + this.classOrdenTarjetas + i + ` col-ms-12 col-md-6 col-lg-4 ` + active + `" >
                      <a role="link" class="tarjetas-link" aria-label="`+ nombre + `" href="/ficha-tramites-y-servicios/T` + this.tramites[posicion].id + `">
                        <div class="tarjeta-pwa"> 
                            `+ icono + `
                            <span>`+ nombre + `</span>
                        </div>
                      </a>
                   </div>`;
        }
      }
      document.getElementById(this.idTarjetas)!.innerHTML = html;
    }
  }

  sleep(milliseconds: number) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
  }

}
