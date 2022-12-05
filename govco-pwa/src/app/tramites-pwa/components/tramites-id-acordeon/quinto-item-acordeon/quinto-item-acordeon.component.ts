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
  selectedItemsListUrls : any = [];
  selectedItemsListNames : any = [];
  selectedAllItems : boolean;

  constructor(
    protected fichaTramiteService: TramitesPorIdService
  ) { }

  ngOnInit() {
    this.getNormatividadById();
  }

  ngDoCheck() {
    if (this.normatividad.length > 0) {
      if (document.getElementById('legislacionContenido')) {
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
      });
  }

  toogleSeleccion() {
    let estadoSelectorGeneral : any = document.getElementsByName('selectorGeneral')[0];
    let normas : any = document.getElementsByClassName('normas');

    if (estadoSelectorGeneral.checked) {
      for (const norma of normas) {
        norma.checked=true;
        this.toggleBool = false;
      }
      this.selectedAllItems = true;
    } else {
      for (const norma of normas) {
        norma.checked=false;
        this.toggleBool = true;
      }
      this.selectedAllItems = false;
    }
  }

  descargarSeleccion() {

    let normas : any = document.getElementsByClassName('normas');
    this.selectedItemsListUrls = [];
    this.selectedItemsListNames = [];
    for (const norma of normas) {
      if (norma.checked==true) {
        this.selectedItemsListUrls.push(norma.value);
        this.selectedItemsListNames.push(norma.name);
      }
    }
    this.selectedItemsListUrls.forEach((e : any) =>  self.open(e),"_self")
   }

   toogleSeleccionItem(event : any) {
    if (event.target.checked) {
      this.toggleBool = false;
    } else {
      let normas : any = document.getElementsByClassName('normas');
      let normasCheck = 0
      for (const norma of normas) {
        if (norma.checked) {
          normasCheck =+ 1;
        }
      }
      if (normasCheck < normas.length) {
        let estadoSelectorGeneral : any = document.getElementsByName('selectorGeneral')[0];
        estadoSelectorGeneral.checked =false
      }
      if (normasCheck == 0) {
        this.toggleBool = true;
      }
    }
  }

  VerMasLegislacion() {
    let legislacionActiva = $('tr#legislacionContenido');
    let ultimoActivo = legislacionActiva.filter('.actived:last').index();
    legislacionActiva.filter(':lt(' + (ultimoActivo + 6) + ')').addClass('actived');
  }
}
