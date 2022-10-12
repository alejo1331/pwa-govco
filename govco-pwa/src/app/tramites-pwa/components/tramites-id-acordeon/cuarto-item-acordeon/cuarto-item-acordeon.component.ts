import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { TramitesPorIdService } from 'src/app/tramites-pwa/services/tramites-por-id-service/tramites-por-id.service';

@Component({
  selector: 'app-cuarto-item-acordeon',
  templateUrl: './cuarto-item-acordeon.component.html',
  styleUrls: ['./cuarto-item-acordeon.component.scss']
})
export class CuartoItemAcordeonComponent implements OnInit {
  @Input() dataAcordeon: any;
  canalesMedios:any = []

  constructor(
    protected fichaTramiteService: TramitesPorIdService
  ) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.dataAcordeon.currentValue != undefined) {
      this.dataAcordeon = changes.dataAcordeon.currentValue;
      this.getMediosSeguimientoNoPersonal(this.dataAcordeon)
    }
  }

  getMediosSeguimientoNoPersonal(dataAcordeon:any) {
    this.fichaTramiteService.GetMediosSeguimientoNoPersonal(dataAcordeon.idTramite)
    .subscribe(
      (data) => {
        this.canalesMedios = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }

}
