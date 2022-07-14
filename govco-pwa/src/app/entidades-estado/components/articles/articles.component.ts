import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from 'src/app/app.component';
import { EntidadModel } from '../../models/entidad-model';
import { ArticlesService } from '../../services/article-service/article-service.service';
import { EntidadesService } from '../../services/entidades-service/entidades-service.service';
import { ValidarUrlService } from '../../services/validar-url-service/validar-url-service.service';
import { Repo, RepoCount } from '../../shared/Repo';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {
  modalRef: BsModalRef;
  @ViewChild('ccomponent', { static: true }) ccomponent: ElementRef;
  title = 'app-entidades';

  public paramActual: string;
  public paramFiltro: string;
  public paramOrden: string;
  public active: string;

  name = 'Angular';
  tableData = [];

  public reposObserverCount: Array<RepoCount>;
  public reposObserver: Array<Repo>;
  public reposObserverFilter: Array<Repo>;
  public listaHola: string[];
  public urlPopUp: string;
  public showEntidades: string;
  public nTotalEntidades: string;

  public minShowSearch: number;
  public isSearchResult: boolean;
  public linkSelected: boolean;

  private toggle: boolean = false;

  public entityInfo: EntidadModel;


  constructor(
    public articlesS: ArticlesService,
    private modalService: NgbModal,
    public entidadService: EntidadesService,
    private validarUrlService: ValidarUrlService,
    @Inject(AppComponent) private parent: AppComponent
  ) {
  }

  ngOnInit() {
    this.parent.parametroBuscador = '';
    this.isSearchResult = true;
    this.minShowSearch = 1;
    this.showEntidades = '';
    this.nTotalEntidades = '';
    this.reposObserverFilter = new Array<Repo>();
    this.ShowHideButton('Rama Ejecutiva', 'Nacional');
    let cambioInputEvent = document.querySelector('govco-buscador');
    cambioInputEvent?.addEventListener("cambioInputEvent", (valor) => {
      this.govcoBuscadorCompleted(valor);
    });
  }

  scrollTobottom() {
    let currentScrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
    window.scrollTo(0, currentScrollHeight);
    document.documentElement.scrollTop = currentScrollHeight;
    window.event?.preventDefault();
  }

  govcoBuscadorCompleted(valor: any) {
    // COMPORTAMIENTO NUEVO BUSCAADOR //
    let dataBuscador = valor.detail;
    if(dataBuscador.tipoEvento != 0){
      this.active = 'busqueda';
      this.nTotalEntidades = this.reposObserverFilter.length + ' entidades';
      this.showEntidades = 'Resultados de la Búsqueda';
      this.articlesS.getAllBy(dataBuscador.parametroInputBuscador)
        .subscribe(item => {
          this.reposObserverFilter = item;
          this.reposObserverFilter.sort((a,b) => a.categorias.localeCompare(b.categorias));
          let catDuplicates: never[] = [];
          this.reposObserverFilter = this.replaceDups(catDuplicates, this.reposObserverFilter);
          this.nTotalEntidades = this.reposObserverFilter.length + ' entidades';
        });
    }
  }

  ShowHideButton(param: string, orden: any) {
    let catDuplicates: never[] = [];
    this.paramFiltro = '';
    this.paramOrden = orden;
    this.paramActual = param;
    this.toggle != this.toggle;

    if (this.paramOrden != undefined) {
      this.articlesS.getRamaEjecutivaByOrden(this.paramActual, this.paramOrden, this.paramFiltro)
        .subscribe(item => {
          this.reposObserverFilter = item;
          this.reposObserverFilter = this.replaceDups(catDuplicates, this.reposObserverFilter);
          this.nTotalEntidades = this.reposObserverFilter.length + ' entidades';
          this.isSearchResult = (this.reposObserverFilter.length <= this.minShowSearch) ? true : false;
          this.showEntidades = 'Orden ' + this.cambiarNombre(orden.toString());
        });
    } else {
      this.articlesS.getListaByCategoria(this.paramActual, this.paramFiltro)
        .subscribe(item => {
          this.reposObserverFilter = item;
          this.reposObserverFilter = this.replaceDups(catDuplicates, this.reposObserverFilter);
          this.isSearchResult = (this.reposObserverFilter.length <= this.minShowSearch) ? true : false;
          this.nTotalEntidades = this.reposObserverFilter.length + ' entidades';
          this.showEntidades = this.cambiarNombre(param.toString());
        });
    }
  }

  buscarByFiltro(inputValue: string) {
    this.paramFiltro = inputValue;
    let catDuplicates: never[] = [];
    this.isSearchResult = false;
    if (this.paramOrden != undefined) {
      this.articlesS.getRamaEjecutivaByOrden(this.paramActual, this.paramOrden, this.paramFiltro)
        .subscribe(item => {
          this.reposObserverFilter = item;
          this.reposObserverFilter = this.replaceDups(catDuplicates, this.reposObserverFilter);
          this.nTotalEntidades = this.reposObserverFilter.length + ' entidades';
          //this.isSearchResult = (this.reposObserverFilter.length <= this.minShowSearch) ? true:false ;
        });
    } else {
      this.articlesS.getListaByCategoria(this.paramActual, this.paramFiltro)
        .subscribe(item => {
          this.reposObserverFilter = item;
          this.reposObserverFilter = this.replaceDups(catDuplicates, this.reposObserverFilter);
          this.nTotalEntidades = this.reposObserverFilter.length + ' entidades';
        });
    }
  }

  replaceDups(catDuplicates: any, entities: any) {
    for (var i = 0; i < (this.reposObserverFilter).length; i++) {
      catDuplicates[i] = this.reposObserverFilter[i].categorias;
      if (i > 0 && this.reposObserverFilter[i - 1].categorias === this.reposObserverFilter[i].categorias) {
        catDuplicates[i] = '';
      }
    }
    for (var i = 0; i < (this.reposObserverFilter).length; i++) {
      entities[i].categorias = catDuplicates[i];
    }
    return entities;
  }

  openModalAlerta(entidad: string, url: string) {
    
    //Obtiene datos de la entidad por el nombre  
    this.entidadService.getEntitybyName(entidad).subscribe( data =>{
      //Si encuentra la entidad en TBL_AUTORIDAD y esta integrado, abre la ventana de su URL
      if (data != null && data.integrado){
        window.open(data.url);
      }
      else { // Si no está integrado o no encontrón info en TBL_AUTORIDAD, muestra modal para abrir Url
        // const modalRef = this.modalService.open(ModalAlertasComponent, { centered: true, windowClass: 'modal-alerta-salida vw-100' });
        // modalRef.componentInstance.entidad = entidad;
        // modalRef.componentInstance.linkUrl = url;
        this.validarUrlService.openLink(url);
      }
    },
    error => {
      this.validarUrlService.openLink(url);
      console.log(error)
    })
  }

  cambiarNombre(valor: string) {
    if (valor === 'Organizacion Electoral') {
      valor = 'Organización Electoral';
    }

    if (valor === 'Organos Autonomos e Independientes') {
      valor = 'Órganos Autónomos e Independientes';
    }

    if (valor === 'Sistema Integral de Verdad, Justicia, Reparacion y no Repeticion') {
      valor = 'Sistema Integral de Verdad, Justicia, Reparación y no Repetición';
    }
    return valor;
  }

}
