import { Component, OnInit, Input } from '@angular/core';
import { AccionSolicitudInterface } from 'src/app/tramites-pwa/models/acciones-solicitud/accion-solicitud-interface';
import { AccionFormulario } from 'src/app/tramites-pwa/models/acordeon/acordeon-interface';
import { TramitesPorIdService } from 'src/app/tramites-pwa/services/tramites-por-id-service/tramites-por-id.service';
import { ValidateUrlService } from 'src/app/tramites-pwa/services/validate-url.service';

@Component({
  selector: 'app-accion-formulario',
  templateUrl: './accion-formulario.component.html',
  styleUrls: ['./accion-formulario.component.scss']
})
export class AccionFormularioComponent implements OnInit {
  @Input() data: AccionFormulario[];
  @Input() tramiteEnLinea: boolean;

  dataPuntosAtencion: AccionSolicitudInterface;

  constructor(
    public validateUrlService: ValidateUrlService,
    protected TramitesPorIdservice: TramitesPorIdService
    ) { }

  ngOnInit(): void {
  }

  abrirPuntosAtencionClic(idMomento:number, idAccion:number) {
    this.dataPuntosAtencion = {
      abrirPuntos: '0%',
      cerrarTramiteId: '-100%',
      idTipo: 2,
      idMomento: idMomento,
      idAccion: idAccion,
    }
    this.TramitesPorIdservice.getAbrirPuntos(this.dataPuntosAtencion);
  }

}
