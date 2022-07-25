import { Component, OnInit } from '@angular/core';
import { EntidadesService } from '../../services/entidades-service/entidades-service.service';
import { esResponsive, isMobile } from '../utils/utils';

@Component({
  selector: 'app-entidades-estado',
  templateUrl: './entidades-estado.component.html',
  styleUrls: ['./entidades-estado.component.scss']
})
export class EntidadesEstadoComponent implements OnInit {
  estadoContenedor:boolean = false;
  posicionTop:string="";
  seccionUnoHeight:any;
  esResponsive=esResponsive;
  estadosMenuEntidades:any = [];
  ultimoActivo:any = {pos:0,estado:false};
  heightMenuContraido = 90;
  estadoEventoScroll:boolean=true;
  estadoEventoClick:boolean=false;
  estadoResize:boolean=true;
  estadoBanner:boolean=true;
  estiloFijo:any = {position:'fixed',top:this.posicionTop, height:'90px'};;

  objeto:any;
  constructor(private serviceEntidades:EntidadesService) {
  }

  ngOnInit() {
    this.getEntidades();
  }

  ngAfterViewInit(){
    var obj = this;
    window.addEventListener("scroll" ,function(e) {
      obj.activarDesacticarMenuCollapse();
      if(obj.estadoEventoScroll && !obj.estadoEventoClick){
        obj.activarDesacticarItemsMenuCollapse();
      }
    });
    // window.addEventListener('resize', () => {
    //   isMobile()?null:window.scrollTo(0,0);
    // })
    window.scrollTo(0,0)
  }

  getEntidades(){
    this.serviceEntidades.getEntidades()?.subscribe((resp) => {
      if(resp.data){
        if(resp.data.rama){
          this.objeto = resp.data;
          setTimeout(() => {
            this.seccionUnoHeight = document.getElementById("seccion-uno")?.clientHeight;
          }, 500);
        }
      }
    });
  }

  activarDesacticarMenuCollapse(){
    var seccion = document.getElementById("seccion_"+this.objeto.rama.items[0].titulo)!;
    
      seccion.style.marginTop = "0px";
      this.estadoContenedor=false;
  }

  activarDesacticarItemsMenuCollapse(){
    if(this.estadoContenedor){
      var seccionMenu = document.getElementById("seccion-uno")!;
      var seccionMenuScrollTop = seccionMenu.getBoundingClientRect().top;
      var seccionMenuScrollBottom = seccionMenuScrollTop+seccionMenu.clientHeight;
      var fueraSeccionEntidades = false;
      this.objeto.rama.items.map(function(rama: any) {
        var seccionEntidad = document.getElementById("seccion_"+rama.titulo)!;
        var seccionEntidadScrollTop = seccionEntidad.getBoundingClientRect().top-seccionMenu.clientHeight;
        var seccionEntidadScrollBottom = seccionEntidadScrollTop+seccionEntidad.clientHeight+seccionMenu.clientHeight;

        if(seccionEntidadScrollTop<seccionMenuScrollTop && seccionEntidadScrollBottom>seccionMenuScrollBottom){
          console.log("Dentro "+rama.titulo+"->"+seccionEntidadScrollTop +" < "+ seccionMenuScrollTop + " | " +seccionEntidadScrollBottom + ">" + seccionMenuScrollBottom)
          // document.querySelectorAll(".items-menu").forEach(function(item,index){
          //   item.classList.remove("activo");
          // });
          document.getElementById("item_menu_"+rama.titulo)?.classList.add("activo");
          fueraSeccionEntidades = true;
        }else{
          console.log("Afuera "+rama.titulo+"->"+seccionEntidadScrollTop +" < "+ seccionMenuScrollTop + " | " +seccionEntidadScrollBottom + ">" + seccionMenuScrollBottom)
          document.getElementById("item_menu_"+rama.titulo)?.classList.remove("activo");
        }
      });
    }
  }

  esVisibleSeccion(elem: any){
    let elementScrollTop = elem.getBoundingClientRect().top;
    var box = document.getElementById('govco-header');
    return box?(elementScrollTop<=box.offsetHeight+this.heightMenuContraido):false;
  }

  arrasteASeccion(link: any,id: any){
    this.estadoEventoClick=true;
    document.getElementById('seccion_'+id)!.style["scrollMarginTop"]="130px";
    document.getElementById("seccion_"+id)?.focus();

    setTimeout(() => {
      document.getElementById('seccion_'+id)?.scrollIntoView();
    }, 100);

   
  }

  isHeaderFixed() {
    if (!isMobile()) {
      if (window.devicePixelRatio > 1.75) {
        return false;
      } else {
        return true;
      }
    } else {
      return true;
    }
  }

  construirMenuEstadosEstidades(){
    var obj = this;
    this.objeto.rama.items.map(function(rama: any) {
      obj.estadosMenuEntidades["item_menu_"+rama.titulo]=false;
    });
  }


  cerrarVentana(evt: any){
    this.estadoBanner=!this.estadoBanner;
  }

  activarEventosAccesibilidad(evt: any){
    if(evt.keyCode==9){
        window["objeto"]=this;
        window.addEventListener('keyup',this.setEventos);
        window.addEventListener('keypress',this.setEventos);
    }else if(evt.keyCode==27){
      document.getElementById("salir-seccion-entidades")?.focus();
    }
  }

  desActivarEventosAccesibilidad(evt: any){
    if(evt.keyCode==9){
      window.removeEventListener('keyup', this.setEventos);
      window.removeEventListener('keypress', this.setEventos);
    }
  }

  setEventos(evt: any){
    if(evt.key==="Escape"){
      window.removeEventListener('keyup', window["objeto"].setEventos);
      document.getElementById("salir-seccion-entidades")?.focus();
    }
    if(evt.code==="Space"){
      document.getElementById("listado-noticias")?.focus();
    }
  }

  setFocusGrupoNoticias(){
    setTimeout(() => {
      document.getElementById("contenedor-noticias-focus")?.focus();
      window.scrollTo(0, 300);
    }, 1000);
  }

}
