import { Component, OnInit, AfterViewInit } from '@angular/core';
import { NavigationStart, Event, Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
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
  currentRoute: string;

  constructor(
    public bottomMenu: BottomMenuService,
    protected servicioSideNav: SidenavService,
    protected servicioHeader: HeaderService,
    private router: Router,
    public appService : AppService,
  ) { 
    this.currentRoute = "";
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        if (event.url != '/tramites/codigos' && event.url != '/servicios') {
          this.appService.setSelectedServiceOption(0);
        } else if (event.url == '/tramites/codigos') {
          this.appService.setSelectedServiceOption(2);
        }
      }
    })
  }

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

  ajustePantalla(estado: boolean){
    this.bottomMenu.ajustandoPantalla(estado);
  }
}
