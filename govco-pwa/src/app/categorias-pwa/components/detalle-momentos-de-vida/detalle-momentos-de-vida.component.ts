import { Component, OnDestroy, OnInit, AfterViewInit, ViewChild, ElementRef, HostListener, ViewChildren, QueryList, AfterViewChecked } from '@angular/core';
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
import { AppService } from 'src/app/app.service';
import { LoMasConsultado } from '../../Models/lo-mas-consultado-interface';

@Component({
  selector: 'govco-app-detalle-momentos-de-vida',
  templateUrl: './detalle-momentos-de-vida.component.html',
  styleUrls: ['./detalle-momentos-de-vida.component.scss'],
})
export class DetalleMomentosDeVidaComponent implements OnInit, AfterViewInit, AfterViewChecked, OnDestroy {
  @ViewChild('sidenav') sidenav!: MatSidenav;
  @ViewChild(MatSidenavContent) sidenavcontent!: MatSidenavContent;
  @ViewChild('seccionAviso') seccionAviso: ElementRef;
  @ViewChild(ModalAvisoComponent) ModalAvisoComponent: ModalAvisoComponent;

  subcategoriaMomentos: number = 0;
  init_observe: number = 0;

  title: string = '';
  description: string = '';
  longDescription: string = '';
  id_momento: string = '';
  icon: string = '';
  cat_sub: string = '';
  cat_sub_id: string = ';'
  mas_con: string = '';
  tra_des: string = '';
  current_url: string = '';
  urls: string[] = [];
  titulo_pestana: string[] = [];

  estado_item: boolean[];
  ulitmoEstadoAviso: boolean = false;
  activarSeccion: boolean = false;

  viewport_scroll: HTMLElement
  matSidenavContent: HTMLElement;
  private observador: ResizeObserver;
  private getUbicacion: Subscription;
  private getSelectItem: Subscription;

  @ViewChild('desplegable') desplegable: ElementRef;
  @ViewChildren('item', { read: ElementRef }) indicators: QueryList<ElementRef>;

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
    public appService: AppService,
  ) {
    this.id_momento = this.activatedRoute.snapshot.params.id;
    this.getUrlNavigate();
    this.construccionUrls()
    this.getCurrentUrl();
  }

  ngOnInit(): void {
    this.serviceDetalleMomento.setIdMomento(this.id_momento);
    this.configGeneral();

    let container: any = document.getElementById(
      this.subcategoriaMomentos.toString()
    )?.offsetLeft;

    this.getDescripcionMomento();
    this.validacionPorUbicacion();
    this.mostrarAvisoSinResultados();
    this.resizeObserver();
  }

  getUrlNavigate() {
    this.cat_sub = '/' + urlsLocal.categorias_subcategorias;
    this.urls = [
      urlsLocal.c_s_mas_consultado,
      urlsLocal.c_s_tramites_destacados,
      urlsLocal.c_s_todos_los_tramites,
      urlsLocal.c_s_actualidad
    ];
    this.titulo_pestana = [
      'Lo más consultado',
      'Trámites destacados',
      'Todos los trámites',
      'Actualidad'
    ];
    this.estado_item = [true, false, false, false]
  }

  construccionUrls() {
    this.cat_sub_id = this.cat_sub + '/' + this.id_momento;
    this.mas_con = this.cat_sub_id + '/' + urlsLocal.c_s_mas_consultado;
    this.tra_des = this.cat_sub_id + '/' + urlsLocal.c_s_tramites_destacados;
  }

  // Este metodo permite configurar la presentación de la barra superior e  inferior de govco
  // y tambien realiza unos ajustes de pisicion respecto a los valores ingresados al ajuste pantalla
  configGeneral() {
    this.servicioHeader.estadoHeader(true, true);
    this.bottomService.desactivarSeleccion();
    this.bottomService.ajustandoPantalla(false);
    this.viewport_scroll = document.getElementById('topScroll') as HTMLElement;
    this.viewport_scroll.style.top = '3.5rem';
    this.viewport_scroll.scrollTop = 0;
  }

  getDescripcionMomento() {
    this.serviceCategorias
      .getCategoriasPorId(this.id_momento)
      .subscribe((resp: any) => {
        
        this.serviceDetalleMomento.setNombreMomento(resp.nombre);

        this.title = resp?.nombre ? resp.nombre : '';
        this.description = resp?.descripcionCorta ? resp.descripcionCorta : '';
        this.icon = resp?.icono ? resp.icono : '';
        this.longDescription = resp?.descripcionLarga
          ? resp.descripcionLarga
          : '';
      });
  }

  // Este metodo permite consultar y vigilar el estado de la ubicacion permitiendo
  // elegir la consulta que se requiere para lo mas consultado
  validacionPorUbicacion() {
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
          this.validacionInicioRuta();
        } else {
          this.serviceFichaTramite.getLoMasConsultado(this.id_momento);
          this.validacionInicioRuta();
        }
      }
    );
  }

  validacionInicioRuta() {
    this.getUbicacion = this.serviceFichaTramite.getMasConsultado$.subscribe(
      ([data, estado]: [LoMasConsultado, string]) => {
        if (estado != '') {
          if (data.data.length > 0) {
            this.estado_item[0] = false;
          } else {
            this.estado_item[0] = true;
            if (this.current_url == this.mas_con)
              this.router.navigate([this.tra_des]);
          }
        }
      }
    );
  }

  getCurrentUrl() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.current_url = event.url;
        if (event.url == this.cat_sub_id) {
          this.router.navigate([this.mas_con]);
        }
        // console.log('url 1', this.appService.previousUrl);
        // console.log('url 2', this.cat_sub + '/' + this.id_momento);
        const footer = document.querySelector('.govco-pwa-footer') as HTMLElement;
        // console.log('footer', footer.classList.remove)

        // if ((this.appService.previousUrl == this.cat_sub)
        //   || (this.appService.previousUrl == this.cat_sub + '/' + this.id_momento))
        // console.log('router', this.appService.previousUrl) // this.appService.previousUrl = this.cat_sub 

        if (this.desplegable != undefined && footer != null) {
          this.desplegable.nativeElement.classList.remove('height');
          footer.classList.remove('position')
        }
      });
  }

  ngAfterViewInit(): void {
    this.init_observe = this.desplegable.nativeElement.getBoundingClientRect().height;
    this.observador.observe(this.desplegable.nativeElement);
  }

  ngAfterViewChecked(): void {
    this.selectItemBarra();
  }

  // Este metodo permite leer el valor index para seleccionar el item de la barra horizontal
  // logica funcional: al momento de ingresar o actualizar (refresh - f5) en alguna de las pestañas 
  // de la barra horizontal, este componente inicia e informa cual es el item que necesita seleccionar.
  selectItemBarra() {
    this.getSelectItem = this.serviceDetalleMomento.getItemBarra$.subscribe((index: number) => {
      this.indicators.toArray().forEach((item) => {
        item.nativeElement.classList.remove('filtro-active');
      })
      this.indicators.toArray()[index].nativeElement.classList.add('filtro-active');
    })
  }

  // Este metodo crea un objeto observable que permite vigilizar el tamaño de la ventana desplegable
  // y decide que cacteristicas debe tomar la venta desplegable y el mini footer
  resizeObserver() {
    const height_viewport_scroll = this.viewport_scroll.getBoundingClientRect().height * 0.88;
    this.observador = new ResizeObserver((entradas) => {
      entradas.forEach((entrada) => {
        const height_desplegable: number = entrada.contentRect.height;
        if (height_desplegable != this.init_observe)
          if (height_viewport_scroll > height_desplegable) {
            this.desplegable.nativeElement.classList.add('height');
            (document.querySelector('.govco-pwa-footer') as HTMLElement).classList.add('position')
          }
      })
    })
  }

  ngOnDestroy(): void {
    this.getUbicacion.unsubscribe;
    this.getSelectItem.unsubscribe;
  }

  returnCategoriesPWA() {
    this.resetSetLoMasConsultado();
    this.router.navigate([this.cat_sub]);
  }

  // Este metodo resetea los valores de lo mas consultado en el momento de cerrar el detalle momento
  // garantizando un control continuo de lanzamiento del siguiente detalle momento de vida
  resetSetLoMasConsultado() {
    const rest_mas_consultado: LoMasConsultado = {
      data: [],
      base: {
        succeeded: true,
        errors: '',
        message: '',
        totalRegistros: 0
      }
    }
    this.serviceFichaTramite.setLoMasConsultado(rest_mas_consultado, '');
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
