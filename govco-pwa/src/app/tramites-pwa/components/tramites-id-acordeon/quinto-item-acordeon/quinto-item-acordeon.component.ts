import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { TramitesPorIdService } from 'src/app/tramites-pwa/services/tramites-por-id-service/tramites-por-id.service';

@Component({
  selector: 'app-quinto-item-acordeon',
  templateUrl: './quinto-item-acordeon.component.html',
  styleUrls: ['./quinto-item-acordeon.component.scss']
})
export class QuintoItemAcordeonComponent implements OnInit {
  @Input() dataAcordeon: any;
  normatividad :any = [];
  toggleBool=true;
  selectedItemsList : any = [];

  constructor(
    protected fichaTramiteService: TramitesPorIdService
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit():void {

  }

  ngOnChanges(changes: SimpleChanges) {

    if (changes.dataAcordeon.currentValue != undefined) {
      this.dataAcordeon = changes.dataAcordeon.currentValue;
      this.getNormatividadById(this.dataAcordeon)

    }
  }

  getNormatividadById(dataAcordeon:any) {
    this.fichaTramiteService
      .GetNormatividadById(dataAcordeon.idTramite)
      .subscribe((n) => {
        this.normatividad = n;
      });
  }

  toogleSeleccion(){
    let estadoSelectorGeneral : any = document.getElementsByName('selectorGeneral')[0];
    let normas : any = document.getElementsByName('norma')
    if (estadoSelectorGeneral.checked){
      for (let i=0; i < normas.length; i++){
        normas[i].checked=true;
      }
    }
    else{
      for (let i=0; i < normas.length; i++){
        normas[i].checked=false;
      }
    }
  }

  descargarSeleccion(){

    let normas : any = document.getElementsByName('norma')
    for (let i=0; i < normas.length; i++){
      if(normas[i].checked==true){
        this.selectedItemsList.push(normas[i].value);
      }
    }
    debugger
    this.selectedItemsList.forEach((e : any) =>  self.open(e),"_self")
   }



}
