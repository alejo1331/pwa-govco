import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FichaTramiteService } from 'src/app/tramites/services/ficha-tramite.service';
import { ModalFechasDisponiblesComponent } from '../../modal-fechas-disponibles/modal-fechas-disponibles.component';
import { PuntosAtencionModalComponent } from '../../puntos-atencion-modal/puntos-atencion-modal.component';

@Component({
  selector: 'app-fichaespecifica-detalle',
  templateUrl: './fichaespecifica-detalle.component.html',
  styleUrls: ['./fichaespecifica-detalle.component.scss']
})
export class FichaespecificaDetalleComponent implements OnInit {

  @Input() data: any;

  infoDescripcionTramite: any;
  caracteresCategoria: boolean = false;
  nombreExpanded: string = "Leer más...";
  contenidoDescripcion: string;
  contenidoLeido: string;
  nombreBotonAccion: string;
  nombreTipoTramite: string;
  integrated: boolean = false;
  urlIconoTipoTramite: string;
  urlIconoCostoTramite: string;
  mostrarIcono: boolean = false;
  showBotonFechas: boolean;
  constructor(
    private fichaTramiteService: FichaTramiteService,
    private modalService: NgbModal,
  ) { }

  ngOnInit(): void {
    this.fichaTramiteService.GetServicioYTramiteEspecifico(this.data.IdTramite).subscribe( data => {
      this.infoDescripcionTramite = data;
      this.contenidoDescripcion = this.infoDescripcionTramite.DescripcionTramite.substring(0,250);
      this.contenidoLeido = this.infoDescripcionTramite.DescripcionTramite;
      if(this.contenidoDescripcion.length > 249){
        this.caracteresCategoria = true;
      }
    });

    this.IconosCostoTramite(this.data.Costo)
    this.functionBoton(this.data.Tipotramite)
    this.showBotonFecha()
  }

  getPuntosAtencion() {
    this.fichaTramiteService.GetPuntosAtencion(this.data.TipoAtencionPresencial, 1, Number(this.data.IdTramite), 0, 0).subscribe(
      // Success response
      response => {
        this.showModal({ tipo: 'puntos', data: response });
      },
      // Failure response
      error => {
        console.error(error);
      },
    );
  }

  getFechas(){
    this.fichaTramiteService.GetFechasByTramite(this.data.IdTramite).subscribe(  (resp)=> {
      console.log("getFechas", resp)
      this.showModalFechas(resp)
    });
  }

  showBotonFecha(){
    this.fichaTramiteService.GetFechasByTramite(this.data.IdTramite).subscribe(  (resp)=> {
      if(resp.length != 0) {
        return this.showBotonFechas = true
      } else {
        return this.showBotonFechas = false;
      }
    });
  }

 

  showModal(data: { tipo: string; data: any; }) {

    const modal = this.modalService.open(PuntosAtencionModalComponent, {
      size: 'lg',
      backdrop: 'static',
      keyboard: false
    });
    if (data.tipo === 'puntos') {
      modal.componentInstance.puntosAtencion = data.data;
    }
    if (data.tipo === 'normatividad') {
      modal.componentInstance.normatividad = data.data;
    }
  }

  showModalFechas(data:any) {

    const modal = this.modalService.open(ModalFechasDisponiblesComponent, {
      size: 'lg',
      backdrop: 'static',
      keyboard: false
    });
    modal.componentInstance.fechas = data;
    
  }

  showExpended(){
    if(this.nombreExpanded === "Leer más..."){
      this.contenidoDescripcion = this.infoDescripcionTramite.DescripcionTramite;
      this.nombreExpanded = "Leer menos";
    } 
    return this.contenidoDescripcion;
  }

  showBotonLeer(){
    if(this.nombreExpanded === "Leer más..."){
      this.contenidoDescripcion = this.infoDescripcionTramite.DescripcionTramite;
      this.nombreExpanded = "Leer menos";
    } else {
      this.nombreExpanded = "Leer más...";
      this.contenidoDescripcion = this.infoDescripcionTramite.DescripcionTramite.substring(0,250);
    }
    return this.contenidoDescripcion;
  }

  
  IconosCostoTramite(data: any){
    if(data === 'SI') {
      this.urlIconoCostoTramite = 'https://govco-prod-webutils.s3.amazonaws.com/uploads/2022-06-03/00e9d0ea-698d-43ae-b0dd-2a704207d9ec-Icon_costo.svg'
    } else {
      this.urlIconoCostoTramite = 'https://govco-prod-webutils.s3.amazonaws.com/uploads/2022-06-03/af2d19cd-5e11-4c96-be10-9af9dff71597-Icon_sin_costo.svg'
    }
    return this.urlIconoCostoTramite;
  }

  functionBoton(data: any){

     if(data === 'En línea'){
      this.urlIconoTipoTramite = "https://govco-prod-webutils.s3.amazonaws.com/uploads/2022-06-03/e0029aaa-1feb-4882-8bb6-ee5285be267c-Icon_pc.svg"
    } else if(data === 'Presencial') {
      this.nombreBotonAccion = "Ver los puntos de atención";
      this.urlIconoTipoTramite = "https://govco-prod-webutils.s3.amazonaws.com/uploads/2022-06-03/1eb8a16c-8bc1-4415-8700-7d59dfbc5ca2-Icon_user.svg"
    } else {
      this.nombreTipoTramite = "Semipresencial"
      this.mostrarIcono = true;
      this.urlIconoTipoTramite = "https://govco-prod-webutils.s3.amazonaws.com/uploads/2022-06-24/d71c2341-30c6-42f0-a0f1-cfe0d1409a82-Icon_semipresencial.svg"
    }
    return this.nombreBotonAccion;
  }

}
