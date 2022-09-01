import { Component, Input, OnInit } from '@angular/core';
import { FichaTramiteService } from 'src/app/tramites/services/ficha-tramite.service';

@Component({
  selector: 'app-fichaespecifica-resultado',
  templateUrl: './fichaespecifica-resultado.component.html',
  styleUrls: ['./fichaespecifica-resultado.component.scss']
})
export class FichaespecificaResultadoComponent implements OnInit {
  @Input() itemid: number;
  @Input() infoTramite: any;
  canalesSeguimiento: any[];
  canalesMedios: any[];
  resultado: any;
  dataTutoriales: any;

  constructor(
    private fichaTramiteService: FichaTramiteService
  ) { }

  ngOnInit(): void {
    this.getDataFichaResult(this.itemid);
    this.getMediosSeguimiento(this.itemid);
    this.getMediosSeguimientoNoPersonal(this.itemid);

    this.fichaTramiteService.GetTipoTramiteFichaEspecificaById(this.itemid)
      .subscribe((data) => {
        this.dataTutoriales = data;
    })
  }

  getMediosSeguimiento(tramiteid: number) {
    this.fichaTramiteService.GetMediosSeguimiento(tramiteid)
    .subscribe(
      (data) => { // Success
        this.canalesSeguimiento = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  getMediosSeguimientoNoPersonal(tramiteid: number) {
    this.fichaTramiteService.GetMediosSeguimientoNoPersonal(tramiteid)
    .subscribe(
      (data) => { // Success
        this.canalesMedios = data;
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

}
