import { AfterViewInit, Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BottomMenuService } from 'src/app/transversales/services/bottom-menu/bottom-menu.service';
import { HeaderService } from 'src/app/transversales/services/header-service/header.service';
import { SidenavService } from 'src/app/transversales/services/sidenav-service/sidenav-service.service';
import { CategoriasInterface } from '../../models/categorias-interface';
import { CategoriasService } from '../../services/categorias.service';

@Component({
  selector: 'app-momentos-de-vida',
  templateUrl: './momentos-de-vida.component.html',
  styleUrls: ['./momentos-de-vida.component.css']
})
export class MomentosDeVidaComponent implements OnInit, AfterViewInit {

  categorias: CategoriasInterface[] = [];
  show: number = this.numeroTarjetas();
  focusCard: number = this.numeroTarjetas();
  nameButton: boolean = true;
  focus: boolean = true;
  nombreBoton: string = 'Ver más momentos de vida';


  constructor(
    protected categoriasService: CategoriasService,
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
    (document.getElementById('topScroll') as HTMLElement).style.top = '3.5rem';
    (document.getElementById('topScroll') as HTMLElement).scrollTop = 0;

    this.servicioSideNav.seleccionandoItem(true, 'null');

    this.listarCategorias();

    window.addEventListener('resize', () => {
      if (!this.isMobile()) {
        this.show = this.numeroTarjetas();
        this.eventoFocus();

        if (this.esResponsive()) {
          this.nombreBoton = "Ver más momentos de vida";
          this.nameButton = true;
        }
      }
    })
  }

  // Función que trae la data desde el servicio
  listarCategorias() {
    this.categoriasService.getCategorias()
      .subscribe((resp: any) => {
        this.categorias = resp.data;
      })

  }

  salir(evento: any) {
    try {
      if (evento.key === 'Escape') {
        document.getElementById('salir-categorias')?.focus()
      }
    } catch (error) {
      console.error(error)
    }

  }

  cambiarNombreBoton() {
    if (this.nameButton) {
      this.nombreBoton = 'Ver menos momentos de vida'
    } else {
      this.nombreBoton = 'Ver más momentos de vida'
    }
  }

  // Funcion que controla el botón de ver más categorias
  mostrarCategorias() {
    try {
      if (this.nameButton) {
        this.focusCard = this.show;
        this.show = this.categorias.length;
        this.eventoFocus();
        this.cambiarNombreBoton();
        this.nameButton = false;
      } else if (!this.nameButton) {
        this.show = this.numeroTarjetas();
        this.eventoFocus();
        this.cambiarNombreBoton();
        this.nameButton = true;
      }
    } catch (error) {
      console.error(error)
    }
  }

  eventoFocus() {
    try {
      setTimeout(() => {
        if (this.focus) {
          document.getElementById('categorias_' + this.focusCard)?.focus();

        } else {
          document.getElementById('categorias_0')?.focus();

        }
        this.focus = !this.focus;
      }, 100);

    } catch (error) {
      console.error(error)
    }

  }

  // Función que administra el número de cards a mostrar de acuerdo al tamaño de la pantalla
  numeroTarjetas() {
    if (window.matchMedia("(max-width: 576px)").matches || window.matchMedia("(max-width: 768px)").matches) {
      return 4;
    } else if (window.matchMedia("(max-width: 960px)").matches) {
      return 6;
    } else if (window.matchMedia("(max-width: 1440px)").matches) {
      return 12;
    } else {
      return 12;
    }
  }

  esResponsive() {
    if (window.matchMedia("(max-width: 960px)").matches) {
      return true;
    }
    return false;
  }

  isMobile() {
    return (
      (navigator.userAgent.match(/Android/i)) ||
      (navigator.userAgent.match(/webOS/i)) ||
      (navigator.userAgent.match(/iPhone/i)) ||
      (navigator.userAgent.match(/iPod/i)) ||
      (navigator.userAgent.match(/iPad/i)) ||
      (navigator.userAgent.match(/BlackBerry/i))
    );
  }

  mostrarBoton() {
    if (this.categorias.length >= 12) {
      return true
    } else if (this.esResponsive()) {
      if (this.categorias.length >= 5) {
        return true
      } else return false
    } else return false
  }

  @HostListener('click', ['$event']) onClick(event: Event) {
    const seccionCiuu = (document.getElementsByClassName('enlace-ciiu') as HTMLCollectionOf<HTMLElement>)[0];
    if (seccionCiuu) {
      let clicSeccionCiuu = (seccionCiuu.getElementsByTagName('a'))[0];
      clicSeccionCiuu.target = "_self"
      clicSeccionCiuu.href = '/ficha-tramites-y-servicios/codigos-ciiu-y-tramites';
    }
  }

  // Esta seccion es provisional pues realiza un cambio de href por router.navigate para la webcomponent
  // seccion-actualidad. Esto permite que la navegación sea fluido y no cargue o se actualice
  // inncesariamente.
  ngAfterViewInit(): void {
    setTimeout(() => {
      let buscadorNoticias = (document.querySelectorAll("[href='/noticias/']") as NodeListOf<HTMLElement>);
      buscadorNoticias.forEach((etiqueta_a) => {
        etiqueta_a.addEventListener('click', () => {
          this.router.navigate(['/noticias']);
        });
        etiqueta_a.removeAttribute('href');
      });
    }, 1500);
  }

}
