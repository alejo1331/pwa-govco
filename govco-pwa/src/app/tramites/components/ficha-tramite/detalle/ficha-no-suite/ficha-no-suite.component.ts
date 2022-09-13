import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FichaTramiteService } from '../../../../services/ficha-tramite.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PuntosAtencionModalComponent } from '../../puntos-atencion-modal/puntos-atencion-modal.component';
import { DocumentacionRequerida } from '../../../../models/tipo-ficha-tramite';
import { BreadCrumbService } from '../../../../services/bread-crumb.service';
import { ValidateUrlService } from '../../../../services/validate-url.service';
import { ModalAlertasComponent } from '../modal-alertas/modal-alertas.component';
import { UtilsService } from '../../../../services/utils.service';

@Component({
  selector: 'app-ficha-no-suite',
  templateUrl: './ficha-no-suite.component.html',
  styleUrls: ['./ficha-no-suite.component.scss']
})
export class FichaNoSuiteComponent implements OnInit, OnChanges {
  @Input('tipoFicha') tipoFicha: string;
  @Input() informacionFicha: any;
  dataBase: any;
  consideracionesA: any = [] ;
  puntosAtencion = [] as any;
  documentacion: DocumentacionRequerida[] = [];
  numeroId: any;

  constructor(private route: ActivatedRoute,
              private fichaTramiteService: FichaTramiteService,
              private router: Router,
              private modalService: NgbModal,
              private breadCrumbService: BreadCrumbService,
              private validateUrlService: ValidateUrlService, 
    private utilsService: UtilsService, ) {
  }
  ngOnInit (): void {
    if (this.tipoFicha == '603' &&  this.tipoFicha != undefined) {
      this.route.paramMap.subscribe(params => {
        this.numeroId = this.route.snapshot.params.id.substr(1,20);
        this.fichaTramiteService.GetNotSuiteTramiteById(this.route.snapshot.params.id).subscribe(data =>{
          this.dataBase = data;
          this.breadCrumbService.setTittle( this.dataBase.Nombre );
        });
        this.fichaTramiteService.GetConsideracionesAdicionalesById(this.route.snapshot.params.id).subscribe(data =>{
          if(data['StatusCode'] != 604){
            this.consideracionesA = data;
          }
        });
        this.fichaTramiteService.GetPuntosAtencionNoSuitById(this.route.snapshot.params.id).subscribe(data =>{
         this.getDatosPuntosAtencion(data);
        });
        this.fichaTramiteService.GetDocumentacionRequeridaNoSuitById(this.route.snapshot.params.id).subscribe(data =>{
          this.documentacion = data;
         });
      });

    }
  }

  ngOnChanges() {
    
  }
  async getDatosPuntosAtencion(data:any) {
    for (const item of data) {
      const punto = await  this.fichaTramiteService.GetPuntoAtencionById(item.PuntosAtencionId).toPromise();
      if(punto.PuntoAtencionId)
      {
        this.puntosAtencion.push(punto);
      }
    }

  }

  showModal(data:any) {
   const modal = this.modalService.open(PuntosAtencionModalComponent, { size: 'lg',
      backdrop: 'static',
      keyboard: false
    });
   modal.componentInstance.puntosAtencion = data;
  }

  ngAfterViewChecked() {
    this.setNumeroTramite(this.numeroId);
  }

  setNumeroTramite(numero: string) {
    const s = document.getElementsByTagName('govco-area-servicios');
    if (s.length > 0) {
      s[0].setAttribute('itemid', 'S' + numero);
    }
  }

  isIE() {
    const ua = navigator.userAgent;
    const isIe = ua.indexOf('MSIE ') > -1 || ua.indexOf('Trident/') > -1;
    return isIe;
  }

  validateUrl(url: string, e:any) {
    e.preventDefault();
    if (!url.includes('embebido') && !url.includes('tramites-y-servicios')) {
      this.validateUrlService.validate(url)
        .subscribe((data: boolean) => {
          if (data) {
            window.open(url, "target='_blank'");;
          } else {
            this.utilsService.openModalErrorValidateUrl();
          }
        });
    } else {
      location.href = url;
    }
  }

  openModalAlerta(entidad: string, url: string) {
    const modalRef = this.modalService.open(ModalAlertasComponent, {centered: true, windowClass: 'modal-alerta-salida vw-100'});
    modalRef.componentInstance.message = 'Estás ingresando al sitio de ' + entidad + ', con esta acción abrirás una nueva pestaña. ¡Te esperamos pronto!';
    modalRef.componentInstance.linkUrl = url;
  }

  eventoGetPuntos(){
    this.showModal(this.puntosAtencion);
  }
}
