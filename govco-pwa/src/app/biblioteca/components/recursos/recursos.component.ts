import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as saveAs from 'file-saver';
import { HeaderBibliotecaService } from '../../services/header-service/header-biblioteca-service.service';
import { HighlightcodeService } from '../../services/highlight-code-service/highlight-code-service.service';
import { RecursosService } from '../../services/recursos-service/recursos-service.service';
import { ValidarUrlService } from '../../services/validar-url-service/validar-url-service.service';
import { ModalComponent } from '../../shared/modal/modal.component';
import Recurso from '../../shared/models/recurso';
import { SeccionNivel } from '../../shared/models/seccion-niveles';


declare var $: any;

@Component({
  selector: 'app-recursos',
  templateUrl: './recursos.component.html',
  styleUrls: ['./recursos.component.scss']
})
export class RecursosComponent implements OnInit {

  recurso: string;
  idNivel:number;
  infoRecurso: Recurso;
  seccionNivel:SeccionNivel = new SeccionNivel;
  showAll: boolean;
  highlighted: boolean = false;
  fragment: string;
  visibles:number=8;
  checkAll:boolean=false;
  seleccionados:number=0;
  pesoTotal:number =0;
  idsRecursos:number[]=[];
  cargando:boolean=false;

  constructor(private activatedRoute: ActivatedRoute,
    private recursosServices: RecursosService,
    private headerService: HeaderBibliotecaService,
    private modalService: NgbModal,
    private validarUrlService: ValidarUrlService,
    private highlightcodeService: HighlightcodeService) { }

  ngOnInit() {
    this.onInitElements();
    this.activatedRoute.url.subscribe(() => {
      this.iniciarModelos();
      this.recurso = this.activatedRoute.snapshot.paramMap.get('recurso')!;
      //this.idNivel = this.parametrosService.getIdNivel();
      this.fragment = this.activatedRoute.snapshot.fragment!;
      //this.getInfoByRecurso(this.recurso);
      if(this.activatedRoute.snapshot.paramMap.get('nivel3')===null){
        this.headerService.setTitle(this.activatedRoute.snapshot.paramMap.get('nivel1') + " / "+ this.activatedRoute.snapshot.paramMap.get('nivel2'));
      }else{
        this.headerService.setTitle(this.activatedRoute.snapshot.paramMap.get('nivel1') + " / "+ this.activatedRoute.snapshot.paramMap.get('nivel2')+" / "+ this.activatedRoute.snapshot.paramMap.get('nivel3'));
      }

      this.ObtenerSeccionNivelPortal(this.activatedRoute.snapshot.paramMap.get('nivel')!);
      this.showAll = false;
    });
  }

  ngAfterViewChecked() {
    if (this.infoRecurso && !this.highlighted) {
      this.highlightcodeService.highlightAll();
      this.highlighted = true;
    }

    if (this.fragment) {
      var elmnt = document.getElementById(this.fragment);
      if (elmnt) {
        elmnt.scrollIntoView({ block: "end", behavior: "smooth" });
      }
    }
  }


  iniciarModelos() {
    // changes.prop contains the old and the new value...
    this.checkAll=false;
    this.seleccionados=0;
    this.idsRecursos=[];
    this.pesoTotal=0;
  }
  private onInitElements() {
    $('select').selectpicker();
  }

  getInfoByRecurso(recurso: string) {
    this.recursosServices.getInfoByRecurso(recurso).subscribe((data: any) => {
      this.infoRecurso = data;
      this.headerService.setTitle(this.infoRecurso.categoria + " / " + this.infoRecurso.nombre);
    }, (error: any) => {
      console.error(error);
    });

  }

  ObtenerSeccionNivelPortal(nivel: string) {
    this.recursosServices.ObtenerSeccionNivelPortal(this.recurso,nivel).subscribe((data: any) => {
      if(nivel==="dos"){
        this.seccionNivel["nivelHijo"]= data["nivelDos"];
        this.seccionNivel["recursos"] = data["recursos"];
      }else if(nivel==="tres"){
        this.seccionNivel["nivelHijo"]= data["nivelTres"];
        this.seccionNivel["recursos"] = data["recursos"];
      }
      this.inicializarRecursos();
    }, (error: any) => {
      console.error(error);
    });

  }

  mostrar(){
    if(this.visibles == this.seccionNivel.recursos.length){
      this.visibles=8;
    }else {
      this.visibles=this.seccionNivel.recursos.length;
    }
  }
  mostrarTodo(tareaId: any) {
    let name = "ocultar";
    let arr = [];
    var ocultos = document.getElementsByClassName("cont-" + tareaId);
    for (var i = 0; i < ocultos.length; i++) {
      if (ocultos[i].getAttribute("style")) {

        arr = ocultos[i].className.split(" ");
        if (arr.indexOf(name) == -1) {
          ocultos[i].className += " " + name;
          ocultos[i].setAttribute("style", 'display: initial');
          document.getElementById("ocultar-" + tareaId)!.style.display = "initial";
          document.getElementById("mostrar-" + tareaId)!.style.display = "none";
        } else {
          ocultos[i].classList.remove("ocultar");
          ocultos[i].setAttribute("style", 'display: none');
          document.getElementById("mostrar-" + tareaId)!.style.display = "initial";
          document.getElementById("ocultar-" + tareaId)!.style.display = "none";
        }
      }
    }
  }

  open(data: any) {
    if (data.tipoArchivo == "video" || data.tipoArchivo == "audio") {
      const modalRef = this.modalService.open(ModalComponent, {
        size: "lg",
        backdrop: "static",
        keyboard: false
      });

      let dataModal = {
        url: data.ubicacion,
        type: data.tipoArchivo,
        contenido: data.tipoContenido
      }
      modalRef.componentInstance.data = dataModal;
    } else {
      window.open(data.ubicacion);
    }
  }

  abrirRecurso(data: any) {
    this.validarUrlService.openLink(data.url);
  }

  descargarZip(recurso: string, tareaId: number) {
    const filename = 'archivos-' + recurso.split(" ").join("-").toLowerCase() + '.zip';
    this.recursosServices.descargarZip(tareaId).subscribe((data: any) => {
      saveAs(data, filename);
    }, (error: any) => {
      console.error(error);
    });
  }

  ObtenerTamanoArchivos() {

    this.recursosServices.tamanoArchivos(JSON.stringify(this.idsRecursos)).subscribe((data: any) => {
      this.pesoTotal = data;
    }, (error: any) => {
      console.error(error);
    });

  }

  descargarRecursos() {
    this.cargando=true;
    const filename = 'archivos-' + this.seccionNivel.nivelHijo.nombreRecurso.split(" ").join("-").toLowerCase() + '.zip';
    this.recursosServices.descargarArchivos(JSON.stringify(this.idsRecursos)).subscribe((data: any) => {
      saveAs(data, filename);
      this.cargando=false;
    }, (error: any) => {
      console.error(error);
    });
  }


  inicializarRecursos(){
    for (let index = 0; index < this.seccionNivel.recursos.length; index++) {
        this.seccionNivel.recursos[index]["checked"]=false;
    }
  }

  seleccionarTodo(){
    this.idsRecursos=[];
    this.seleccionados=0;
    this.checkAll = this.checkAll?false:true;
    for (let index = 0; index < this.seccionNivel.recursos.length; index++) {
      if(this.seccionNivel.recursos[index].tipoRecurso!="url" && this.seccionNivel.recursos[index].tipoRecurso!="video" && this.seccionNivel.recursos[index].externo===0){
        this.seccionNivel.recursos[index].checked=this.checkAll;
        this.seleccionados = this.checkAll?this.seleccionados+1:0;
        if(this.checkAll){
          this.idsRecursos.push(this.seccionNivel.recursos[index].id);
        }
      }
    }
    this.ObtenerTamanoArchivos();
  }

  sumarSeleccionados(i: any, event: any){
    this.seccionNivel.recursos[i].checked =event.target.checked;
    this.seleccionados = event.target.checked?this.seleccionados+1:this.seleccionados-1;
    if(event.target.checked){
      this.idsRecursos.push(this.seccionNivel.recursos[i].id)
    }else{
      this.idsRecursos = this.idsRecursos.filter(obj => obj !== this.seccionNivel.recursos[i].id);
    }
     this.ObtenerTamanoArchivos();
  }

}
