import { Component, OnInit, Input } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

//Services
import { BackendApiService } from '../../../services/backend-api.service';

//Models
import { CodigoCIIU } from '../../../models/codigo-ciiu';
import { PageRequestTramite } from '../../../models/page-request-tramite';

@Component({
  selector: 'app-modal-ver-nota',
  templateUrl: './modal-ver-nota.component.html',
  styleUrls: ['./modal-ver-nota.component.scss']
})
export class ModalVerNotaComponent implements OnInit {


  Codigo: CodigoCIIU;
  incluye: string[];
  excluye: string[];
  closeResult = '';
  
  @Input() codigo: string;
  @Input() tieneTramites: boolean;
  @Input() IdCodigo: number;
  @Input() DepartamentoSeleccionado: string;
  @Input() MunicipioSeleccioando: string;

  request: PageRequestTramite;
  public habilitar: boolean;
  public url: any;
  public titulo: string;

  constructor( private modalService: NgbModal, private service: BackendApiService ) { 
    this.url = "/ficha-tramites-y-servicios/detalle-consulta-ciiu";
    this.titulo= "Detalle consulta CIIU";
  }

  ngOnInit(): void {
  }

  open(content: any, Id: any) {
    this.modalService.open(content, {size: 'lg', centered: true}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });

    this.CargarCodigoCIIU(Id);
  }

  openLg(content:any) {
    this.modalService.open(content, { size: 'lg' });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  CargarCodigoCIIU(Id: number){
    this.service.getCodigoCIIU(Id).subscribe(data => {
      this.Codigo = data;
      this.incluye = this.Codigo.incluye.split("*");
      if(this.incluye.length > 1){
        this.incluye.shift();
      }
      else{
        this.incluye = this.Codigo.incluye.split("•");
        this.incluye.shift();
      }
      this.excluye = this.Codigo.excluye.split("*");
      if(this.excluye.length > 1){
        this.excluye.shift();
      }
      else{
        this.excluye = this.Codigo.excluye.split("•");
        this.excluye.shift();
      }
    });
  }

}
