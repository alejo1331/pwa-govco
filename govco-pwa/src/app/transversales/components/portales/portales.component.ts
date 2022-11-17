import { Component, OnInit } from '@angular/core';
import { ValidarUrlService } from 'src/app/participa/services/validar-url.service';
import { SedesElectronicasModel } from 'src/app/tramites/models/sedes-electronicas.model';
import { VentanillasPortalesService } from 'src/app/tramites/services/ventanillas-portales.service';
import { BottomMenuService } from 'src/app/transversales/services/bottom-menu/bottom-menu.service';
import { HeaderService } from 'src/app/transversales/services/header-service/header.service';
import { SidenavService } from 'src/app/transversales/services/sidenav-service/sidenav-service.service';

@Component({
  selector: 'app-portales',
  templateUrl: './portales.component.html',
  styleUrls: ['./portales.component.scss']
})
export class PortalesComponent implements OnInit {

  public parametroBuscador: string;
  public portales: SedesElectronicasModel[] = [];

  page = 1;
  count = 0;
  pageSize = 10;
  public itemMin: number;
  public itemMax: number;
  public pagina = '1'; // Iniciamos
  public paginador: any;
  public listSedes: boolean = true;

  constructor(
    private sedesElectronicasService: VentanillasPortalesService,
    private validarUrlService: ValidarUrlService,
    public bottomService: BottomMenuService,
    protected servicioHeader: HeaderService,
    protected servicioSideNav: SidenavService,
  ) {
    this.bottomService.putOcultandoBottomMenu(false);
  }

  ngOnInit(): void {
    this.servicioHeader.estadoHeader(false, true);
    this.bottomService.seleccionandoItem(0);
    this.bottomService.ajustandoPantalla(false);
    this.servicioSideNav.seleccionandoItem(false, 'null');
    (document.getElementById('topScroll') as HTMLElement).style.top = '7.25rem';
    (document.getElementById('topScroll') as HTMLElement).scrollTop = 0;

    this.parametroBuscador = '';
    this.portalesData();
  }

  getRequestParams(page: number, pageSize: number) {
    // tslint:disable-next-line:prefer-const
    let params = {};
    if (page) {
      params[`page`] = page - 1;
    }
    if (pageSize) {
      params[`size`] = pageSize;
    }
    return params;
  }

  public portalesData() {
    const params = this.getRequestParams(this.page, this.pageSize);
    this.sedesElectronicasService.getPortales(params);
    this.sedesElectronicasService.getPortales(params).subscribe(
      (resp: any) => {
        this.portales = resp.data;
        this.count = resp.totalItems;
        this.paginador = Array.from(Array(resp.totalPages), (x, i) => i + 1);
        this.validateItemsPerPage();
      },
      (error) => {
        console.error(error);
      }
    );
    let cambioInputEvent = document.querySelector('govco-buscador-2');
    cambioInputEvent?.addEventListener("cambioInputEvent", (valor) => {
      this.govcoBuscadorCompleted(valor);
    });
  }
  public govcoBuscadorCompleted(valor: any) {
    let dataBuscador = valor.detail;
    if (dataBuscador.tipoEvento != 0) {
      this.listSedes = false;
    } else {
      this.listSedes = true;
    }
  }
  public onPaginatorChange(number: any) {
    this.page = number;
    this.pagina = number.toString();
    this.portalesData();
    this.validateItemsPerPage();
  }

  public changePage() {
    const page = this.pagina;
    this.page = parseInt(page, 10);
    this.portalesData();
    this.validateItemsPerPage();
  }

  public validateItemsPerPage() {
    if (this.count > this.pageSize) {
      this.itemMin = (this.page * this.pageSize) - (this.pageSize - 1);
      const max = this.page * this.pageSize;
      this.itemMax = max > this.count ? this.count : max;
    }
  }

  public openLink(url: string) {
    this.validarUrlService.validate(url).subscribe(resp => {
      if (resp) { window.open(url, "target='_blank'"); }
    });
  }

}
