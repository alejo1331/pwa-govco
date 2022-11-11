import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BottomMenuService } from 'src/app/transversales/services/bottom-menu/bottom-menu.service';
import { HeaderService } from 'src/app/transversales/services/header-service/header.service';
import { SidenavService } from 'src/app/transversales/services/sidenav-service/sidenav-service.service';

//models
import { CodigoCIIU } from '../../../../models/codigo-ciiu';
import { PreguntaTramite } from '../../../../models/pregunta-tramite';
import { PageRequestTramite } from '../../../../models/page-request-tramite';
import { CIIUTramite } from '../../../../models/ciiutramite';

//Service
import { BackendApiService } from '../../../../services/backend-api.service';
import { BreadCrumbService } from '../../../../services/bread-crumb.service';

@Component({
  selector: 'app-detalle-consulta-ciiu',
  templateUrl: './detalle-consulta-ciiu.component.html',
  styleUrls: ['./detalle-consulta-ciiu.component.scss'],
})
export class DetalleConsultaCiiuComponent implements OnInit {
  codigoCiiuT: CodigoCIIU;
  totalRegistros: number = 0;
  numeroPaginas: number = 0;
  page: number = 1;
  count: number = 0;
  pageSize: number = 3;
  idCodigo: number;
  idMunicipio: string;
  idDepartamento: string;
  preguntasLng: number;
  Condicionados: PreguntaTramite[];
  Obligatorios: CIIUTramite[];
  request: PageRequestTramite;

  constructor(
    private service: BackendApiService,
    private route: ActivatedRoute,
    protected servicioHeader: HeaderService,
    public bottomService: BottomMenuService,
    protected servicioSideNav: SidenavService,
    private breadCrumbService: BreadCrumbService
  ) {
    this.idCodigo = Number(this.route.snapshot.paramMap.get('idCodigo'));
    this.idDepartamento = this.route.snapshot.paramMap.get('dpto')!;
    this.idMunicipio = this.route.snapshot.paramMap.get('municipio')!;

    //Definicion del objeto request.
    let objeto = new PageRequestTramite();
    objeto.IdCIIU = this.idCodigo;
    objeto.IdDepartamento = this.idDepartamento;
    objeto.IdMunicipio = this.idMunicipio;
    this.request = objeto;
    this.breadCrumbService.setTittleCiiu(
      'Código CIIU ' + this.route.snapshot.paramMap.get('codigo')
    );
    this.bottomService.putOcultandoBottomMenu(false);
  }

  ngOnInit(): void {
    this.cargarCondicionados();
    this.CargarCodigoCIIU();
    this.cargarTotalRegistros();
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
    this.bottomService.seleccionandoItem(3);
    this.bottomService.ajustandoPantalla(false);
    this.servicioSideNav.seleccionandoItem(false, 'null');
    (document.getElementById('topScroll') as HTMLElement).style.top = '3.5rem';
    (document.getElementById('topScroll') as HTMLElement).scrollTop = 0;
  }

  cargarTotalRegistros() {
    this.service.TotalTramitesObligatorios(this.request).subscribe((data) => {
      this.totalRegistros = data;
      this.contadorPaginas();
    });
  }

  cargarCondicionados() {
    this.service
      .obtenerTramitesCondicionados(this.request)
      .subscribe((data) => {
        this.Condicionados = data;
        this.preguntasLng = this.Condicionados.length;
      });
  }

  CargarCodigoCIIU() {
    this.service.getCodigoCIIU(this.request.IdCIIU).subscribe((data) => {
      this.codigoCiiuT = data;
    });
  }

  numeroPagina(): number {
    let pagina = this.page * this.pageSize;
    return pagina > this.totalRegistros ? this.totalRegistros : pagina;
  }

  cambiarAnterior() {
    this.page -= 1;
  }

  cambiarSiguiente() {
    this.page += 1;
  }

  establecerPagina(pagina: number) {
    this.page = pagina;
  }

  contadorPaginas() {
    let divisionNormal = Math.trunc(this.totalRegistros / this.pageSize);
    let divisionResiduo = this.totalRegistros % this.pageSize;
    this.numeroPaginas =
      divisionResiduo > 0 ? divisionNormal + 1 : divisionNormal;
  }

  createRange(number: any) {
    let items: number[] = [];
    for (let i = 1; i <= number; i++) {
      items.push(i);
    }
    return items;
  }
}
