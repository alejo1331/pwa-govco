import { Component, OnInit, Input } from '@angular/core';
import { Tramite } from '../../../../models/tramite';
import { ValidateUrlService } from '../../../../services/validate-url.service';

@Component({
  selector: 'app-tramites-condicionantes-ciiu',
  templateUrl: './tramites-condicionantes-ciiu.component.html',
  styleUrls: ['./tramites-condicionantes-ciiu.component.scss']
})
export class TramitesCondicionantesCiiuComponent implements OnInit {

  @Input() tramite:Tramite;
  constructor(public validateUrlService: ValidateUrlService) { }

  ngOnInit(): void {
  }

}
