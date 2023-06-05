import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DesplegableDosService } from 'src/app/biblioteca-pwa/services/desplegable-dos/desplegable-dos.service';
import { BottomMenuService } from 'src/app/transversales/services/bottom-menu/bottom-menu.service';
import { HeaderService } from 'src/app/transversales/services/header-service/header.service';
import { SidenavService } from 'src/app/transversales/services/sidenav-service/sidenav-service.service';
import { DetalleMomentosDeVidaService } from '../../services/detalle-momentos-de-vida/detalle-momentos-de-vida.service';
import { GeolocalizacionViewService } from 'src/app/transversales/services/geolocalizacion-view/geolocalizacion-view.service';
import { Subscription } from 'rxjs';
import { LoMasConsultadoService } from '../../services/lo-mas-consultado/lo-mas-consultado.service';
import { CategoriasService } from '../../services/categorias/categorias.service';

@Component({
  selector: 'govco-app-detalle-momentos-de-vida',
  templateUrl: './detalle-momentos-de-vida.component.html',
  styleUrls: ['./detalle-momentos-de-vida.component.scss'],
})
export class DetalleMomentosDeVidaComponent implements OnInit, OnDestroy {
  subcategoriaMomentos: number = 0;
  title: string = '';
  description: string = '';
  longDescription: string = '';
  id_momento: string = '';
  icon: string = '';

  private getParametroId: Subscription;
  private getUbicacion: Subscription;

  estado_mas_consultado: boolean = false;

  constructor(
    private router: Router,
    protected servicioSideNav: SidenavService,
    protected servicioHeader: HeaderService,
    public bottomService: BottomMenuService,
    private activatedRoute: ActivatedRoute,
    private serviceDetalleMomento: DetalleMomentosDeVidaService,
    protected serviceGeoView: GeolocalizacionViewService,
    private serviceFichaTramite: LoMasConsultadoService,
    private serviceCategorias: CategoriasService
  ) {}

  ngOnInit(): void {
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
          this.router.navigate([
            '/categorias-subcategorias-pwa/' +
              this.id_momento +
              '/lo-mas-consultado',
          ]);
        } else {
          this.estado_mas_consultado = true;
          this.router.navigate([
            '/categorias-subcategorias-pwa/' +
              this.id_momento +
              '/tramites-destacados',
          ]);
        }
      }
    );
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

  ngOnDestroy(): void {
    // this.getParametroId.unsubscribe;
    this.getUbicacion.unsubscribe;
  }

  returnCategoriesPWA() {
    this.router.navigate(['/categorias-subcategorias-pwa']);
  }
}
