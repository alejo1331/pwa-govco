import { Component, OnInit } from '@angular/core';
import { BottomMenuService } from '../../services/bottom-menu/bottom-menu.service';
import { HeaderService } from '../../services/header-service/header.service';
import { SidenavService } from '../../services/sidenav-service/sidenav-service.service';
import { ServiciosService } from '../../services/servicios/servicios.service'

@Component({
  selector: 'app-servicios-para-entidades',
  templateUrl: './servicios-para-entidades.component.html',
  styleUrls: ['./servicios-para-entidades.component.scss'],
})
export class ServiciosParaEntidadesComponent implements OnInit {

  loadData: boolean;
  title: string;
  description: string;
  codigo: string = 'paraentidades'

  constructor(private serviciosService: ServiciosService,
    protected servicioSideNav: SidenavService,
    protected servicioHeader: HeaderService,
    public bottomService: BottomMenuService) {
  }

  ngOnInit() {
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
    this.bottomService.seleccionandoItem(0);
    this.servicioSideNav.seleccionandoItem(true,'serviciosEntidades');
    this.bottomService.ajustandoPantalla(false);
    
    this.serviciosService.getTitleAndDescription(this.codigo)
      .subscribe((resp) => {
        this.title = resp.data.titulo;
        this.description = resp.data.descripcion;
        this.loadData = true;
      })
  }

  salir(evento: any){
    try {
      if(evento.key === 'Escape'){
        document.getElementById('salir-seccion-hacer')?.focus()
      }
    } catch (error) {
      console.error(error)
    }
  }

}
