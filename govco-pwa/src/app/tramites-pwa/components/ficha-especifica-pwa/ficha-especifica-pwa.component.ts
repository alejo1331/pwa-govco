import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TramitesPorIdService } from '../../services/tramites-por-id-service/tramites-por-id.service';

@Component({
  selector: 'app-ficha-especifica-pwa',
  templateUrl: './ficha-especifica-pwa.component.html',
  styleUrls: ['./ficha-especifica-pwa.component.scss'],
})
export class FichaEspecificaPwaComponent implements OnInit {

  tramite: { id: string, tipo: string | null, prefijo: string } = { id: '', tipo: null, prefijo: '' };
  embebido = false;
  
  constructor(
    private activatedRoute: ActivatedRoute,
    private tramitesPorIdService: TramitesPorIdService,
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    const parametroid = this.activatedRoute.snapshot.params.id;

    let idTramiteTemp = parametroid;

    if ( parametroid !== 'embebido' ) {
      this.tramite.id = parametroid.substring(1);
      this.tramite.prefijo = parametroid.substring(0, 1).toLowerCase();

      // Tramite suit
      if (this.tramite.prefijo === 't') {
        this.tramitesPorIdService.setTramite(this.tramite);
        idTramiteTemp = this.tramite.id;
      }

      if (idTramiteTemp != null && idTramiteTemp != 'null') {
        this.tramitesPorIdService.GetTipoFichaTramite(idTramiteTemp)
        .subscribe( data => {
          this.tramite.tipo = data.StatusCode;
        });
      }

    } else {
      this.embebido = true;
    }
  }
}
