import { Component, OnInit } from '@angular/core';
import { HeaderService } from 'src/app/transversales/services/header-service/header.service';
import { SidenavService } from 'src/app/transversales/services/sidenav-service/sidenav-service.service';

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.css']
})
export class NoticiasComponent implements OnInit {

  constructor(
    protected servicioSideNav: SidenavService,
    protected servicioHeader: HeaderService
  ) { }

  ngOnInit(): void {
    this.servicioHeader.estadoHeader(true, true);
    this.servicioSideNav.seleccionandoItem(true,'noticias');
  }

}
