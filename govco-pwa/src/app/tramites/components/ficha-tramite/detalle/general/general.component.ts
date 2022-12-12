import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { FichaTramiteService } from 'src/app/tramites/services/ficha-tramite.service';
import { FichaespecificaService } from 'src/app/tramites/services/fichaespecifica.service';
import { BottomMenuService } from 'src/app/transversales/services/bottom-menu/bottom-menu.service';
import { HeaderService } from 'src/app/transversales/services/header-service/header.service';
import { SidenavService } from 'src/app/transversales/services/sidenav-service/sidenav-service.service';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss']
})
export class GeneralComponent implements OnInit {
  tramite: any = {
    id: '',
    tipo: null,
    prefijo: ''
  };
  eventoRoute: any;
  dataEmbebidos: any;
  embebido = false;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public fichaTramiteService: FichaTramiteService,
    private fichaespecificaService: FichaespecificaService,
    public bottomService: BottomMenuService,
    protected servicioHeader: HeaderService,
    protected servicioSideNav: SidenavService
  ) {
    this.bottomService.putOcultandoBottomMenu(false);
  }

  ngOnInit(): void {
    this.servicioHeader.estadoHeader(false, true);
    this.bottomService.seleccionandoItem(1);
    this.bottomService.ajustandoPantalla(false);
    this.servicioSideNav.seleccionandoItem(false, 'null');
    (document.getElementById('topScroll') as HTMLElement).style.top = '7.25rem';
    (document.getElementById('topScroll') as HTMLElement).scrollTop = 0;

    this.loadData();
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.loadData()
      }
    });
  }

  loadData() {
    const parametroid = this.activatedRoute.snapshot.params.id;

    let idTramiteTemp = parametroid;

    if (parametroid !== 'embebido') {
      this.tramite.id = parametroid.substring(1);
      this.tramite.prefijo = parametroid.substring(0, 1).toLowerCase();

      // Tramite suit
      if (this.tramite.prefijo === 't') {
        this.fichaespecificaService.setTramite(this.tramite);
        idTramiteTemp = this.tramite.id;
      }

      if (idTramiteTemp != null && idTramiteTemp != 'null') {
        this.fichaTramiteService.GetTipoFichaTramite(idTramiteTemp)
          .subscribe(data => {
            this.tramite.tipo = data.StatusCode;
          });
      }

    } else {
      this.embebido = true;
    }
  }

}
