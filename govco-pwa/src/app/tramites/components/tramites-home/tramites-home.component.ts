import { Component, OnInit } from '@angular/core';
import { Router, RoutesRecognized } from '@angular/router';
import { filter, pairwise } from 'rxjs/operators';
import { AppService } from '../../../app.service';
import { BottomMenuService } from '../../../transversales/services/bottom-menu/bottom-menu.service';

@Component({
  selector: 'app-tramites-home',
  templateUrl: './tramites-home.component.html',
  styleUrls: ['./tramites-home.component.css']
})
export class TramitesHomeComponent implements OnInit {

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
