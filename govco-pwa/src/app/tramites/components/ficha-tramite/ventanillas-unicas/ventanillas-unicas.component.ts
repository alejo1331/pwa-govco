import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { SedesElectronicasModel } from 'src/app/tramites/models/sedes-electronicas.model';
import { VentanillasPortalesService } from 'src/app/tramites/services/ventanillas-portales.service';
import { BottomMenuService } from 'src/app/transversales/services/bottom-menu/bottom-menu.service';
import { HeaderService } from 'src/app/transversales/services/header-service/header.service';
import { SidenavService } from 'src/app/transversales/services/sidenav-service/sidenav-service.service';

@Component({
  selector: 'app-ventanillas-unicas',
  templateUrl: './ventanillas-unicas.component.html',
  styleUrls: ['./ventanillas-unicas.component.scss']
})
export class VentanillasUnicasComponent implements OnInit {

  public parametroBuscador: string;
  public ventanillas: SedesElectronicasModel[] = [];
  public totalPages: number;
  public itemMin: number;
  public itemMax: number;
  public pagina = '1'; // Iniciamos
  public paginador: any;
  public listSedes: boolean = true;
  public config = {
    itemsPerPage: 10,
    currentPage: 1
  };

  constructor(
    public bottomService: BottomMenuService,
    protected servicioHeader: HeaderService,
    protected servicioSideNav: SidenavService,
    private sedesElectronicasService: VentanillasPortalesService,
    private titleService: Title,
    private meta: Meta,
  ) {
    this.parametroBuscador = '';
    localStorage.removeItem('categorias');
  }

  ngOnInit(): void {
    this.servicioHeader.estadoHeader(false,true);
    this.bottomService.seleccionandoItem(1);
    this.bottomService.ajustandoPantalla(false);
    this.servicioSideNav.seleccionandoItem(false,'null');
    (document.getElementById('topScroll') as HTMLElement).style.top = '7.25rem';
    (document.getElementById('topScroll') as HTMLElement).scrollTop = 0;
    this.parametroBuscador = '';

    this.sedesElectronicasService.getVentanillas().subscribe(
      (resp) => {
        this.ventanillas = resp;
        this.totalPages = Math.ceil(this.ventanillas.length / this.config.itemsPerPage);
        this.paginador = Array.from(Array(this.totalPages), (x, i) => i + 1);
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
    this.setTitle("Ventanillas Únicas | GOV.CO");
    this.setMetaDescription("Listado de ventanillas electrónicas que gestionan de manera integrada trámites administrativos de dos o más entidades del Estado, bajo una misma finalidad, para atender a los colombianos.");
    this.setMetaTitle("Ventanillas Únicas | GOV.CO");
  }
  
  setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

  setMetaTitle(desc: string) {
    this.meta.updateTag({ name: 'title', content: desc })
  }

  setMetaDescription(desc: string) {
    this.meta.updateTag({ name: 'description', content: desc })
  }
  
  public govcoBuscadorCompleted(valor:any) {
    let dataBuscador = valor.detail;
    if (dataBuscador.tipoEvento != 0) {
      this.listSedes = false;
      document.getElementById("ventanilla-sede")?.classList.add("ventanilla-sede")
    } else {
      this.listSedes = true;
    }
  }

  public changePage() {
    const page = this.pagina;
    this.config.currentPage = parseInt(page, 10);
    this.validateItemsPerPage();
  }

  public onPageChange(number: number) {
    this.config.currentPage = number;
    this.pagina = number.toString();
    this.validateItemsPerPage();
  }

  public validateItemsPerPage() {
    if (this.ventanillas.length > this.config.itemsPerPage) {
      this.itemMin = (this.config.currentPage * this.config.itemsPerPage) - (this.config.itemsPerPage - 1);
      const max = this.config.currentPage * this.config.itemsPerPage;
      this.itemMax = max > this.ventanillas.length ? this.ventanillas.length : max;
    }
  }

}
