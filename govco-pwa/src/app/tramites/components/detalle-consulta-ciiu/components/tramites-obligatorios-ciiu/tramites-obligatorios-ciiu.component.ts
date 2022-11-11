import { Component, Input } from '@angular/core';

//Models
import { CIIUTramite } from '../../../../models/ciiutramite';

//services
import { ValidateUrlService } from '../../../../services/validate-url.service';

@Component({
  selector: 'app-tramites-obligatorios-ciiu',
  templateUrl: './tramites-obligatorios-ciiu.component.html',
  styleUrls: ['./tramites-obligatorios-ciiu.component.scss']
})
export class TramitesObligatoriosCiiuComponent  {

  @Input() tramite:CIIUTramite;

  tituloTramite:string;
  entidadDetalle:string;
  descripcionTramite:string;

  constructor(public validateUrlService:ValidateUrlService) {
   }

}
