import { Component, Input, OnInit } from '@angular/core';
import { BottomMenuService } from 'src/app/transversales/services/bottom-menu/bottom-menu.service';
import { HeaderService } from 'src/app/transversales/services/header-service/header.service';
import { SidenavService } from 'src/app/transversales/services/sidenav-service/sidenav-service.service';
import { EjerciciosModel } from '../../models/ejercicios.model';
import { FiltrosParticipacionModel } from '../../models/FiltrosParticipacionModels';
import { ParticipaModel } from '../../models/participa.model';
import { EjerciciosService } from '../../services/ejercicios.service';
import { ParticipaService } from '../../services/participa.service';
import { ValidarUrlService } from '../../services/validar-url.service';
import { esResponsive, isMobile } from '../../utils/utils';


@Component({
  selector: 'app-participa',
  templateUrl: './participa.component.html',
  styleUrls: ['./participa.component.scss']
})
export class ParticipaComponent implements OnInit {
  showNext: boolean = false;
  page = 1;
  pageSize = 6;
  totalPage = 0;
  title: string;
  descripcion: string;
  @Input() filtro:FiltrosParticipacionModel;
  currentPage: number = 0;
  currentPageAccesibilidad:number = 0;
  estadoPaginadorAccesible:boolean=false;
  estadoAlertaAccesible:boolean=false;
  totalNoticias: number = 0;
  totalPages: number = 0;
  pages: number[] = new Array(4);
  llamadoADatos:boolean=false;
  esResponsive = esResponsive;
  ejercicios: EjerciciosModel[];
  objetoEjercicios:any;
  videoHome: ParticipaModel;
  mostrarTemas:boolean=false;
  listaFiltros:any = [{codigo:"Fecha inicio - Más reciente",nombre:"Fecha inicio - más reciente"},{codigo:"Fecha inicio - Más antigua",nombre:"Fecha inicio - más antigua"},{codigo:"Alfabéticamente Z - A",nombre:"Alfabéticamente z - a"},{codigo:"Alfabéticamente A - Z",nombre:"Alfabéticamente a - z"}];
  seleccionado:any = this.listaFiltros[0];

  
  constructor(
    private EjerciciosService: EjerciciosService,
    private ParticipaService: ParticipaService,
    public validarUrlService: ValidarUrlService,
    ) { }

  ngOnInit() {

     this.ParticipaService.getTitleAndDescription()
     .subscribe((resp:any) => {
       this.title = resp.data.titulo;
       this.descripcion = resp.data.descripcion;
     })
  }

  ngAfterViewInit() {
    window.addEventListener("load", () => {
      this.home();
  //    this.paginacion(this.page);
    });
  }
  
  iniciarCargaDatos(){
    this.resize();
    // this.setVersion();
    this.currentPage = 0;
    this.currentPageAccesibilidad=1;
    this.filtro.pageNumber=this.currentPage;
    // this.inicializarVariablesPaginado();
    this.obtenerEjerciciosPaginacion(this.currentPage);
  }

  resize(){
    this.llamadoADatos = esResponsive();
    window.addEventListener('resize', () => {
      if(esResponsive() && !this.llamadoADatos){
        this.filtro.pageSize = 4;
        this.iniciarCargaDatos();
        this.llamadoADatos = true;
      }else if(!esResponsive() && this.llamadoADatos){
        this.filtro.pageSize = 9;
        this.iniciarCargaDatos();
        this.llamadoADatos = false;
      }
    })
  }

  iniciarFiltro(){
    this.filtro={
      pageNumber:0,
      orden:this.seleccionado.codigo,
      pageSize:this.esResponsive()?4:9,
      soloActivo:"0",
      version:""
    }
  }

  paginacion(pagina: any) {
    this.EjerciciosService.getEjercicios(pagina, this.pageSize).subscribe((data) => {
      console.log(data);
      this.ejercicios = data.ejercicios;
      this.totalPage = data.totalPages * this.pageSize;
    }, (error) => {
      console.error(error);
    });
  }
  
  home() {
    this.ParticipaService.getHome().subscribe((data) => {
      this.videoHome = data;
    }, (error) => {
      console.error(error);
    });
  }
  
  obtenerEjerciciosPaginacion(page: number) {
    this.showNext = false;
    this.EjerciciosService.obtenerEjerciciosPaginacion(this.filtro)?.subscribe(
      (data) => {
        if(data){
          this.objetoEjercicios= data.data;
          this.ejercicios=[];
          this.ejercicios = this.objetoEjercicios.data;
          this.currentPage=page;
          this.currentPageAccesibilidad=this.currentPage+1;
          this.totalPages = this.objetoEjercicios.ultimaPagina;
          if (this.currentPage<this.totalPages-1){
            this.showNext = true;
          }

        }
      }
    );
  }

  changePage(page: number) {
    this.currentPage = page
    this.filtro.pageNumber=page;
    this.obtenerEjerciciosPaginacion(page);
    this.setFocusGrupoNoticias();
  }

  activarEventosAccesibilidad(evt: { keyCode: number; }){
    if(evt.keyCode==9){
        window["objeto"]=this;
        window.addEventListener('keyup',this.setEventos);
        window.addEventListener('keypress',this.setEventos);
        // document.addEventListener("click", this.desActivarEventosClickPorFuera);
        this.estadoPaginadorAccesible=true;
    }else if(evt.keyCode==27){
      document.getElementById("salir-seccion-participacion")?.focus();
    }
  }

  desActivarEventosAccesibilidad(evt: { keyCode: number; }){
    if(evt.keyCode==9){
      window.removeEventListener('keyup', this.setEventos);
      window.removeEventListener('keypress', this.setEventos);
      this.estadoPaginadorAccesible=false;
    }
  }

  setEventos(evt: { key: string; }){
    if(evt.key==="Escape"){
      window.removeEventListener('keyup', window["objeto"].setEventos);
      document.getElementById("salir-seccion-participacion")?.focus();
    }
    // if(evt.code==="Space"){
    //   document.getElementById("listado-noticias").focus();
    // }
  }

  setFocusGrupoNoticias(){
    setTimeout(() => {
      // document.getElementById("contenedor-temas-participacion-focus").focus();
      // window.scrollTo(0, 700);
      var box = document.getElementById('govco-header');
      document.getElementById('contenedor-temas-participacion-focus')!.style["scrollMarginTop"]="0px";
      if(isMobile() || !esResponsive()){
        document.getElementById('contenedor-temas-participacion-focus')!.style["scrollMarginTop"] = (box?.offsetHeight)+"px";
      }
      document.getElementById('contenedor-temas-participacion-focus')?.scrollIntoView();
    }, 1000);
  }

  focoSeccionParticipa(){
    var box = document.getElementById('govco-header');
    document.getElementById('seccionParticipa')!.style["scrollMarginTop"]="0px";
    if(isMobile() || !esResponsive()){
      document.getElementById('seccionParticipa')!.style["scrollMarginTop"] = (box?.offsetHeight)+"px";
    }

    document.getElementById('seccionParticipa')?.scrollIntoView();
  }

  cargarPaginaAccesible(evet: { target: { value: string | number; }; }){
    // evet.preventDefault();
    if(+evet.target.value>this.totalPages){
      this.estadoAlertaAccesible=true;
      setTimeout(() => {
        document.getElementById("mensaje-numero-paginas")?.focus();
      }, 100);

    }else{
      this.changePage(+evet.target.value-1);
      this.setFocusGrupoNoticias();
    }
  }

  filtrarActivos(){
    this.mostrarTemas= !this.mostrarTemas;
    this.filtro.soloActivo = this.mostrarTemas?'1':'0';
    this.iniciarCargaDatos();
  }

  filtrarOrden(seleccionado:any){
    this.filtro.orden = seleccionado.detail.codigo;
    this.iniciarCargaDatos();
  }

  //Función para seleccionar el estilo de acuerdo a las condiciones estipuladas en la HU
//  getClassEstadoEjercicio(info: any) {
//    let clase = "estado-ejercicio-participacion-activo";
//    var aFecha1 = new Date(info.fechaFinalizacion).toLocaleDateString().split('/');
//    var aFecha2 = new Date().toLocaleDateString().split('/');
//    var fFecha1 = Date.UTC(Number(aFecha1[2]), Number(aFecha1[1]) - 1, Number(aFecha1[0]));
//    var fFecha2 = Date.UTC(Number(aFecha2[2]), Number(aFecha2[1]) - 1, Number(aFecha2[0]));
//    var dif = fFecha2 - fFecha1;
//    var dias = Math.floor(dif / (1000 * 60 * 60 * 24));
 //   if (dias == -1) {
//      clase = 'estado-ejercicio-participacion-pausa';
//      info.estado = "Falta un día";
//    } else if (info.estado === 'Finalizado') {
//      clase = 'estado-ejercicio-participacion-finalizado';
//    }
//    return clase;
//  }
  
}

