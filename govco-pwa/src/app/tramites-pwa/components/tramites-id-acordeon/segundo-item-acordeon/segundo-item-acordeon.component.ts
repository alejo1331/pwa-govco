import { Component, Input, SimpleChanges } from '@angular/core';
import { TramitesPorIdService } from 'src/app/tramites-pwa/services/tramites-por-id-service/tramites-por-id.service';

@Component({
  selector: 'app-segundo-item-acordeon',
  templateUrl: './segundo-item-acordeon.component.html',
  styleUrls: ['./segundo-item-acordeon.component.css']
})
export class SegundoItemAcordeonComponent {
  @Input() dataAcordeon: any;
  resultado : any;

  constructor(
    protected fichaTramiteService: TramitesPorIdService
  ) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.dataAcordeon.currentValue != undefined) {
      this.dataAcordeon = changes.dataAcordeon.currentValue;
      this.loadDataFichaResult(this.dataAcordeon)
    }
  }

  private loadDataFichaResult(dataAcordeon:any){
    this.fichaTramiteService.GetDataFichaResult(dataAcordeon.idTramite)
    .subscribe(
      (data) => { // Success
        this.resultado = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }

}
