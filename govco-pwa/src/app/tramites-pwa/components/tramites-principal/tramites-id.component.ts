import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BottomMenuService } from 'src/app/transversales/services/bottom-menu/bottom-menu.service';
import { HeaderService } from 'src/app/transversales/services/header-service/header.service';
import { SidenavService } from 'src/app/transversales/services/sidenav-service/sidenav-service.service';
import { TramitesPorIdService } from '../../services/tramites-por-id-service/tramites-por-id.service';

@Component({
  selector: 'app-tramites-id',
  templateUrl: './tramites-id.component.html',
  styleUrls: ['./tramites-id.component.css']
})
export class TramitesIdComponent implements OnInit {

  tramite: { id: string, tipo: string | null, prefijo: string } = { id: '', tipo: null, prefijo: '' };
  embebido: boolean = false;

  constructor(
    private router: Router,
    protected fichaTramiteService: TramitesPorIdService,
    private activatedRoute: ActivatedRoute,
    protected servicioSideNav: SidenavService,
    protected servicioHeader: HeaderService,
    public bottomService: BottomMenuService
  ) { }

  ngOnInit(): void {
    this.servicioHeader.estadoHeader(false, false);
    this.bottomService.putOcultandoBottomMenu(true);
    this.servicioSideNav.seleccionandoItem(false, 'null');
    this.bottomService.ajustandoPantalla(false);
    (document.getElementById('topScroll') as HTMLElement).style.top = '0';
    (document.getElementById('topScroll') as HTMLElement).scrollTop = 0;
    this.loadData();
  }

  loadData() {
    const parametroid: String | null = this.activatedRoute.snapshot.params.id;
    if (parametroid != null) {
      if (parametroid !== 'embebido') {
        this.tramite.id = parametroid!.substring(1);
        this.tramite.prefijo = parametroid.substring(0, 1).toLowerCase();

        // Tramite suit
        if (this.tramite.id != null && this.tramite.id != 'null') {
          this.fichaTramiteService.GetTipoFichaTramite(this.tramite.id)
            .subscribe(data => {
              if (this.tramite.prefijo === 't') {
                // this.fichaespecificaService.setTramite(this.tramite);
                this.tramite.tipo = data.StatusCode;
              }
            });
        }
      } else {
        this.embebido = true;
      }
    }
  }

}
