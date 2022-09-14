import { Component, OnInit, OnChanges } from '@angular/core';
import { CarruselUnoInterface } from '../carrusel-uno-interface';
import { CarruselUnoInterface1 } from '../carrusel-uno-interface-1';
import { CarruselUnoService } from '../carrusel-uno.service';

@Component({
  selector: 'app-carrusel-uno',
  templateUrl: './carrusel-uno.component.html',
  styleUrls: ['./carrusel-uno.component.scss']
})
export class CarruselUnoComponent implements OnInit, OnChanges {
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
  idOrdenTarjetas: string;
  idPagina: string = "";
  // variables contador
  n: number = 1;
  m: number = 0;
  j: number = 0;
  k: number = 0;

  ubicacion: any;

  constructor(protected carruselServe: CarruselUnoService) {
    this.idTarjetas = "tarjetas-carrusel-pwa";
    this.idPagina = "pagina"
    this.idOrdenTarjetas = "tarjetaPwa"
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

  ngOnChanges() {
    // this.construirCarrucel();
  }

  obtenerSlideActivo() {
    var long = this.obetenerNumeroPaginas();
    for (var i = 0; i < long; i++) {
      var contiene = document.getElementById(this.idPagina + i);
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

  paginaActual() {
    var contadorElementos: number = 0;
    var elementosPorPagina = 3;
    var totalPaginas = this.obetenerNumeroPaginas();
    for (var i = 0; i < totalPaginas; i++) {

      var idpagina = document.getElementById(this.idPagina + i);
      console.log("idpagina", idpagina)

      if (idpagina) {
        for (var j = 0; j < elementosPorPagina * (i + 1); j++) {
          var tarjetasDeLaPagina = document.getElementById(this.idOrdenTarjetas + j);
          console.log("tarjetasDeLaPagina", tarjetasDeLaPagina)
          console.log("pagina Actual", i)
          if (tarjetasDeLaPagina!.classList.contains("active")) {
            // contadorElementos += 1;
            // if (contadorElementos > 2) {
            return i;
            // } else if (contadorElementos == 3) contadorElementos = 0;
          }

        }
      }
    }
    this.pagina = null;
    return 0;
  }

  construirCarrucel() {
    var html = "";
    document.querySelector("#" + this.idTarjetas)!.innerHTML = "";
    var totalPaginas = this.obetenerNumeroPaginas();
    var elementosPorPagina = this.obetenerElementosPorPagina();
    var pagina_Actual = this.paginaActual();

    var totalElementos: number = totalPaginas * elementosPorPagina;

    console.log("pagina_Actual", pagina_Actual)

    for (var i = 0; i < totalPaginas; i++) {
      console.log("contador I", i)

      html += '<div id="' + this.idPagina + i + '" tabindex="0" aria-label="Grupo ' + (i + 1) + ' . Use tab para consultar cada elemento del grupo.">' +
        '<div class="row col-12 px-0 mx-0">';
      var n = 0;
      console.log("contador K", this.k)
      
      for (this.k = this.k; this.k < elementosPorPagina * (i + 1); this.k++) {
        var active;
        if (pagina_Actual == 0) {
          active = elementosPorPagina <= this.k ? "carousel-item" : "carousel-item active";
        } else {
          active = i == pagina_Actual ? "carousel-item active" : "carousel-item";
        }
        console.log("active", active)

        if (this.tramites[this.k] != undefined) {
          var nombre = (this.tramites[this.k].nombre.length > 85) ? this.tramites[this.k].nombre.substring(0, 85) + "..." : this.tramites[this.k].nombre;
          var icono = this.tramites[this.k].iconoCategoria != "" ? this.tramites[this.k].iconoCategoria : "https://govco-prod-webutils.s3.amazonaws.com/uploads/2021-10-26/d8f3f555-6765-451f-8ea8-d8109692f458-CAT_DEFAULT-80px.svg";
          icono = this.codigoCategoria ? '' : `<img src="` + icono + `" alt="" />`;
          html += `<div id="` + this.idOrdenTarjetas + n + `"class=" ` + active + ` col-ms-12 col-md-6 col-lg-4">
                <a role="link" class="tarjetas-link" aria-label="`+ nombre + `" href="/ficha-tramites-y-servicios/T` + this.tramites[this.k].id + `"><div class="tarjeta-pwa">
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
    }
    document.querySelector("#" + this.idTarjetas)!.innerHTML = html;
    if(this.k >= totalElementos){
      this.k = 0
    }
  }
  // TO DO

  // construirCarrucel() {
  //   var html = "";
  //   document.querySelector("#" + this.idTarjetas)!.innerHTML = "";
  //   var totalPaginas = this.obetenerNumeroPaginas();
  //   var elementosPorPagina = this.obetenerElementosPorPagina();

  //   var indice = 1;
  //   var pagina_Actual = this.paginaActual();

  //   for (var i = 0; i < totalPaginas; i++) {
  //     var active;
  //     if (pagina_Actual == 0) {
  //       active = i > 0 ? "carousel-item" : "carousel-item active";
  //     } else {
  //       active = i == pagina_Actual ? "carousel-item active" : "carousel-item";
  //     }

  //     html += '<div id="' + this.idPagina + i + '" tabindex="0" aria-label="Grupo ' + (i + 1) + ' . Use tab para consultar cada elemento del grupo.">' +
  //       '<div class="row col-12 px-0 mx-0">';
  //     var n = 0;
  //     for (var j = (i * elementosPorPagina); j < (elementosPorPagina * indice); j++) {
  //       if (this.tramites[j] != undefined) {
  //         var nombre = (this.tramites[j].nombre.length > 85) ? this.tramites[j].nombre.substring(0, 85) + "..." : this.tramites[j].nombre;
  //         var icono = this.tramites[j].iconoCategoria != "" ? this.tramites[j].iconoCategoria : "https://govco-prod-webutils.s3.amazonaws.com/uploads/2021-10-26/d8f3f555-6765-451f-8ea8-d8109692f458-CAT_DEFAULT-80px.svg";
  //         icono = this.codigoCategoria ? '' : `<img src="` + icono + `" alt="" />`;
  //         html += `<div id="` + this.idOrdenTarjetas + n + `"class=" ` + active + ` col-ms-12 col-md-6 col-lg-4">
  //               <a role="link" class="tarjetas-link" aria-label="`+ nombre + `" href="/ficha-tramites-y-servicios/T` + this.tramites[j].id + `"><div class="tarjeta-pwa">
  //                 `+ icono + `
  //                 <span>`+ nombre + `</span>
  //               </div></a>
  //             </div>`;
  //       }
  //       n += 1;
  //       if (n == this.obetenerElementosPorPagina()) {
  //         n = 0
  //       }
  //     }
  //     html += '</div>' +
  //       '</div>';
  //     indice++;
  //   }
  //   document.querySelector("#" + this.idTarjetas)!.innerHTML = html;
  // }

  // clic(){
  //   
  //   var paginasEnTotal = 4;
  //   var html = "";var elementosPorPagina = 3;

  //   document.querySelectorAll('.carousel-item.active').forEach(elemento => {
  //     elemento.classList.remove('active')
  //   });

  //   document.querySelector("#" + this.idTarjetas)!.innerHTML = "";

  //   var indice = 1;


  //   for (this.m = this.m; this.m < ( elementosPorPagina * this.n); this.m++) {
  //     // console.log("pagina_Actual actual",this.n)
  //     console.log("m",this.m)
  //     var active;
  //     if (this.n == 0) {
  //       active = this.m > 0 ? "carousel-item" : "carousel-item active";
  //     } else {
  //       active = this.m == this.n ? "carousel-item active" : "carousel-item";
  //     }

  //     var n = 0;
  //     for (var j = (this.m * elementosPorPagina); j < (elementosPorPagina * indice); j++) {
  //       // var oli = this.m == j ? "carousel-item active" : "carousel-item"
  //       console.log('j',j)
  //       if (this.tramites[j] != undefined) {
  //         var nombre = (this.tramites[j].nombre.length > 85) ? this.tramites[j].nombre.substring(0, 85) + "..." : this.tramites[j].nombre;
  //         var icono = this.tramites[j].iconoCategoria != "" ? this.tramites[j].iconoCategoria : "https://govco-prod-webutils.s3.amazonaws.com/uploads/2021-10-26/d8f3f555-6765-451f-8ea8-d8109692f458-CAT_DEFAULT-80px.svg";
  //         icono = this.codigoCategoria ? '' : `<img src="` + icono + `" alt="" />`;
  //         html += `<div id="` + this.idOrdenTarjetas + n + `"class=" ` + active  + ` col-ms-12 col-md-6 col-lg-4">
  //               <a role="link" class="tarjetas-link" aria-label="`+ nombre + `" href="/ficha-tramites-y-servicios/T` + this.tramites[j].id + `"><div class="tarjeta-pwa">
  //                 `+ icono + `
  //                 <span>`+ nombre + `</span>
  //               </div></a>
  //             </div>`;
  //       }
  //       n += 1;
  //       if (n == elementosPorPagina) {
  //         n = 0
  //       }
  //     }
  //     html += '</div>' +
  //       '</div>';
  //     indice++;
  //   }
  //   document.querySelector("#" + this.idTarjetas)!.innerHTML = html;
  //   this.n += 1;
  //   if(paginasEnTotal < this.n ){
  //     this.n = 1; this.m = 0
  //   }
  // }

}
