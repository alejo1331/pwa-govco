import { Component, Input, OnInit, SimpleChanges, ViewChild, ElementRef } from '@angular/core';
import { TramitesPorIdService } from 'src/app/tramites-pwa/services/tramites-por-id-service/tramites-por-id.service';
import * as JSZip from 'jszip';
import * as JSZipUtils from '../../../../../assets/scripts/jszip-utils.js';



@Component({
  selector: 'app-quinto-item-acordeon',
  templateUrl: './quinto-item-acordeon.component.html',
  styleUrls: ['./quinto-item-acordeon.component.scss']
})
export class QuintoItemAcordeonComponent implements OnInit {
  @Input() dataAcordeon: any;
  normatividad :any = [];
  toggleBool=true;
  selectedItemsListUrls : any = [];
  selectedItemsListNames : any = [];
  selectedAllItems : Boolean;

  constructor(
    protected fichaTramiteService: TramitesPorIdService
  ) { }

  ngOnInit() {
    this.getNormatividadById();
  }

  ngAfterContentInit():void {

  }

  ngDoCheck() {

    if (this.normatividad.length > 0){
      if(document.getElementById('legislacionContenido')){
        $('table tr:nth-child(n+1):nth-child(-n+5)').addClass('actived');
      }

    }

  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.dataAcordeon.currentValue != undefined) {
      this.dataAcordeon = changes.dataAcordeon.currentValue;
      this.getNormatividadById();
    }
  }

  getNormatividadById() {
    this.fichaTramiteService
      .GetNormatividadById(this.dataAcordeon.idTramite)
      .subscribe((n) => {
        this.normatividad = n;
        ;
      });

  }

  toogleSeleccion(){
    let estadoSelectorGeneral : any = document.getElementsByName('selectorGeneral')[0];
    let normas : any = document.getElementsByClassName('normas');

    if (estadoSelectorGeneral.checked){
      for (let i=0; i < normas.length; i++){
        normas[i].checked=true;
        this.toggleBool = false;
      }
      this.selectedAllItems = true;
    }
    else{
      for (let i=0; i < normas.length; i++){
        normas[i].checked=false;
        this.toggleBool = true;
      }
      this.selectedAllItems = false;
    }
  }

  descargarSeleccion(){

    let normas : any = document.getElementsByClassName('normas');
    const zip = new JSZip();
    let cuentaNorma = 0;
    for (let i=0; i < normas.length; i++){
      if(normas[i].checked==true){
        this.selectedItemsListUrls.push(normas[i].value);
        this.selectedItemsListNames.push(normas[i].name);
      }
    }
    this.selectedItemsListUrls.forEach((e : any) =>  self.open(e),"_self")
   }

   toogleSeleccionItem(event : any){
    if (event.target.checked) {
      this.toggleBool = false;
    }
    else {
      let normas : any = document.getElementsByClassName('normas');
      let normasCheck = 0
      for (let i=0; i < normas.length; i++){
        if (normas[i].checked){
          normasCheck =+ 1;
        }
      }
      if (normasCheck < normas.length){
        let estadoSelectorGeneral : any = document.getElementsByName('selectorGeneral')[0];
        estadoSelectorGeneral.checked =false
      }
      if (normasCheck == 0){
        this.toggleBool = true;
      }
    }
  }

  VerMasLegislacion(){
    let legislacionActiva = $('tr#legislacionContenido');
    let ultimoActivo = legislacionActiva.filter('.actived:last').index();
    legislacionActiva.filter(':lt(' + (ultimoActivo + 6) + ')').addClass('actived');
  }

}
