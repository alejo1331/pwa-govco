import { Component, OnInit, HostListener } from '@angular/core';
import { FooterInterface } from '../../models/footer-models/footer-interface';
import { PanelCuartaColumna } from '../../models/footer-models/panel-cuarta-columna';
import { PanelSegundaColumna } from '../../models/footer-models/panel-segunda-columna';
import { PanelTerceraColumna } from '../../models/footer-models/panel-tercera-columna';
import { BottomMenuService } from '../../services/bottom-menu/bottom-menu.service';
import { FooterServiceService } from '../../services/footer-service/footer-service.service';
import { HeaderService } from '../../services/header-service/header.service';
import { SidenavService } from '../../services/sidenav-service/sidenav-service.service';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  infGeneral: PanelSegundaColumna;
  infContacto: PanelTerceraColumna;
  infAcercaDelSitio: PanelCuartaColumna;
  telefonoNacional: string;
  tituloTelefonoNacional: string;
  telefonoLocal: string;
  tituloTelefonoLocal: string;
  lineaAnticorrupcion: string;
  tituloLineaAnticorrupcion: string;

  estadoAccordionOne: string = 'false';
  estadoAccordionTwo: string = 'false';
  estadoAccordionThree: string = 'false';

  marginAccordionOne: boolean = false;
  marginAccordionTwo: boolean = false;
  marginAccordionThree: boolean = false;

  constructor(
    protected infoFooter: FooterServiceService,
    protected servicioSideNav: SidenavService,
    protected servicioHeader: HeaderService,
    public bottomService: BottomMenuService
  ) { }

  ngOnInit(): void {

    this.servicioHeader.estadoHeader(false, true);
    this.bottomService.seleccionandoItem(0);
    this.servicioSideNav.seleccionandoItem(true, 'acercaPortal');

    this.infoFooter.getInformacionFooter().subscribe((footer: FooterInterface) => {
      this.infGeneral = footer.data.panelSegundaColumna;

      this.infContacto = footer.data.panelTerceraColumna;
      this.tituloTelefonoNacional = footer.data.panelTerceraColumna.telefonoNacional.split(':')[0];
      this.telefonoNacional = footer.data.panelTerceraColumna.telefonoNacional.split(':')[1];
      this.tituloTelefonoLocal = footer.data.panelTerceraColumna.telefonoLocal.split(':')[0];
      this.telefonoLocal = footer.data.panelTerceraColumna.telefonoLocal.split(':')[1];
      this.tituloLineaAnticorrupcion = footer.data.panelTerceraColumna.lineaAnticorrupcion.split(':')[0];
      this.lineaAnticorrupcion = footer.data.panelTerceraColumna.lineaAnticorrupcion.split(':')[1];

      this.infAcercaDelSitio = footer.data.panelCuartaColumna;
    });
  }

  @HostListener('click')
  onClick() {
    this.estadoAccordionOne = String(document.getElementById('accordionPanelOne')?.getAttribute('aria-expanded'));
    this.marginAccordionOne = (this.estadoAccordionOne?.toLowerCase() === 'true');

    this.estadoAccordionTwo = String(document.getElementById('accordionPanelTwo')?.getAttribute('aria-expanded'));
    this.marginAccordionTwo = (this.estadoAccordionTwo?.toLowerCase() === 'true');

    this.estadoAccordionThree = String(document.getElementById('accordionPanelThree')?.getAttribute('aria-expanded'));
    this.marginAccordionThree = (this.estadoAccordionThree?.toLowerCase() === 'true');
  }

  desactivarItem() {
    this.servicioSideNav.seleccionandoItem(false, 'null');
  }

  facebook() {
    location.href = 'fb://page/80681696914';
    setTimeout(() => {
      location.href = 'https://m.facebook.com/80681696914/';
    }, 500);
  }

}
