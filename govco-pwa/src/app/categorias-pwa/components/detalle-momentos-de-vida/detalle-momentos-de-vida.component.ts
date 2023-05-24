import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BottomMenuService } from 'src/app/transversales/services/bottom-menu/bottom-menu.service';
import { HeaderService } from 'src/app/transversales/services/header-service/header.service';
import { SidenavService } from 'src/app/transversales/services/sidenav-service/sidenav-service.service';

@Component({
  selector: 'app-detalle-momentos-de-vida',
  templateUrl: './detalle-momentos-de-vida.component.html',
  styleUrls: ['./detalle-momentos-de-vida.component.css']
})
export class DetalleMomentosDeVidaComponent implements OnInit {

  constructor(
    private router: Router,
    protected servicioSideNav: SidenavService,
    protected servicioHeader: HeaderService,
    public bottomService: BottomMenuService
  ) { }

  ngOnInit(): void {
    this.servicioHeader.estadoHeader(true, true);
    // this.bottomService.seleccionandoItem(0);
    this.bottomService.desactivarSeleccion();

    this.bottomService.ajustandoPantalla(false);
    (document.getElementById('topScroll') as HTMLElement).style.top = '3.5rem';
    (document.getElementById('topScroll') as HTMLElement).scrollTop = 0;
  }

}