import { Component, OnDestroy, OnInit, AfterViewInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { BottomMenuService } from 'src/app/transversales/services/bottom-menu/bottom-menu.service';
import { HeaderService } from 'src/app/transversales/services/header-service/header.service';
import { SidenavService } from 'src/app/transversales/services/sidenav-service/sidenav-service.service';
import { DetalleMomentosDeVidaService } from '../../services/detalle-momentos-de-vida/detalle-momentos-de-vida.service';
import { GeolocalizacionViewService } from 'src/app/transversales/services/geolocalizacion-view/geolocalizacion-view.service';
import { Subscription } from 'rxjs';
import { LoMasConsultadoService } from '../../services/lo-mas-consultado/lo-mas-consultado.service';
import { CategoriasService } from '../../services/categorias/categorias.service';
import { urlsLocal } from 'src/variables-globales/urlsLocal';
import { filter } from 'rxjs/operators';
import { MatSidenav, MatSidenavContent } from '@angular/material/sidenav';
import { ModalAvisoComponent } from '../modal-aviso/modal-aviso.component';
import { FiltrosTramitesService } from '../../services/filtros-tramites/filtros-tramites.service';

@Component({
  selector: 'govco-app-detalle-momentos-de-vida',
  templateUrl: './detalle-momentos-de-vida.component.html',
  styleUrls: ['./detalle-momentos-de-vida.component.scss'],
})
export class DetalleMomentosDeVidaComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('sidenav') sidenav!: MatSidenav;
  @ViewChild(MatSidenavContent) sidenavcontent!: MatSidenavContent;
  @ViewChild('seccionAviso') seccionAviso: ElementRef;
  @ViewChild(ModalAvisoComponent) ModalAvisoComponent: ModalAvisoComponent;

  subcategoriaMomentos: number = 0;
  title: string = '';
  description: string = '';
  longDescription: string = '';
  id_momento: string = '';
  icon: string = '';
  ulitmoEstadoAviso: boolean = false;
  matSidenavContent: HTMLElement;
  activarSeccion: boolean = false;
  cat_sub: string = '';
  tra_des: string = '';
  mas_con: string = '';
  tod_tra: string = '';
  act: string = '';
  estado_mas_consultado: boolean = false;
  init_observer: number = 0;

  private observador: ResizeObserver;
  private getUbicacion: Subscription;

  @ViewChild('desplegable') desplegable: ElementRef;

  constructor(
    private router: Router,
    protected servicioSideNav: SidenavService,
    protected servicioHeader: HeaderService,
    public bottomService: BottomMenuService,
    private activatedRoute: ActivatedRoute,
    private serviceDetalleMomento: DetalleMomentosDeVidaService,
    protected serviceGeoView: GeolocalizacionViewService,
    private serviceFichaTramite: LoMasConsultadoService,
    private serviceCategorias: CategoriasService,
    protected filtrosService: FiltrosTramitesService,
  ) { }

  ngOnInit(): void {
    this.getUrlNavigate();
    this.id_momento = this.activatedRoute.snapshot.params.id;
    this.serviceDetalleMomento.setIdMomento(this.id_momento);

    this.servicioHeader.estadoHeader(true, true);
    this.bottomService.desactivarSeleccion();

    this.bottomService.ajustandoPantalla(false);
    (document.getElementById('topScroll') as HTMLElement).style.top = '3.5rem';
    (document.getElementById('topScroll') as HTMLElement).scrollTop = 0;

    this.serviceCategorias
      .getCategoriasPorId(this.id_momento)
      .subscribe((resp: any) => {
        this.title = resp?.nombre ? resp.nombre : '';
        this.description = resp?.descripcionCorta ? resp.descripcionCorta : '';
        this.icon = resp?.icono ? resp.icono : '';
        this.longDescription = resp?.descripcionLarga
          ? resp.descripcionLarga
          : '';
      });

    let tramiteSelected = document.getElementsByClassName(
      'govco-pwa-momentos-elemento'
    )[this.subcategoriaMomentos];
    tramiteSelected.classList.add('filtro-active');

    let container: any = document.getElementById(
      this.subcategoriaMomentos.toString()
    )?.offsetLeft;

    this.getLoMasConsultado();       
    this.mostrarAvisoSinResultados();
    this.getCurrentUrl();
    this.resizeObserver();
  }

  getUrlNavigate() {
    this.cat_sub = urlsLocal.categorias_subcategorias;
    this.mas_con = urlsLocal.c_s_mas_consultado;
    this.tra_des = urlsLocal.c_s_tramites_destacados;
    this.tod_tra = urlsLocal.c_s_todos_los_tramites;
    this.act = urlsLocal.c_s_actualidad;
  }

  getLoMasConsultado() {
    this.getUbicacion = this.serviceGeoView.getUbicacion$.subscribe(
      (data: any) => {
        if (
          data.codigoMunicipio != 'TodosLosMunicipios' &&
          data.codigoMunicipio != ''
        ) {
          this.serviceFichaTramite.getLoMasConsultadoPorUbicacion(
            data.codigoMunicipio,
            this.id_momento
          );
          this.navigateSeccion();
        } else {
          this.serviceFichaTramite.getLoMasConsultado(this.id_momento);
          this.navigateSeccion();
        }
      }
    );
  }

  navigateSeccion() {
    this.getUbicacion = this.serviceFichaTramite.getMasConsultado$.subscribe(
      (data: any) => {
        if (data.data.length > 0) {
          this.estado_mas_consultado = false;
          this.router.navigate(
            ['/' + this.cat_sub + '/' + this.id_momento + '/' + this.mas_con]
          );
        } else {
          this.estado_mas_consultado = true;
          this.router.navigate(
            ['/' + this.cat_sub + '/' + this.id_momento + '/' + this.tra_des]
          );
        }
      }
    );
  }

  getCurrentUrl() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        if (this.desplegable != undefined) {
          this.desplegable.nativeElement.classList.remove('height');
          (document.querySelector('.govco-pwa-footer') as HTMLElement).classList.remove('position')
        }
      });
  }

  changePrefilter(index: number) {
    let textoInputBuscador: any = document.getElementById('buscador-pwa');
    let currentActive = document.getElementsByClassName('filtro-active')[0];
    if (currentActive) {
      currentActive.classList.remove('filtro-active');
    }
    let activePrefilter = document.getElementsByClassName(
      'govco-pwa-momentos-elemento'
    )[index];
    activePrefilter.classList.add('filtro-active');
  }

  ngAfterViewInit(): void {
    this.init_observer = this.desplegable.nativeElement.getBoundingClientRect().height
    this.observador.observe(this.desplegable.nativeElement);
  }

  resizeObserver() {
    const viewport_scroll = (
      document.getElementById('topScroll') as HTMLElement
    ).getBoundingClientRect().height * 0.88;
    this.observador = new ResizeObserver((entradas) => {
      entradas.forEach((entrada) => {
        const desplegable: number = entrada.contentRect.height;
        if (desplegable != this.init_observer)
          if (viewport_scroll > desplegable) {
            this.desplegable.nativeElement.classList.add('height');
            (document.querySelector('.govco-pwa-footer') as HTMLElement).classList.add('position')
          }
      })
    })
  }

  ngOnDestroy(): void {
    this.getUbicacion.unsubscribe;
  }

  returnCategoriesPWA() {
    this.router.navigate(['/' + this.cat_sub]);
  }

  mostrarAvisoSinResultados() {
    this.filtrosService.getAbrirAvisor$.subscribe(
      (abrir: boolean) => {
        if (abrir === true) {
          this.abrirAvisoSinResultados();
        } else if (abrir === false && this.ulitmoEstadoAviso === true) {
          this.cerrarAvisoSinResultados();
        }
      }
    );
  }

  @HostListener('window:load') onLoad() {
    this.activarSeccion = true;
  }

  // Función para abrir el aviso sin sesultados de busqueda tipo modal
  abrirAvisoSinResultados() {
    if (this.seccionAviso != undefined) {
      this.seccionAviso.nativeElement.style.transform = 'translate(0%)';
      this.seccionAviso.nativeElement.style.transition = '0.6s ease';
      this.ulitmoEstadoAviso = true;
    }
  }

  // Función para cerrar el aviso sin sesultados de busqueda tipo modal
  cerrarAvisoSinResultados() {
    if (this.seccionAviso != undefined) {
      this.seccionAviso.nativeElement.style.transform = 'translate(100%)';
      this.seccionAviso.nativeElement.style.transition = '0.6s ease';
      this.ulitmoEstadoAviso = false;
    }
  }
}
