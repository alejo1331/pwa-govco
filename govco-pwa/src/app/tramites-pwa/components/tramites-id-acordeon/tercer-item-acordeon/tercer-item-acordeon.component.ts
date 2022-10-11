import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { TramitesPorIdService } from 'src/app/tramites-pwa/services/tramites-por-id-service/tramites-por-id.service';

@Component({
  selector: 'app-tercer-item-acordeon',
  templateUrl: './tercer-item-acordeon.component.html',
  styleUrls: ['./tercer-item-acordeon.component.scss']
})
export class TercerItemAcordeonComponent implements OnInit {
  @Input() dataAcordeon: any;
  canalesSeguimiento: any[];

  constructor(
    protected fichaTramiteService: TramitesPorIdService
  ) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.dataAcordeon.currentValue != undefined) {
      this.dataAcordeon = changes.dataAcordeon.currentValue;
      this.getMediosSeguimiento(this.dataAcordeon)
    }
  }

  getMediosSeguimiento(dataAcordeon:any) {
    this.fichaTramiteService.GetMediosSeguimiento(dataAcordeon.idTramite)
    .subscribe(
      (data) => {
        this.canalesSeguimiento = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
