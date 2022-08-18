import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-cards-servicios-para-entidades',
  templateUrl: './cards-servicios-para-entidades.component.html',
  styleUrls: ['./cards-servicios-para-entidades.component.scss']
})
export class CardsServiciosParaEntidadesComponent implements OnInit {

  urlPlanIntegracion = environment.urlPlanIntegracion;

  constructor() {
    //constructor
  }

  ngOnInit (): void {
    // Init
  }

  irLink(url: string){
    window.open( url, "_blank" );
  }
}
