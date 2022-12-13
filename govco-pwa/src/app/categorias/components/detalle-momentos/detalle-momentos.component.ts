import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriasService } from '../../services/categorias.service';
import { BottomMenuService } from 'src/app/transversales/services/bottom-menu/bottom-menu.service';
import { HeaderService } from 'src/app/transversales/services/header-service/header.service';
import { SidenavService } from 'src/app/transversales/services/sidenav-service/sidenav-service.service';
import { urlsLocal } from 'src/variables-globales/urlsLocal';

@Component({
  selector: 'app-detalle-momentos',
  templateUrl: './detalle-momentos.component.html',
  styleUrls: ['./detalle-momentos.component.css']
})
export class DetalleMomentosComponent implements OnInit, AfterViewInit {

  categoria!: any;
  idRecurso: string;

  nombreTramite: string;
  itemCategoriaSeleccionada: string;
  estadoCargaActualidad: boolean = false;
  estadoCargaBuscador: boolean = false;



  constructor(
    protected categoriasService: CategoriasService,
    private activatedRouter: ActivatedRoute,
    protected servicioSideNav: SidenavService,
    protected servicioHeader: HeaderService,
    public bottomService: BottomMenuService,
    protected router: Router
  ) {
    this.bottomService.putOcultandoBottomMenu(false);

  }

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
    this.bottomService.seleccionandoItem(0);
    this.bottomService.ajustandoPantalla(false);
    this.servicioSideNav.seleccionandoItem(false, 'null');
    (document.getElementById('topScroll') as HTMLElement).style.top = '3.5rem';
    (document.getElementById('topScroll') as HTMLElement).scrollTop = 0;

    this.activatedRouter.url.subscribe(() => {
      this.idRecurso = String(this.activatedRouter.snapshot.paramMap.get('id'));
      this.estadoCargaActualidad = true;
      this.estadoCargaBuscador = true;
    });

    this.categoriasService.getCategoriasPorId(this.idRecurso).subscribe(data => {
      this.categoria = data;
      this.nombreTramite = this.categoria.nombre;
      this.itemCategoriaSeleccionada = this.categoria.item;
    }
    );

    window.scroll(0, 0)
  }

  // Esta seccion es provisional pues realiza un cambio de href por router.navigate para la webcomponent
  // govco-buscador-detalle-momentos. Esto permite que la navegación sea fluido y no cargue o se actualice
  // inncesariamente.
  ngAfterViewInit(): void {
    setTimeout(() => {
      var etiquetas_a: Array<HTMLElement> = Array.from(document.getElementsByTagName('a') as HTMLCollectionOf<HTMLElement>);
      let get_href: string = '';
      etiquetas_a.forEach((a) => {
        get_href = String(a.getAttribute('href'));
        if (get_href.indexOf(urlsLocal.fichaTramiteId) >= 0) {
          const id = get_href.replace(/[^0-9]+/g, "");
          a.addEventListener('click', () => {
            this.router.navigate([urlsLocal.fichaTramiteId + id]);
          });
          a.removeAttribute('href');
          a.removeAttribute('target');
        }
      })
      var verMasNoticias: HTMLElement = document.querySelector('.btn.btn-round.link-see-more') as HTMLElement;
      verMasNoticias.addEventListener('click', () => {
        this.router.navigate([urlsLocal.noticias]);
      });
      verMasNoticias.removeAttribute('href');
      verMasNoticias.removeAttribute('target');
    }, 1500);

  }

}
