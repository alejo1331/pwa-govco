import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-tramites-id-acordeon',
  templateUrl: './tramites-id-acordeon.component.html',
  styleUrls: ['./tramites-id-acordeon.component.scss']
})
export class TramitesIdAcordeonComponent implements OnInit {
  @Input() dataAcordeon: any;

  constructor() { }

  ngOnInit(): void { }

  activarItem(index:number) {
    console.log('dataAcordeon', this.dataAcordeon)
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
