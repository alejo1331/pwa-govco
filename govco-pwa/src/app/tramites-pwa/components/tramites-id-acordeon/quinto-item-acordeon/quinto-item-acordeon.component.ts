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

}
