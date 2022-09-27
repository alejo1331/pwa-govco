import { Component, OnInit } from '@angular/core';
import { BottomMenuService } from 'src/app/transversales/services/bottom-menu/bottom-menu.service';
import { HeaderService } from 'src/app/transversales/services/header-service/header.service';
import { ServiciosService } from 'src/app/transversales/services/servicios/servicios.service';
import { SidenavService } from 'src/app/transversales/services/sidenav-service/sidenav-service.service';
import { environment } from "src/environments/environment";

@Component({
  selector: 'app-codigos-ciiu-y-tramites',
  templateUrl: './codigos-ciiu-y-tramites.component.html',
  styleUrls: ['./codigos-ciiu-y-tramites.component.scss']
})
export class CodigosCiiuYTramitesComponent implements OnInit {

  Codigo: string = environment.codSobreNosotros;
  description: string = 'Esta consulta le permite identificar los trámites asociados a la actividad económica CIIU de su empresa o emprendimiento.';
  title: string = 'Codigo CIIU';
  title2: string = 'Consulta de trámites por actividad económica - CIIU';

  constructor(
    protected servicioHeader: HeaderService,
    public bottomService: BottomMenuService,
    protected servicioSideNav: SidenavService,
    private serviciosService: ServiciosService
    ) { }

  ngOnInit(): void {
    // servicioHeader.estadoHeader(a, b)       a -> true = header seccion internas
    //                                         a -> false = header general
    //                                         b -> Muestra/Oculta  Header
    //bottomService.seleccionandoItem(0)       0 -> Activa boton incio del menu inferior
    //                                         1, 2, 3 -> Tramites, Ingresa
    //servicioSideNav.seleccionandoItem(a, b)  a -> Activa o inactiva menu lateral
    //                                         b -> String con el valor del item a seleccionar
    //bottomService.ajustandoPantalla(true)    true -> Agrega clase de css para ajustar 
    //                                                 la pantalla cuando en la seccion  
    //                                                 consultada no tiene header
    this.servicioHeader.estadoHeader(true, true);
    this.bottomService.putOcultandoBottomMenu(false);
    this.bottomService.seleccionandoItem(3);
    this.bottomService.ajustandoPantalla(false);
    this.servicioSideNav.seleccionandoItem(false,'null');
    (document.getElementById('topScroll') as HTMLElement).style.top = '3.5rem';
    (document.getElementById('topScroll') as HTMLElement).scrollTop = 0;

    this.serviciosService.getTitleAndDescription("Consulta CIIU")
      .subscribe((resp) => {
        this.title = resp.data.titulo;
        this.description = resp.data.descripcion;
      })
  }

}
