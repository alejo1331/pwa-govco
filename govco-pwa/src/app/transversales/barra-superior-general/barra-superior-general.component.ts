import { Component, OnInit,ViewChild } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { MatSidenav, MatSidenavContent } from '@angular/material/sidenav';

@Component({
  selector: 'app-barra-superior-general',
  templateUrl: './barra-superior-general.component.html',
  styleUrls: ['./barra-superior-general.component.css'],
  animations: [
    trigger('efectoHamburguesaX', [
      state('hamburgesa', style({})),
      state(
        'linea-superior',
        style({
          transform: 'rotate(45deg)',
          transformOrigin: 'left',
          margin: '6px',
        })
      ),
      state(
        'linea-medio',
        style({
          opacity: 0,
        })
      ),
      state(
        'linea-inferior',
        style({
          transform: 'rotate(-45deg)',
          transformOrigin: 'left',
          margin: '6px',
        })
      ),
      transition('* => *', [
        animate('0.2s'),
      ]),
    ]),
  ],
  host: {
    '(document:click)': 'onClick($event)',
}
})
export class BarraSuperiorGeneralComponent implements OnInit {
  
  title = 'govco-pwa';

  @ViewChild(MatSidenav) sidenav!: MatSidenav;
  @ViewChild(MatSidenavContent ) sidenavcontent!: MatSidenavContent;

  constructor() { }

  ngOnInit(): void {
  }

  esHamburguesa = true;
  onClick() {

    if (this.sidenav.opened && this.esHamburguesa==false){
      this.esHamburguesa = false;

    }
    else{
      this.esHamburguesa = !this.esHamburguesa;
    }
  }

}
