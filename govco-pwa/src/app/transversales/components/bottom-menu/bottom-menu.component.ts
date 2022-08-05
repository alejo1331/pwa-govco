import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { BottomMenuService } from '../../services/bottom-menu/bottom-menu.service';
import { HeaderService } from '../../services/header-service/header.service';
import { SidenavService } from '../../services/sidenav-service/sidenav-service.service';

@Component({
  selector: 'app-bottom-menu',
  templateUrl: './bottom-menu.component.html',
  styleUrls: ['./bottom-menu.component.css']
})
export class BottomMenuComponent implements OnInit, AfterViewInit {

  contadorClic: number;

  constructor(
    public bottomMenu: BottomMenuService,
    protected servicioSideNav: SidenavService,
    protected servicioHeader: HeaderService,
    private router: Router
  ) { }

  ngOnInit() {
    this.contadorClic = 0;
  }

  ngAfterViewInit() {
  }

  clickHome() {
    if (document.querySelector('#topScroll')!.scrollTop > 10) {
      document.querySelector('#topScroll')!.scrollTop = 0;
    } else {
      this.router.navigate(['/']);
    }
  }

  ajustePantalla(){
    this.bottomMenu.ajustandoPantalla(true);
  }
}
