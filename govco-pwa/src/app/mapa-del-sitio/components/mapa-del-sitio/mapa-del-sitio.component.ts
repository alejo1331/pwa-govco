import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { BottomMenuService } from 'src/app/transversales/services/bottom-menu/bottom-menu.service';
import { HeaderService } from 'src/app/transversales/services/header-service/header.service';
import { SidenavService } from 'src/app/transversales/services/sidenav-service/sidenav-service.service';
import { MapaSitioInterface } from '../../models/mapa-sitio-interface';
import { MapaSitioService } from '../../services/mapa-sitio-service/mapa-sitio.service';

@Component({
  selector: 'app-mapa-del-sitio',
  templateUrl: './mapa-del-sitio.component.html',
  styleUrls: ['./mapa-del-sitio.component.scss']
})
export class MapaDelSitioComponent implements OnInit, AfterViewChecked {

  mapaSitio: MapaSitioInterface[];
  loadElements: boolean = false;
  urlMapaSitio: any;
  itemsUrl: any[] = [];

  constructor(
    private mapaSitioService: MapaSitioService, 
    public bottomService: BottomMenuService,
    protected servicioHeader: HeaderService,
    protected servicioSideNav: SidenavService,) { }

  ngOnInit(): void {
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
    this.servicioHeader.estadoHeader(false, true);
    this.bottomService.seleccionandoItem(0);
    this.bottomService.ajustandoPantalla(false);
    this.servicioSideNav.seleccionandoItem(false, 'null');
    (document.getElementById('topScroll') as HTMLElement).style.top = '7.25rem';
    (document.getElementById('topScroll') as HTMLElement).scrollTop = 0;
    this.mapaSitioService.getMapaSitio()
      .subscribe((data: MapaSitioInterface[]) => {
        this.mapaSitio = data;
      }, (error) => {
        console.error(error);
      });
  }

  ngAfterViewChecked(): void {
    let items = document.getElementsByClassName("resumen");
    if (items.length > 0 && !this.loadElements) {
      this.loadElements = true;
      this.getUrlItems();
    }
  }

  getUrlItems() {
    let items = document.getElementsByClassName("resumen");
    for (let i = 0; i < items.length; i++) {
      let aElement = items[i].children;
      for (let j = 0; j < aElement.length; j++) {
        if (aElement[j].hasAttribute("href") && aElement[j].getAttribute("href") === window.location.pathname) {
          aElement[j].classList.add("urlActiva");
        }
      }
    }
  }

}
