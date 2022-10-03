import { Component, OnInit } from '@angular/core';
import { BottomMenuService } from 'src/app/transversales/services/bottom-menu/bottom-menu.service';
import { HeaderService } from 'src/app/transversales/services/header-service/header.service';
import { SidenavService } from 'src/app/transversales/services/sidenav-service/sidenav-service.service';

@Component({
  selector: 'app-puntos-de-atencion',
  templateUrl: './puntos-de-atencion.component.html',
  styleUrls: ['./puntos-de-atencion.component.css']
})
export class PuntosDeAtencionComponent implements OnInit {

  constructor(
    protected servicioSideNav: SidenavService,
    protected servicioHeader: HeaderService,
    public bottomService: BottomMenuService,
  ) { }

  ngOnInit(): void {
    this.servicioHeader.estadoHeader(false, false);
    this.bottomService.putOcultandoBottomMenu(true);
    this.servicioSideNav.seleccionandoItem(false, 'null');
    this.bottomService.ajustandoPantalla(false);
    const contenedorTopScroll = (document.getElementById('topScroll') as HTMLElement);
    contenedorTopScroll.style.top = '0';
    contenedorTopScroll.style.height = '100%';
    contenedorTopScroll.scrollTop = 0;
  }

  cerrarPuntoAtencion(){
    
  }

}
