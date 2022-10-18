import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-tramites-id-acordeon',
  templateUrl: './tramites-id-acordeon.component.html',
  styleUrls: ['./tramites-id-acordeon.component.scss']
})
export class TramitesIdAcordeonComponent implements OnInit {
  @Input() dataAcordeon: { perfil: string, idTramite: number };
  @Input() tramiteEnLinea: boolean;
  @Input() urlManualEnlinea : String;

  constructor() { }

  ngOnInit(): void { }

  activarItem(index:number) {
    const elements = document.querySelectorAll('#acordeonPerfilTramites > .card');
    elements.forEach((element, indexItem) => {
      if (index == indexItem && !element.classList.contains('active')) {
        element.classList.add('active');
      } else {
        element.classList.remove('active');
      }
    });
  }
}
