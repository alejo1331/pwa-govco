import { Component, OnInit } from '@angular/core';
import { BottomMenuService } from 'src/app/transversales/services/bottom-menu/bottom-menu.service';
import { HeaderService } from 'src/app/transversales/services/header-service/header.service';
import { SidenavService } from 'src/app/transversales/services/sidenav-service/sidenav-service.service';

@Component({
  selector: 'app-puntos-de-atencion',
  templateUrl: './puntos-de-atencion.component.html',
  styleUrls: ['./puntos-de-atencion.component.scss']
})
export class PuntosDeAtencionComponent implements OnInit {

  public items = [
    {
      active: false,
      titulo: 'Fondo de desarrollo de la Educación Superior',
      descripcion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam gravida.'
    },
    {
      active: false,
      titulo: 'Fondo de desarrollo de la Educación Superior de Arauca',
      descripcion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam gravida.'
    },
    {
      active: false,
      titulo: 'Fondo de desarrollo de la Educación Superior',
      descripcion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam gravida.'
    },
    {
      active: false,
      titulo: 'Fondo de desarrollo de la Educación Superior',
      descripcion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam gravida.'
    },
    {
      active: false,
      titulo: 'Fondo de desarrollo de la Educación Superior',
      descripcion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam gravida.'
    }
  ]

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

  cerrarPuntoAtencion() {

  }

  activarItem(index: number) {
    this.items[index].active = !this.items[index].active;
    this.items.forEach(function (item, indexItem) {
      if (indexItem != index) {
        item.active = false;
      }
    });
  }

}
