import { Component, ViewChild } from '@angular/core';
import { MatSidenav, MatSidenavContent } from '@angular/material/sidenav';
import { trigger, state, style, animate, transition } from '@angular/animations';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
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


export class AppComponent {
  title = 'govco-pwa';

  @ViewChild(MatSidenav) sidenav!: MatSidenav;
  @ViewChild(MatSidenavContent ) sidenavcontent!: MatSidenavContent;

  constructor(){
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
