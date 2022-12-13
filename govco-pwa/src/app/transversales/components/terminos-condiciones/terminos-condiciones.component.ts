import { AfterContentInit, Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { interval } from 'rxjs';
import { take } from 'rxjs/operators';
import { TerminosCondicionesModel } from '../../models/terminos-condiciones/terminos-condiciones.model';
import { BottomMenuService } from '../../services/bottom-menu/bottom-menu.service';
import { HeaderService } from '../../services/header-service/header.service';
import { SidenavService } from '../../services/sidenav-service/sidenav-service.service';
import { TerminosCondicionesService } from '../../services/terminos-condiciones/terminos-condiciones.service';


@Component({
  selector: 'app-terminos-condiciones',
  templateUrl: './terminos-condiciones.component.html',
  styleUrls: ['./terminos-condiciones.component.scss']
})
export class TerminosCondicionesComponent implements OnInit, AfterContentInit {

  terminosCondiciones: TerminosCondicionesModel;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private terminosCondicionesService: TerminosCondicionesService,
    private sanitizer: DomSanitizer,
    protected servicioSideNav: SidenavService,
    protected servicioHeader: HeaderService,
    public bottomService: BottomMenuService
  ) { }
  ngAfterContentInit(): void {
    this.terminosCondicionesService.getTerminosCondiciones()
      .subscribe((data: TerminosCondicionesModel) => {
        this.terminosCondiciones = data;
        this.terminosCondiciones.terminosCondiciones = this.sanitizer.bypassSecurityTrustHtml(this.terminosCondiciones.terminosCondiciones);

        this.route.queryParams.subscribe(params => {
          if (params.seccion) {
            this.scroll(params.seccion);
          }
        })
      }, (error) => {
        console.error(error);
      });
  }

  ngOnInit(): void {
    this.servicioHeader.estadoHeader(false, true);
    this.bottomService.seleccionandoItem(0);
    this.servicioSideNav.seleccionandoItem(true, 'acercaPortal');
    this.bottomService.ajustandoPantalla(false);
    (document.getElementById('topScroll') as HTMLElement).style.top = '3.5rem';
    (document.getElementById('topScroll') as HTMLElement).scrollTop = 0;

  }

  scroll(id:any) {
    interval(700).pipe(take(1)).subscribe(d => {
      let el = document.getElementById(id);
      if (el) {
        const rect = el.getBoundingClientRect()
        document.documentElement.scrollTop = document.body.scrollTop = rect.top - 120;
      }
    });
 }
}
