import { Component, OnInit } from '@angular/core';
import { BottomMenuService } from 'src/app/transversales/services/bottom-menu/bottom-menu.service';
import { HeaderService } from 'src/app/transversales/services/header-service/header.service';
import { SidenavService } from 'src/app/transversales/services/sidenav-service/sidenav-service.service';
import { PerfilService } from '../../../transversales/services/perfil/perfil.service';


@Component({
  selector: 'app-perfil-home',
  templateUrl: './perfil-home.component.html',
  styleUrls: ['./perfil-home.component.css']
})
export class PerfilHomeComponent implements OnInit {

  userData : any;
  userName : string;

  constructor(
    protected servicioHeader: HeaderService,
    public bottomService: BottomMenuService,
    protected servicioSideNav: SidenavService,
    public perfilService: PerfilService
  ) { }

  ngOnInit() {
    this.servicioHeader.estadoHeader(false, true);
    this.bottomService.seleccionandoItem(2)
    this.bottomService.ajustandoPantalla(false);
    this.servicioSideNav.seleccionandoItem(false, 'null');

    this.userData = this.perfilService.checkLoginUser()
    this.userData = JSON.parse(this.userData)
    if (this.userData){
      let name = this.userData.PrimerNombre.charAt(0) + this.userData.PrimerNombre.slice(1).toLowerCase();
      let surname = this.userData.PrimerApellido.charAt(0) + this.userData.PrimerApellido.slice(1).toLowerCase();
      this.userName = name + ' ' + surname
    }
  }

}
