import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FiltrosNoticiasModel } from 'src/app/noticias//models/FiltrosNoticiasModel';
import { esResponsive } from 'src/app/noticias/utils/utils';
import { ActualidadPrincipalService } from 'src/app/noticias/services/actualidad-principal-service/actualidad-principal.service';
import { SidenavService } from 'src/app/transversales/services/sidenav-service/sidenav-service.service';
import { HeaderService } from 'src/app/transversales/services/header-service/header.service';
import { BottomMenuService } from 'src/app/transversales/services/bottom-menu/bottom-menu.service';
import { environment } from "src/environments/environment";
import { NoticiasServiceService } from 'src/app/noticias/services/noticias-service/noticias-service.service';


@Component({
  selector: 'app-actualidad-principal',
  templateUrl: './actualidad-principal.component.html',
  styleUrls: ['./actualidad-principal.component.scss']
})
export class ActualidadPrincipalComponent implements OnInit {
  @ViewChild('selectcategoria') selectcategoria: ElementRef<HTMLElement> | any;
  @ViewChild('selectsubcategoria') selectsubcategoria: ElementRef<HTMLElement> | any;
  @ViewChild('selectsector') selectsector: ElementRef<HTMLElement> | any;
  @ViewChild('selectentidad') selectentidad: ElementRef<HTMLElement> | any;
  @ViewChild('selectano') selectano: ElementRef<HTMLElement> | any;
  @ViewChild('selectmes') selectmes: ElementRef<HTMLElement> | any;
  @ViewChild('listadonoticias') listadonoticias: ElementRef<HTMLElement>;

  seleccionado: any = { codigo: "", nombre: "" }
  listaMomentosDeVida: any[] = [];
  listaSubCategorias: any[] = [];
  listaSectores: any[] = [];
  listaEntidades: any[] = [];
  listaMeses: any[] = [];
  listaAnos: any[] = [];
  filtro: FiltrosNoticiasModel;
  fitrosDesplegados: boolean | null = false;
  OrderDesplegados: boolean | null = false;
  esResponsive = esResponsive;
  anoActual = new Date().getFullYear();
  mesActual = new Date().getMonth() + 1;
  estadoComboCategoria: boolean = true;
  idCategoriaParam: string | null = "";
  nombreCategoriaParam: string = "";
  codNoticias: string = environment.codNoticias;
  totalNoticias: number = 0;

  constructor(
    private serviceActualidadPrincipal: ActualidadPrincipalService,
    private activatedRouter: ActivatedRoute,
    protected servicioSideNav: SidenavService,
    protected servicioHeader: HeaderService,
    public bottomService: BottomMenuService,
    private noticiasService: NoticiasServiceService
  ) {
    this.iniciarFiltro();
    this.bottomService.putOcultandoBottomMenu(false);
  }

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
    this.obtenerNoticiasPaginacion(0);
    this.servicioHeader.estadoHeader(true, true);
    this.bottomService.seleccionandoItem(0);
    this.bottomService.ajustandoPantalla(false);
    this.servicioSideNav.seleccionandoItem(true, 'noticias');
    (document.getElementById('topScroll') as HTMLElement).style.top = '3.5rem';
    (document.getElementById('topScroll') as HTMLElement).scrollTop = 0;

    this.activatedRouter.url.subscribe(() => {
      this.idCategoriaParam = this.activatedRouter.snapshot.paramMap.get('idCategoria');
      this.estadoComboCategoria = this.idCategoriaParam ? false : true;
    });
    setTimeout(() => {
      this.IniciarCampoAno();
      this.limpiarFiltros();
    }, 1000);
  }

  iniciarFiltro() {
    this.filtro = {
      pageNumber: 0,
      categoria: this.idCategoriaParam ? this.idCategoriaParam : "",
      subCategoria: "",
      entidad: "",
      sector: "",
      fechaPublicacion: "",
      version: ""
    }
  }

  IniciarCampoAno() {
    var anoInicio = 2019;
    var anoActual: any = new Date();
    var listTmp = [];
    listTmp.push({ nombre: "Todos", codigo: "" });
    while (anoInicio != anoActual.getFullYear()) {
      listTmp.push({ nombre: anoInicio, codigo: anoInicio });
      anoInicio++;
    }

    listTmp.push({ nombre: anoInicio, codigo: anoInicio });
    this.listaAnos = listTmp;
  }

  obtenerFiltroVacio() {
    return {
      pageNumber: 0,
      categoria: "",
      subCategoria: "",
      entidad: "",
      sector: "",
      fechaPublicacion: "",
      version: ""
    }
  }

  abrirSeccionFiltros() {
    this.fitrosDesplegados = !this.fitrosDesplegados;
  }

  abrirSeccionOrder() {
    this.OrderDesplegados = !this.OrderDesplegados;
  }

  cargarCombosBox() {
    this.getMomentosDeVida();
    this.getSectores();
    this.getEntidades();
    this.iniciarFiltro();
  }

  getMomentosDeVida() {
    this.serviceActualidadPrincipal.getMomentosDeVida().subscribe((resp) => {
      if (resp) {
        resp.data.unshift({ codigo: "", nombre: "Todos" });
        this.selectcategoria.nativeElement["list"] = resp.data;
        if (!this.estadoComboCategoria) {
          this.cargarCategoriaPorParametro();
        }
      }
    });
  }

  getSubCategorias(codigoCategoria: any) {
    this.serviceActualidadPrincipal.getSubCategorias(codigoCategoria).subscribe((resp) => {
      if (resp) {
        this.selectsubcategoria.nativeElement["seleccionado"] = { codigo: "", nombre: "" }
        resp.unshift({ codigo: "", nombre: "Todos" });
        this.selectsubcategoria.nativeElement["list"] = resp;
      }
    });
  }

  getSectores() {
    this.serviceActualidadPrincipal.getSectores().subscribe((resp) => {
      if (resp) {
        resp.data.unshift({ codigo: "", nombre: "Todos" });
        this.selectsector.nativeElement["list"] = resp.data;
      }
    });
  }

  getEntidades() {
    this.serviceActualidadPrincipal.getEntidades(this.filtro).subscribe((resp) => {
      if (resp) {
        resp.data.unshift({ codigo: "", nombre: "Todos" });
        this.selectentidad.nativeElement["list"] = resp.data;
      }
    });
  }

  cargarDependienteMomentosDeVida(categoria: any) {
    this.selectsubcategoria.nativeElement["seleccionado"] = { codigo: "", nombre: "" }
    if (categoria.detail.codigo == "") {
      this.selectsubcategoria.nativeElement["list"] = [];
    } else {
      this.getSubCategorias(categoria.detail.codigo);
    }

    this.construirFiltro();
    this.getEntidades();
    document.getElementById("selectsubcategoria_arrow")?.focus();
  }

  cargarDependienteSubcategoria(subCategoria: any) {
    if (subCategoria.detail.codigo == "") {
      this.selectsubcategoria.nativeElement["seleccionado"] = { codigo: "", nombre: "" }
    }
    this.construirFiltro();
    this.getEntidades();
    document.getElementById("selectsector_arrow")?.focus();
  }

  cargarDependienteSector(sector: any) {
    if (sector.detail.codigo == "") {
      this.selectsector.nativeElement["seleccionado"] = { codigo: "", nombre: "" }
    }
    this.construirFiltro();
    this.getEntidades();
    document.getElementById("selectentidad_arrow")?.focus();
  }

  seleccionadoEntidad() {
    this.construirFiltro();
    document.getElementById("fechaPublicacion")?.focus();
  }

  cargarDependienteAno(ano: any) {
    if (ano.detail.codigo === "") {
      this.selectmes.nativeElement["seleccionado"] = { codigo: "", nombre: "" }
      this.selectano.nativeElement["seleccionado"] = { codigo: "", nombre: "" }
    } else if (this.selectmes.nativeElement["seleccionado"].codigo == "") {
      this.selectmes.nativeElement["list"] = [{ nombre: "Todos", codigo: "" }, { nombre: "Enero", codigo: "01" }, { nombre: "Febrero", codigo: "02" }, { nombre: "Marzo", codigo: "03" }, { nombre: "Abril", codigo: "04" }, { nombre: "Mayo", codigo: "05" }, { nombre: "Junio", codigo: "06" }, { nombre: "Julio", codigo: "07" }, { nombre: "Agosto", codigo: "08" }, { nombre: "Septiembre", codigo: "09" }, { nombre: "Octubre", codigo: "10" }, { nombre: "Noviembre", codigo: "11" }, { nombre: "Diciembre", codigo: "12" }];
    }
    this.construirFiltro();
    this.getEntidades();
  }

  setFecha(mes: any) {
    if (mes.detail.codigo === "") {
      this.selectano.nativeElement["seleccionado"] = { codigo: "", nombre: "" };
      this.selectmes.nativeElement["seleccionado"] = { codigo: "", nombre: "" };
    }
    this.construirFiltro();
    this.getEntidades();
  }

  construirFiltro() {
    let filtroTmp = this.obtenerFiltroVacio();
    filtroTmp.categoria = this.selectcategoria.nativeElement["seleccionado"].codigo ? this.selectcategoria.nativeElement["seleccionado"].codigo : "";
    filtroTmp.subCategoria = this.selectsubcategoria.nativeElement["seleccionado"].codigo ? this.selectsubcategoria.nativeElement["seleccionado"].codigo : "";
    filtroTmp.sector = this.selectsector.nativeElement["seleccionado"].codigo ? this.selectsector.nativeElement["seleccionado"].codigo : "";
    filtroTmp.entidad = this.selectentidad.nativeElement["seleccionado"].codigo ? this.selectentidad.nativeElement["seleccionado"].codigo : "";
    filtroTmp.fechaPublicacion = this.construirFecha();
    this.filtro = filtroTmp;
  }

  construirFecha() {
    if (this.selectano.nativeElement["seleccionado"].codigo != "" && this.selectmes.nativeElement["seleccionado"].codigo != "") {
      return this.selectmes.nativeElement["seleccionado"].codigo + "/" + this.selectano.nativeElement["seleccionado"].codigo;
    } else {
      return "";
    }
  }

  limpiarFiltros() {
    this.seleccionado = { codigo: "", nombre: "" };
    this.iniciarFiltro();
    this.cargarCombosBox();
    this.selectsubcategoria.nativeElement["list"] = [];
    this.selectano.nativeElement["seleccionado"] = { codigo: "", nombre: "" };
    this.selectmes.nativeElement["list"] = [];
  }

  cargarCategoriaPorParametro() {
    var categoria = this.selectcategoria.nativeElement["list"].find((catego: { codigo: string | null; }) => catego.codigo === this.idCategoriaParam)
    this.nombreCategoriaParam = categoria.nombre;
    this.selectcategoria.nativeElement["seleccionado"] = categoria;
    this.getSubCategorias(categoria.codigo);
    this.construirFiltro();
    this.getEntidades();
  }

  obtenerNoticiasPaginacion(page: any) {
    this.noticiasService.obtenerNoticiasPaginacion(this.filtro).subscribe(
      (data) => {
        console.log("data", data)
        if (data) {
          this.totalNoticias = data.data.totalRegistros;
        }
      }
    );
  }
}