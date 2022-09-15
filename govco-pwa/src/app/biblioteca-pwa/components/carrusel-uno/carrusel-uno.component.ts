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
  idOrdenTarjetas: string;
  // variables contador
  direccionClic: number = 0;
  k: number = 0;

  ubicacion: any;

  constructor(protected carruselServe: CarruselUnoService) {
    this.idTarjetas = "tarjetas-carrusel-pwa";
    this.idOrdenTarjetas = "tarjetaPwa"
  }

  ngOnInit(): void {
    this.carruselServe.getTramitesMasConsultadosAsync().subscribe((info: CarruselUnoInterface) => {
      this.tramites = info.data;
      console.log('tramites', this.tramites)
      this.construirCarrucel(this.direccionClic);
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

  flechaIzquierda() {
    var totalPaginas = this.obetenerNumeroPaginas();
    this.direccionClic -= 1;
    if (this.direccionClic < 0) {
      this.direccionClic = totalPaginas - 1;
    }
    this.construirCarrucel(this.direccionClic);
    this.efectoDeslizar('right');
  }

  flechaDerecha() {
    var totalPaginas = this.obetenerNumeroPaginas();
    this.direccionClic += 1;
    if (this.direccionClic >= totalPaginas) {
      this.direccionClic = 0;
    }
    this.construirCarrucel(this.direccionClic);
    this.efectoDeslizar('left');
  }

  efectoDeslizar(direccion: string) {
    var clase = "carrusel-uno-item-" + direccion;
    var tarjetasDeLaPagina = document.querySelectorAll('.carrusel-uno-item.active')
    tarjetasDeLaPagina.forEach((elemento, i) => {
      elemento.classList.add(clase);
      setTimeout(() => {
        elemento.classList.remove(clase);
      }, 200 * i);
    });
  }

  construirCarrucel(paginaA: number) {
    var html = "";
    document.querySelector("#" + this.idTarjetas)!.innerHTML = "";
    var totalPaginas = this.obetenerNumeroPaginas();
    var elementosPorPagina = this.obetenerElementosPorPagina();
    var pagina_Actual = paginaA;

    var totalElementos: number = totalPaginas * elementosPorPagina;


    for (var i = 0; i < totalPaginas; i++) {
      for (this.k = this.k; this.k < elementosPorPagina * (i + 1); this.k++) {
        var active;
        if (pagina_Actual == 0) {
          active = elementosPorPagina <= this.k ? "carrusel-uno-item" : "carrusel-uno-item active";
        } else {
          active = i == pagina_Actual ? "carrusel-uno-item active" : "carrusel-uno-item";
        }

        if (this.tramites[this.k] != undefined) {
          var nombre = (this.tramites[this.k].nombre.length > 85) ? this.tramites[this.k].nombre.substring(0, 85) + "..." : this.tramites[this.k].nombre;
          var icono = this.tramites[this.k].iconoCategoria != "" ? this.tramites[this.k].iconoCategoria : "https://govco-prod-webutils.s3.amazonaws.com/uploads/2021-10-26/d8f3f555-6765-451f-8ea8-d8109692f458-CAT_DEFAULT-80px.svg";
          icono = this.codigoCategoria ? '' : `<img src="` + icono + `" alt="" />`;
          html += `<div id="` + this.idOrdenTarjetas + `"class=" ` + active + ` col-ms-12 col-md-6 col-lg-4">
                <a role="link" class="tarjetas-link" aria-label="`+ nombre + `" href="/ficha-tramites-y-servicios/T` + this.tramites[this.k].id + `"><div class="tarjeta-pwa">
                  `+ icono + `
                  <span>`+ nombre + `</span>
                </div></a>
              </div>`;
        }
      }
      html += '</div>' +
        '</div>';
    }
    document.querySelector("#" + this.idTarjetas)!.innerHTML = html;
    if (this.k >= totalElementos) {
      this.k = 0
    }
  }

}
