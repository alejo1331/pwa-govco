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

  status: boolean = false;
  renderer: any;

  onClickMenu(){
    this.outEstadoMenu.emit(this.estadoMenu);
  }
cambioIconos(event: any) {
  var element_target = event.target.offsetParent.getElementsByClassName("material-icons-outlined")[0].classList;
  const hasClass = element_target[0] == 'material-icons-outlined'
  if(hasClass) {
    element_target.add('material-icons');
    element_target.remove('material-icons-outlined');
    setTimeout(() => {
      this.sidenav.cerrar();
      element_target.add('material-icons-outlined');
      element_target.add('material-icons');}, 1000);

  } else {
    element_target.add('material-icons-outlined');
    element_target.add('material-icons');
  }
}
}
