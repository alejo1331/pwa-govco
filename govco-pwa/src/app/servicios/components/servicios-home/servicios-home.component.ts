import { Component, OnInit } from '@angular/core';
import { AppService } from '../../../app.service';
import { Router, RoutesRecognized } from '@angular/router';
import { BottomMenuService } from '../../../transversales/services/bottom-menu/bottom-menu.service';

@Component({
  selector: 'app-servicios-home',
  templateUrl: './servicios-home.component.html',
  styleUrls: ['./servicios-home.component.css']
})
export class ServiciosHomeComponent implements OnInit {

  anteriorUrl:any

  constructor(
    public router: Router,
    appService : AppService,
    public bottomService : BottomMenuService
  ) {
    this.anteriorUrl = appService.currentUrl
   }

  ngOnInit() {
  }

  backUrl(){
    this.bottomService.quitarActive()
  }

}
