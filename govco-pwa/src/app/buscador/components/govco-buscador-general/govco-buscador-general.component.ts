import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BottomMenuService } from 'src/app/transversales/services/bottom-menu/bottom-menu.service';
import { HeaderService } from 'src/app/transversales/services/header-service/header.service';
import { SidenavService } from 'src/app/transversales/services/sidenav-service/sidenav-service.service';
import { CategoriasBuscadorService } from './categorias-buscador.service';


@Component({
  selector: 'app-buscador-general',
  templateUrl: './govco-buscador-general.component.html',
  styleUrls: ['./govco-buscador-general.component.scss']
})
export class BuscadorGeneralComponent implements OnInit {
  busqueda: any;
  navegador: string;
  public paramtrofiltros: string;
  statusMenu: boolean = false;


  constructor(
    private actRoute: ActivatedRoute,
    private categoriasBuscadorService: CategoriasBuscadorService,
    protected servicioSideNav: SidenavService,
    protected servicioHeader: HeaderService,
    public bottomService: BottomMenuService
  ) { }

  ngOnInit() {
    this.servicioHeader.estadoHeader(true, true);
    this.bottomService.seleccionandoItem(0);
    this.servicioSideNav.seleccionandoItem(false, '');
    (document.getElementById('topScroll') as HTMLElement).style.top = '3.5rem';
    (document.getElementById('topScroll') as HTMLElement).scrollTop = 0;

    this.navegador = this.getBrowserName();
    if (this.navegador != 'ie') {
      this.actRoute.paramMap.subscribe(params => {
        this.busqueda = params.get('busqueda');
      });
    } else {
      this.busqueda = this.actRoute.snapshot.paramMap.get('busqueda');
    }

    if (this.busqueda == null) { this.busqueda = ''; }
    this.paramtrofiltros = JSON.stringify(this.categoriasBuscadorService.getParametro());
  }

  private getBrowserName() {
    const agent = window.navigator.userAgent.toLowerCase()
    switch (true) {
      case agent.indexOf('edge') > -1:
        return 'edge';
      case agent.indexOf('opr') > -1 && !!(<any>window).opr:
        return 'opera';
      case agent.indexOf('chrome') > -1 && !!(<any>window).chrome:
        return 'chrome';
      case agent.indexOf('trident') > -1:
        return 'ie';
      case agent.indexOf('firefox') > -1:
        return 'firefox';
      case agent.indexOf('safari') > -1:
        return 'safari';
      default:
        return 'other';
    }
  }

  @HostListener('click', ['$event']) onClick(event: Event) {
    var elementoPadre: ParentNode | null = (<HTMLElement>event.target).parentNode
    var elementoHermano = (<HTMLElement>elementoPadre).nextSibling
    var etiquetas_a = Array.from(document.getElementsByTagName('a') as HTMLCollectionOf<HTMLElement>)


    let padre = String((<HTMLElement>elementoPadre).getAttribute('href'));
    let hermano = String((<HTMLElement>elementoHermano).getAttribute('href'));
    let hrefTramites = padre.indexOf('ficha-tramites-y-servicios');
    let hrefNoticasProd = hermano.indexOf('www.gov.co/noticias');
    let hrefNoticasPreProd = hermano.indexOf('beta.www.gov.co/noticias');

    etiquetas_a.forEach(etiqueta_a => {
      //Tramites y Servicios
      if (hrefTramites >= 0) {
        etiqueta_a.setAttribute('target', '_self');
        location.href = String(etiqueta_a.getAttribute('href'));
      }
      //Noticias
      if (hrefNoticasProd >= 0 || hrefNoticasPreProd >= 0) {
        if (elementoHermano == etiqueta_a) {
          const idNoticia = etiqueta_a.getAttribute('href')!.replace(/[^0-9]+/g, "")
          location.href = '/noticias/detalle/' + idNoticia
        }
      }
    });
  }

}
