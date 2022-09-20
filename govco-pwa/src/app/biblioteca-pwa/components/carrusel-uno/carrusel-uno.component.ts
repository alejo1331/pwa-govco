import { Component, ElementRef, OnInit } from '@angular/core';
import { GeolocalizacionService } from 'src/app/transversales/services/geolocalizacion/geolocalizacion.service';
import { CarruselUnoInterface } from '../carrusel-uno-interface';
import { CarruselUnoInterface1 } from '../carrusel-uno-interface-1';
import { CarruselUnoService } from '../carrusel-uno.service';
import { EstadoInterface } from '../estado-interface';
import { PorMunicipioInterface } from '../por-municipio-interface';
import { TituloInterface } from '../titulo-interface';

@Component({
  selector: 'app-carrusel-uno',
  templateUrl: './carrusel-uno.component.html',
  styleUrls: ['./carrusel-uno.component.scss']
})
export class CarruselUnoComponent implements OnInit {
  data: CarruselUnoInterface1[];
  titulo: string = "";
  estadoTitulo: boolean = false;
  codigoMunicipio: string | null = "";
  codigoDepartamento: string | null = "";
  nombreMunicipio: string = "";
  pagina: number | null;
  textoCarga: string = "Cargando..."
  codigoCategoria: string;
  id_: string = "pwa";
  idTarjetas: string;
  classOrdenTarjetas: string;
  seccion: string = 'LoMasConsultadoHome';
  estado: boolean = false;
  // variables contador
  ultimaPagina: number = 0;
  primerPagina: number = 0;
  siguientePagina: number = 0;
  k: number = 0;

  ubicacion: any;

  constructor(
    protected carruselServe: CarruselUnoService,
    protected ServicioGeolocalizacion: GeolocalizacionService
  ) {
    this.idTarjetas = "tarjetas-carrusel-pwa";
    this.classOrdenTarjetas = "grupo"
  }

  ngOnInit(): void {
    this.codigoDepartamento = localStorage.getItem("codigoDepartamento") != null ? (localStorage.getItem("codigoDepartamento") != 'TodosLosDepartamentos' ? localStorage.getItem("codigoDepartamento") : '') : '';
    this.codigoMunicipio = localStorage.getItem("codigoMunicipio") != null ? (localStorage.getItem("codigoMunicipio") != 'TodosLosMunicipios' ? localStorage.getItem("codigoMunicipio") : '') : '';

    if (this.codigoMunicipio != '') {
      this.ServicioGeolocalizacion.getCacheJsonMunicipiosPorDepartamento(String(this.codigoDepartamento))
        .then((municipios: any) => {
          this.estadoTitulo = true
          municipios.forEach((data: any) => {
             data['codigo'] == this.codigoMunicipio ? this.nombreMunicipio = data['nombre'] : '';
          });
        })
    }

    this.ultimaPagina = this.obetenerNumeroPaginas() - 1;

    this.carruselServe.getTramitesMasConsultadosEstado().subscribe((estado: EstadoInterface) => {
      if (estado.data.activo == 1) {
        this.estado = true;
        this.carruselServe.getTramitesMasConsultadosTitulo(this.seccion).subscribe((dataTitulo: TituloInterface) => {
          this.titulo = dataTitulo.data.titulo;
        })
        this.codigoMunicipio == "" ?
          this.carruselServe.getTramitesMasConsultados().subscribe((info: CarruselUnoInterface) => {
            this.data = info.data;
            if (this.data.length > 0) {
              this.construirCarrucel(0);
            }
          })
          : this.carruselServe.getTramitesMasConsultadosPorMunicipio(this.codigoMunicipio).subscribe((tramitesPorMunicipio: PorMunicipioInterface) => {
            this.data = tramitesPorMunicipio.data;
            if (this.data.length > 0) {
              this.construirCarrucel(0);
            }
          });
      }
      else {
        this.estado = false;
        this.textoCarga = "No hay datos para mostrar."
      }
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
    const indexNext = indexActive?parseInt(indexActive) + 1 : 1;
    const elementNext = document.querySelector('.container-tarjetas[data-index="' + indexNext + '"]');
    this.paginaActual(120, elementActive, elementNext, indexNext);
    var totalPaginas = this.obetenerNumeroPaginas();
    this.k -= 1;
    if (this.k < 0) {
      this.k = totalPaginas - 1;
    }
    setTimeout(() => {
      this.construirCarrucel(this.k);
    }, 800);
  }

  flechaDerecha() {    
    const elementActive = document.querySelector('.container-tarjetas.active');
    const indexActive = elementActive?.getAttribute('data-index');
    let indexPrev = indexActive?parseInt(indexActive): 1;
    let indexNext = indexPrev?indexPrev + 1 : 1;
    if (indexNext > 2 ) { indexNext = 0; }
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
    }, 800);
  }

  paginaSiguiente(indexPrev:number, indexNext:number) {
    var paginaSiguiente = Array.from((document.querySelectorAll('.' + this.classOrdenTarjetas + indexNext) as NodeListOf<HTMLElement>));
    var paginaAnterior = Array.from((document.querySelectorAll('.' + this.classOrdenTarjetas + indexPrev) as NodeListOf<HTMLElement>));
    paginaSiguiente.forEach((elemento, i) => {
        paginaAnterior[i].removeAttribute('style');
        paginaSiguiente[i].removeAttribute('style');
    });
  }

  paginaActual(orientacion: number, elementActive:Element | null, elementNext:Element | null, indexNext:number) {   
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

  construirCarrucel(paginaActual: number) {

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
      newDiv.setAttribute("data-index", ''+i+'');
      if (i == 1) { newDiv.classList.add("active"); }
      for (var n = 0; n < elementosPorPagina; n++) {
        let posicion: number, microIteracion: string = "", transition: string, transform: string;
        posicion = i == 0 ? n + pagina_Anterior * 3 : (i == 1 ? n + paginaActual * 3 : n + pagina_Siguiente * 3);

        if (this.data[posicion] != undefined) {
          var nombre = (this.data[posicion].nombre.length > 47) ? this.data[posicion].nombre.substring(0, 47) + "..." : this.data[posicion].nombre;
          var icono = this.data[posicion].iconoCategoria != "" ? this.data[posicion].iconoCategoria : "https://govco-prod-webutils.s3.amazonaws.com/uploads/2021-10-26/d8f3f555-6765-451f-8ea8-d8109692f458-CAT_DEFAULT-80px.svg";
          icono = this.codigoCategoria ? '' : `<img src="` + icono + `" alt="" />`;

          html += `<div class="` + this.classOrdenTarjetas + i + ` carrusel-uno-item" >
                      <a role="link" class="tarjetas-link" aria-label="`+ nombre + `" href="/ficha-tramites-y-servicios/T` + this.data[posicion].id + `">
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
