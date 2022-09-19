import { Component, ElementRef, OnInit } from '@angular/core';
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
    const elementActive = document.querySelector('.container-tarjetas.active');
    const indexActive = elementActive?.getAttribute('data-index');
    const indexNext = indexActive ? parseInt(indexActive) + 1 : 1;
    const elementNext = document.querySelector('.container-tarjetas[data-index="' + indexNext + '"]');
    this.paginaActual(120, elementActive, elementNext, indexNext);
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
    const elementActive = document.querySelector('.container-tarjetas.active');
    const indexActive = elementActive?.getAttribute('data-index');
    let indexPrev = indexActive ? parseInt(indexActive) : 1;
    let indexNext = indexPrev ? indexPrev + 1 : 1;
    if (indexNext > 2) { indexNext = 0; }
    const elementNext = document.querySelector('.container-tarjetas[data-index="' + indexNext + '"]');
    this.paginaActual(-120, elementActive, elementNext, indexNext);

    var totalPaginas = this.obetenerNumeroPaginas();
    this.k += 1;
    if (this.k >= totalPaginas) {
      this.k = 0;
    }
    setTimeout(() => {
      elementActive?.classList.remove('active-old');
      elementNext?.classList.remove('transition-left');
      this.paginaSiguiente(indexPrev, indexNext);
    }, 1000);
    setTimeout(() => {
      // this.construirCarrucel(this.k, false);
    })
  }

  paginaSiguiente(indexPrev: number, indexNext: number) {
    var paginaSiguiente = Array.from((document.querySelectorAll('.' + this.classOrdenTarjetas + indexNext) as NodeListOf<HTMLElement>));
    var paginaAnterior = Array.from((document.querySelectorAll('.' + this.classOrdenTarjetas + indexPrev) as NodeListOf<HTMLElement>));
    paginaSiguiente.forEach((elemento, i) => {
      paginaAnterior[i].removeAttribute('style');
      paginaSiguiente[i].removeAttribute('style');
    });
  }

  paginaActual(orientacion: number, elementActive: Element | null, elementNext: Element | null, indexNext: number) {
    var paginaActual = Array.from((elementActive?.querySelectorAll('.carrusel-uno-item') as NodeListOf<HTMLElement>)).reverse();
    var paginaSiguiente = Array.from((elementNext?.querySelectorAll('.carrusel-uno-item') as NodeListOf<HTMLElement>)).reverse();

    elementActive?.classList.add('active-old');
    elementActive?.classList.remove('active');
    elementNext?.classList.add('active', 'transition-left');

    paginaActual.forEach((elemento, i) => {
      paginaActual[i].style.transition = 'transform ' + 0.4 * (i + 1) + 's';
      paginaActual[i].style.transform = 'translate(' + orientacion + '%, 0)';
      if (indexNext == 0) {
        paginaSiguiente[i].style.transform = 'translate(180%, 0)';
      }
      setTimeout(() => {
        paginaSiguiente[i].style.transition = 'transform ' + 0.4 * (3 - i) + 's';
        paginaSiguiente[i].style.transform = 'translate(-50%, 0)';
      }, 60);
    });
  }

  construirCarrucel(paginaActual: number, ngOn: boolean) {

    var pagina_Siguiente: number = paginaActual + 1 > this.ultimaPagina ? this.primerPagina : paginaActual + 1;
    var pagina_Anterior: number = paginaActual - 1 < 0 ? this.ultimaPagina : paginaActual - 1;

    document.getElementById(this.idTarjetas)!.innerHTML = "";
    var elementosPorPagina = this.obetenerElementosPorPagina();

    // construccion pagina-anterior, pagina-actual y pagina-siguiente, total 3 paginas
    var totalPaginas = 3;
    let parent = document.getElementById(this.idTarjetas);
    for (var i = 0; i < totalPaginas; i++) {
      var html = "";
      const newDiv = document.createElement("div");
      newDiv.classList.add("container-tarjetas");
      newDiv.setAttribute("data-index", '' + i + '');
      if (i == 1) { newDiv.classList.add("active"); }
      for (var n = 0; n < elementosPorPagina; n++) {
        let posicion: number, microIteracion: string = "", transition: string, transform: string;
        // microIteracion = i == 0 ? "" : " ";
        // transition = `style="transition: transform ` + 0.4 * (n + 1) + `s ease 0s;"`
        // transform = `style="transform: translate(` + -120 + `%, 0px);"`
        posicion = i == 0 ? n + pagina_Anterior * 3 : (i == 1 ? n + paginaActual * 3 : n + pagina_Siguiente * 3);

        if (this.tramites[posicion] != undefined) {
          var nombre = (this.tramites[posicion].nombre.length > 85) ? this.tramites[posicion].nombre.substring(0, 85) + "..." : this.tramites[posicion].nombre;
          var icono = this.tramites[posicion].iconoCategoria != "" ? this.tramites[posicion].iconoCategoria : "https://govco-prod-webutils.s3.amazonaws.com/uploads/2021-10-26/d8f3f555-6765-451f-8ea8-d8109692f458-CAT_DEFAULT-80px.svg";
          icono = this.codigoCategoria ? '' : `<img src="` + icono + `" alt="" />`;

          html += `<div class="` + this.classOrdenTarjetas + i + ` carrusel-uno-item" >
                      <a role="link" class="tarjetas-link" aria-label="`+ nombre + `" href="/ficha-tramites-y-servicios/T` + this.tramites[posicion].id + `">
                        <div class="tarjeta-pwa"> 
                            `+ icono + `
                            <span>`+ nombre + `</span>
                        </div>
                      </a>
                   </div>`;
        }
      }
      newDiv.innerHTML = html;
      parent?.appendChild(newDiv);
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
