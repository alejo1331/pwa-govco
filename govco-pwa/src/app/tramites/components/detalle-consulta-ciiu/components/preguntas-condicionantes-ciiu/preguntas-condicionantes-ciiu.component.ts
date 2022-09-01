import { Component, OnInit, Input } from '@angular/core';

import { NgbAccordionConfig} from '@ng-bootstrap/ng-bootstrap';
import { PreguntaTramite } from '../../../../models/pregunta-tramite';

@Component({
  selector: 'app-preguntas-condicionantes-ciiu',
  templateUrl: './preguntas-condicionantes-ciiu.component.html',
  styleUrls: ['./preguntas-condicionantes-ciiu.component.scss'],
  styles: [`
    .card.card-body {
      background-color: #F6F8F9;
    }
  `]
})
export class PreguntasCondicionantesCiiuComponent implements OnInit {

  @Input() tramitePregunta: PreguntaTramite;

  constructor( config: NgbAccordionConfig ) { 
    config.type = 'white';
  }

  ngOnInit(): void {
  }

  isIE() {
    const ua = navigator.userAgent;
    const isIe = ua.indexOf('MSIE ') > -1 || ua.indexOf('Trident/') > -1;
    return isIe;
  }

  beforeChange(event: any) {
    const id = 'title-' + event.nextId;
    document.getElementById(id)!.click();
  }

}
