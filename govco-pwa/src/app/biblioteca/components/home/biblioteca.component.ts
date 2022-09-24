import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Categoria from '../../shared/models/categoria';
import SeccionInicio from '../../shared/models/seccion-inicio';
import { HeaderBibliotecaService } from '../../services/header-service/header-biblioteca-service.service';
import { TituloService } from '../../services/titulo-service/titulo-service.service';
import { ValidarUrlService } from '../../services/validar-url-service/validar-url-service.service';
import { PublicacionesService } from '../../services/publicaciones-service/publicaciones-service.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../../shared/modal/modal.component';
import { SidenavService } from 'src/app/transversales/services/sidenav-service/sidenav-service.service';
import { HeaderService } from 'src/app/transversales/services/header-service/header.service';
import { BottomMenuService } from 'src/app/transversales/services/bottom-menu/bottom-menu.service';

@Component({
  selector: 'app-biblioteca',
  templateUrl: './biblioteca.component.html',
  styleUrls: ['./biblioteca.component.scss']
})
export class BibliotecaComponent implements OnInit {
  query: string = '';
  titulo: ModalTitulo = new ModalTitulo();
  datosHome: Categoria[];
  seccionInicio: SeccionInicio;
  tiempoEtiqueta: number;
  multimedia: any;
  codigo: any;

  constructor(private publicacionesServices: PublicacionesService,
    public router: Router,
    private headerBibliotecaService: HeaderBibliotecaService,
    private tituloService: TituloService,
    private validarUrlService: ValidarUrlService,
    private modalService: NgbModal,
    protected servicioSideNav: SidenavService,
    protected servicioHeader: HeaderService,
    public bottomService: BottomMenuService
  ) { }

  ngOnInit() {
    // servicioHeader.estadoHeader(a, b)       a -> true = header seccion internas
    //                                         a -> false = header general
    //                                         b -> Muestra/Oculta  Header
    //bottomService.seleccionandoItem(0)       0 -> Activa boton incio del menu inferior
    //                                         1, 2, 3 -> Tramites, Ingresa
    //servicioSideNav.seleccionandoItem(a, b)  a -> Activa o inactiva menu lateral
    //                                         b -> String con el valor del item a seleccionar
    //bottomService.ajustandoPantalla(true)    true -> Agrega clase de css para ajustar 
    //                                                 la pantalla cuando en la seccion  
    //                                                 consultada no tiene header
    this.servicioHeader.estadoHeader(true, true);
    this.bottomService.seleccionandoItem(0);
    this.servicioSideNav.seleccionandoItem(true, 'serviciosEntidades');
    this.bottomService.ajustandoPantalla(false);
    (document.getElementById('topScroll') as HTMLElement).style.top = '3.5rem';
    (document.getElementById('topScroll') as HTMLElement).scrollTop = 0;

    this.getPublicacionesRapidas();
    this.getTitulo();
    this.obtenerSeccionInicioPortal();
    this.headerBibliotecaService.setTitle("Biblioteca");
  }

  getTitulo() {
    this.tituloService.getTitulo().subscribe((data) => {
      this.titulo = data;
    }, (error) => {
      console.error(error);
    })
  }

  getPublicacionesRapidas() {
    this.publicacionesServices.getPublicacionesRapidas().subscribe((data) => {
      this.datosHome = data;
    }, (error) => {
      console.error(error);
    })
  }

  obtenerSeccionInicioPortal() {
    this.publicacionesServices.obtenerSeccionInicioPortal().subscribe((data) => {
      this.seccionInicio = data;
    }, (error) => {
      console.error(error);
    })
  }

  open(data: { ubicacion: any; tipoArchivo: any; tipoContenido: any; }) {
    const modalRef = this.modalService.open(ModalComponent, {
      size: "lg",
      backdrop: 'static',
      keyboard: false
    });
    let dataModal = {
      url: data.ubicacion,
      type: data.tipoArchivo,
      contenido: data.tipoContenido
    }
    modalRef.componentInstance.data = dataModal;
  }


  abrirRecurso(data: { url: string; }) {
    this.validarUrlService.openLink(data.url);
  }

  getClassChild(tipoContenido: string, categoria: string, indexCat: number, indexPub: number) {
    let className = "";
    if (tipoContenido === 'Multimedia') {
      className += 'col-4 text-center mlmd ' + categoria;
      this.multimedia = "multimedia";
    } else if (tipoContenido === 'Ofimática') {
      className += 'col-4 text-center mlmd ' + categoria;
      this.multimedia = "ofimatica";
    } else if (tipoContenido === 'Código') {
      className = 'col-6 cod ' + categoria;
      this.codigo = "codigo";
    } else if (tipoContenido === 'Apps') {
      className = 'col-12';
    } else {
      className = 'col-12';
    }

    if (indexPub == this.datosHome[indexCat].publicaciones.length - 1) {
      this.createDivContenedor(categoria, this.codigo);
      this.createDivContenedor(categoria, this.multimedia);
    }
    return className;
  }


  obtenerVisualizacion(tipoVisualizacion: number) {
    let className = "";
    if (tipoVisualizacion === 2) {
      className += 'col-4 text-center mt-4';
    }
    if (tipoVisualizacion === 1) {
      className += 'col-12';
    }
    return className;
  }

  hyphenateUrlParams(str: string) {
    return str.split(' ').join('-').toLowerCase();
  }

  createDivContenedor(categoria: string, tipo: string) {
    let contenido;
    let divArchivos;
    let div = document.createElement("div");
    div.id = "contenedor-" + tipo + "-" + categoria;
    if (tipo == "multimedia" || tipo == "ofimatica") {
      div.className = "multimedia row w-100";
      contenido = document.getElementsByClassName("col-4 text-center mlmd " + categoria);
      divArchivos = document.getElementById("contenedor-" + tipo + "-" + categoria);
    } else {
      div.className = "codigo row w-100";
      contenido = document.getElementsByClassName("col-6 cod " + categoria);
      divArchivos = document.getElementById("contenedor-" + tipo + "-" + categoria);
    }

    let divContenido = document.getElementById("contenedorContenido-" + categoria);

    if (divContenido && contenido.length > 0) {
      if (!divArchivos) {
        divContenido.insertBefore(div, divContenido.childNodes[0]);

        let cont = document.getElementById("contenedor-" + tipo + "-" + categoria);

        for (let i = 0; i < contenido.length; i++) {
          cont!.appendChild(contenido[i]);
        }
      }
    }
  }
}

class ModalTitulo {
  nombre: string;
  descripcion: string;
  constructor() {
  }
}

