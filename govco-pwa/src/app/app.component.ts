import { Component, ViewChild } from '@angular/core';
import { MatSidenav, MatSidenavContent } from '@angular/material/sidenav';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
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

  onClick() {
    if (this.sidenav.opened){


    }
  }
}
