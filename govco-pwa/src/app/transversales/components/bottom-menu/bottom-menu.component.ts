import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavigationStart, Event, Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { HeaderService } from '../../services/header-service/header.service';
import { SidenavService } from '../../services/sidenav-service/sidenav-service.service';
import { PerfilService } from '../../services/perfil/perfil.service';
import { BottomMenuService } from '../../services/bottom-menu/bottom-menu.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-bottom-menu',
  templateUrl: './bottom-menu.component.html',
  styleUrls: ['./bottom-menu.component.css']
})
export class BottomMenuComponent implements OnInit, OnDestroy {

  contadorClic: number;
  currentRoute: string;
  userData: any;
  ocultar: boolean = true;

  constructor(
    protected servicioSideNav: SidenavService,
    protected servicioHeader: HeaderService,
    private router: Router,
    public appService: AppService,
    public perfilService: PerfilService,
    private bottomMenuService: BottomMenuService
  ) {
    this.userData = perfilService.checkLoginUser()
    this.currentRoute = "";
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        // preguntar
        if (event.url != '/ficha-tramites-y-servicios/codigos-ciiu-y-tramites' && event.url != '/servicios') {
          this.appService.setSelectedServiceOption(0);
        } else if (event.url == '/ficha-tramites-y-servicios/codigos-ciiu-y-tramites') {
          this.appService.setSelectedServiceOption(2);
        }
      }
    })
    this.bottomMenuService.getOcultandoBottomMenu.subscribe(estado => {
      this.ocultar = estado
    })
  }

  loginSubscription: Subscription = this.bottomMenuService.LoginNotifier.subscribe(notified => {
    this.userData = this.perfilService.checkLoginUser()
  });

  ngOnInit() {
    this.contadorClic = 0;

  }


  clickBottomMenu(url: string) {
    if ((document.getElementById('topScroll') as HTMLElement).scrollTop != 0 && window.location.pathname != '/ficha-tramites-y-servicios') {
      if (window.location.pathname != url) {
        url = url == '/' ? window.location.pathname : url;
      } else {
        url = url
      }
    }
    if (window.location.pathname != url) {
      this.router.navigateByUrl(url);
    }
    else {
      if ((document.getElementById('topScroll') as HTMLElement).scrollTop > 10) {
        (document.getElementById('topScroll') as HTMLElement).scrollTop = 0;
      } else {
        this.router.navigateByUrl(url);
      }
    }
  }

  ngOnDestroy() {
    this.loginSubscription.unsubscribe();
  }
}
