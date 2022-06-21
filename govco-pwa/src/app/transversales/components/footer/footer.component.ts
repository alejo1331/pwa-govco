import { Component, OnInit, AfterViewInit, OnChanges, SimpleChanges, HostListener } from '@angular/core';
import { FooterInterface } from '../../models/footer-models/footer-interface';
import { PanelCuartaColumna } from '../../models/footer-models/panel-cuarta-columna';
import { PanelSegundaColumna } from '../../models/footer-models/panel-segunda-columna';
import { PanelTerceraColumna } from '../../models/footer-models/panel-tercera-columna';
import { FooterServiceService } from '../../services/footer-service/footer-service.service';

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
  telefonoLocal : string;
  tituloTelefonoLocal: string;
  lineaAnticorrupcion: string;
  tituloLineaAnticorrupcion: string;
  marginAccordionOne: boolean = false;
  marginAccordionTwo: boolean = false;
  marginAccordionThree: boolean = false;

  constructor(protected infoFooter: FooterServiceService) { }

  ngOnInit(): void {
    this.infoFooter.getInformacionFooter().subscribe((footer:FooterInterface) =>{
      this.infGeneral = footer.data.panelSegundaColumna;

      this.infContacto = footer.data.panelTerceraColumna;
      this.tituloTelefonoNacional= footer.data.panelTerceraColumna.telefonoNacional.split(':')[0];
      this.telefonoNacional = footer.data.panelTerceraColumna.telefonoNacional.split(':')[1];
      this.tituloTelefonoLocal = footer.data.panelTerceraColumna.telefonoLocal.split(':')[0];
      this.telefonoLocal = footer.data.panelTerceraColumna.telefonoLocal.split(':')[1];
      this.tituloLineaAnticorrupcion = footer.data.panelTerceraColumna.lineaAnticorrupcion.split(':')[0];
      this.lineaAnticorrupcion = footer.data.panelTerceraColumna.lineaAnticorrupcion.split(':')[1];

      this.infAcercaDelSitio = footer.data.panelCuartaColumna;
      
      console.log(this.infAcercaDelSitio)
    });
  }

  @HostListener('click')
  onClick() {
    const estadoAccordionOne = document.getElementById('accordionPanelOne')?.getAttribute('aria-expanded');
    this.marginAccordionOne = (estadoAccordionOne?.toLowerCase() === 'true');

    const estadoAccordionTwo = document.getElementById('accordionPanelTwo')?.getAttribute('aria-expanded');
    this.marginAccordionTwo = (estadoAccordionTwo?.toLowerCase() === 'true');

    const estadoAccordionThree = document.getElementById('accordionPanelThree')?.getAttribute('aria-expanded');
    this.marginAccordionThree = (estadoAccordionThree?.toLowerCase() === 'true');
    
  }

}
