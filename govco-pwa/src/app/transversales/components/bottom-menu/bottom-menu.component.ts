import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
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
export class BottomMenuComponent implements OnInit, AfterViewInit, OnDestroy {

  contadorClic: number;
  currentRoute: string;
  userData : any;

  constructor(
    protected servicioSideNav: SidenavService,
    protected servicioHeader: HeaderService,
    private router: Router,
    public appService : AppService,
    public perfilService : PerfilService,
    private bottomMenuService : BottomMenuService
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
  }

  loginSubscription: Subscription = this.bottomMenuService.LoginNotifier.subscribe(notified => {
    this.userData = this.perfilService.checkLoginUser()
  });

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

  ngOnDestroy() {
    this.loginSubscription.unsubscribe();
  }
}
