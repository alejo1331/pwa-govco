import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SidenavService } from '../../services/sidenav-service/sidenav-service.service';

@Component({
  selector: 'app-contenido-side-nav',
  templateUrl: './contenido-side-nav.component.html',
  styleUrls: ['./contenido-side-nav.component.css']
})
export class ContenidoSideNavComponent implements OnInit {

  @Output() outEstadoMenu = new EventEmitter<boolean>();
  estadoMenu: boolean = false;

  selectedIcon = 'outlined';

  constructor(
    private sidenav: SidenavService
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit() {

    const navigation_items_elms : any = document.querySelectorAll(".govco-pwa-sidenav-item");

    navigation_items_elms.forEach((item:any, index:any) => {
      item.addEventListener("click", (e:any) => {
        e.preventDefault();
        navigation_items_elms.forEach((itm:any) => {
          if (itm.classList.contains("active")){
            itm.classList.remove("active");
          }
        });
        item.classList.add("active");
          setTimeout(() => {
            this.sidenav.cerrar();
          }, 600);
      })
    })
  }
}
