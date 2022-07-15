import { Component, OnInit } from '@angular/core';
import { TramitesMasConsultadosInterface } from '../../models/tramites-mas-consultados-interface';
import { TramitesMasConsultadosService } from '../../services/tramites-mas-consultados-service/tramites-mas-consultados.service';

@Component({
  selector: 'app-tramites-mas-consultados',
  templateUrl: './tramites-mas-consultados.component.html',
  styleUrls: ['./tramites-mas-consultados.component.scss']
})
export class TramitesMasConsultadosComponent implements OnInit {

  tramites: TramitesMasConsultadosInterface[] ;

  constructor(protected servicioTramites: TramitesMasConsultadosService) {
  }

  ngOnInit() {    
    this.servicioTramites.getTramitesConsultados()
    .subscribe(
      (data: TramitesMasConsultadosInterface[]) => { // Success
        this.tramites = data;
      },
      (error) => {
        console.error(error);
      }
    );  
  }

}
