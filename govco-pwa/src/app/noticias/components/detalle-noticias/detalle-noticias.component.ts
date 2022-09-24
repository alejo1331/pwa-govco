import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NoticiasServiceService } from 'src/app/noticias/services/noticias-service/noticias-service.service';
import { NoticiaPublicadaModel } from 'src/app/noticias/models/noticiaPublicadaModel';
import { SidenavService } from 'src/app/transversales/services/sidenav-service/sidenav-service.service';
import { HeaderService } from 'src/app/transversales/services/header-service/header.service';
import { BottomMenuService } from 'src/app/transversales/services/bottom-menu/bottom-menu.service';

@Component({
  selector: 'noticias-govco-detalle-noticias',
  templateUrl: './detalle-noticias.component.html',
  styleUrls: ['./detalle-noticias.component.scss']
})
export class DetalleNoticiasComponent implements OnInit {
  public idRecurso: string ;
  noticiasError: boolean = false;
  loadingInfo: boolean = true;
  noticia: NoticiaPublicadaModel;
  estadoCargaActualidad: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private noticiasService: NoticiasServiceService,
    protected servicioSideNav: SidenavService,
    protected servicioHeader: HeaderService,
    public bottomService: BottomMenuService) { }

  ngOnInit() {
    window.scrollTo(0, 0);
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
    this.bottomService.ajustandoPantalla(false);
    this.servicioSideNav.seleccionandoItem(true, 'noticias');
    (document.getElementById('topScroll') as HTMLElement).style.top = '3.5rem';
    (document.getElementById('topScroll') as HTMLElement).scrollTop = 0;

    this.activatedRoute.url.subscribe(() => {
      this.idRecurso = this.activatedRoute.snapshot.paramMap.get('id')!;
      this.estadoCargaActualidad = true;
      this.obtenerDetalleNoticia();
    });
  }

  obtenerDetalleNoticia() {
    this.noticiasService.obtenerDetalleNoticia(this.idRecurso).subscribe(
      (data: NoticiaPublicadaModel) => {
        this.loadingInfo = false;
        this.noticia = data;
        console.log('this.noticia', this.noticia)
      }
    );
  }


}
