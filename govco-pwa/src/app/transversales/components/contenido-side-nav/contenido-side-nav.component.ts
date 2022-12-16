import { Component, OnInit, AfterViewInit, Output, EventEmitter, HostListener } from '@angular/core';
import { BottomMenuService } from '../../services/bottom-menu/bottom-menu.service';
import { HeaderService } from '../../services/header-service/header.service';
import { SidenavService } from '../../services/sidenav-service/sidenav-service.service';

const ENTER_KEY_CODE = 13;

@Component({
  selector: 'app-contenido-side-nav',
  templateUrl: './contenido-side-nav.component.html',
  styleUrls: ['./contenido-side-nav.component.css']
})
export class ContenidoSideNavComponent implements OnInit, AfterViewInit {

  @Output() outEstadoMenu = new EventEmitter<boolean>();
  estadoMenu: boolean = false;
  navigation_items_elms: any;

  selectedIcon = 'outlined';

  constructor(
    private sidenav: SidenavService,
    protected servicioHeader: HeaderService,
    public bottomService: BottomMenuService
  ) { }

  ngOnInit() {
    this.bottomService.seleccionandoItem(0);

    this.navigation_items_elms = document.querySelectorAll(".govco-pwa-sidenav-item")

    this.sidenav.modificandoItem.subscribe(([estado,idTem]) => {
      switch (estado) {
        case true:
          this.desactivarItem();
          document.getElementById(idTem)?.classList.add("active");
          break;
        case false:
          this.desactivarItem();
          break;
      }
    })
  }

  desactivarItem(){
    this.navigation_items_elms.forEach((itm: any) => {
      if (itm.classList.contains("active")) {
        itm.classList.remove("active");
      }
    });
  }

  ngAfterViewInit() {
    this.navigation_items_elms.forEach((item: any, index: any) => {
      item.addEventListener("click", (e: any) => {
        e.preventDefault();
        this.desactivarItem();
        item.classList.add("active");
        setTimeout(() => {
          this.sidenav.cerrar();
        }, 600);
      });

      item.addEventListener("keydown", (e: any) => {
        if (e.keyCode == ENTER_KEY_CODE) {
          item.click();
        }
      });
    })
  }

  @HostListener('click') onClick() {
    this.bottomService.seleccionandoItem(0);
  }
}
