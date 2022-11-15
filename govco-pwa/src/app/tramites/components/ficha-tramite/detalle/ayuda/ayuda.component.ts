import { Component, Input, OnInit } from '@angular/core';
import { FichaTramiteService } from 'src/app/tramites/services/ficha-tramite.service';

@Component({
  selector: 'app-ayuda',
  templateUrl: './ayuda.component.html',
  styleUrls: ['./ayuda.component.scss']
})
export class AyudaComponent implements OnInit {
  @Input() itemid: number;
  canalesSeguimiento: any[];
  resultado: any;
  infoBasicaTramite: any;
  audiencias: any[];

  constructor(
    private fichaTramiteService: FichaTramiteService,
  ) { }

  ngOnInit(): void {
    this.getDataFichaResult(this.itemid);
    this.getDataContactoDudas(this.itemid);
  }

  getDataContactoDudas(tramiteid: number) {
    this.fichaTramiteService.GetDataContactoDudas(tramiteid)
    .subscribe(
      (data) => { // Success
        this.canalesSeguimiento = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  getDataFichaResult(tramiteid: number) {
    this.fichaTramiteService.GetDataFichaResult(tramiteid)
    .subscribe(
      (data) => { // Success
        this.resultado = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  tabFocus(data: string){
    if ( data != null){
      return 0
    } else {
      return null
    }
  }

}
