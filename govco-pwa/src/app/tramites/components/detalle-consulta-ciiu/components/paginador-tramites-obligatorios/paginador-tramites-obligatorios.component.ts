import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';

//Models
import { CIIUTramite } from '../../../../models/ciiutramite';
import { PageRequestTramite } from '../../../../models/page-request-tramite';
import { PreguntaTramite } from '../../../../models/pregunta-tramite';
import { CodigoCIIU } from '../../../../models/codigo-ciiu'

//Service
import { BackendApiService } from '../../../../services/backend-api.service';

@Component({
  selector: 'app-paginador-tramites-obligatorios',
  templateUrl: './paginador-tramites-obligatorios.component.html',
  styleUrls: ['./paginador-tramites-obligatorios.component.scss']
})
export class PaginadorTramitesObligatoriosComponent implements OnInit {

  @Input() idCodigo:number;
  @Input() idMunicipio:string;
  @Input() idDepartamento:string;
  @Input() page:number;
  @Input() pageSize:number;
  request: PageRequestTramite;
  Obligatorios: CIIUTramite[];
  Condicionados: PreguntaTramite[];
  preguntasLng: number;
  url:Observable<string>;
  codigoCiiuT: CodigoCIIU;

  constructor(private service: BackendApiService,) { }

  ngOnInit (): void {
    let objeto = new PageRequestTramite();
    objeto.IdCIIU = this.idCodigo;
    objeto.IdDepartamento = this.idDepartamento;
    objeto.IdMunicipio = this.idMunicipio;
    objeto.pagina = this.page;
    objeto.tamano = this.pageSize;
    this.request = objeto;
    this.cargarObligarotios();
  }

  ngOnChanges(changes: SimpleChanges) {
    // changes.prop contains the old and the new value...
    let objeto = new PageRequestTramite();
    objeto.IdCIIU = this.idCodigo;
    objeto.IdDepartamento = this.idDepartamento;
    objeto.IdMunicipio = this.idMunicipio;
    objeto.pagina = this.page;
    objeto.tamano = this.pageSize;
    this.request = objeto;
    this.cargarObligarotios();
  }

  cargarObligarotios(){
    this.service.obtenerTramitesObligatorios(this.request).subscribe((data:any) => {
      this.Obligatorios = data.data;
    });
  }

}
