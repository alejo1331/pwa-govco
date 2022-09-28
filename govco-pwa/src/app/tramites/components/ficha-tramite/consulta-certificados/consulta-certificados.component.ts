import { Component, OnInit } from '@angular/core';
import { BottomMenuService } from 'src/app/transversales/services/bottom-menu/bottom-menu.service';
import { HeaderService } from 'src/app/transversales/services/header-service/header.service';
import { SidenavService } from 'src/app/transversales/services/sidenav-service/sidenav-service.service';

@Component({
  selector: 'app-consulta-certificados',
  templateUrl: './consulta-certificados.component.html',
  styleUrls: ['./consulta-certificados.component.scss']
})
export class ConsultaCertificadosComponent implements OnInit {

  public serviciosOnline = [
    {tramite: 'Certificado de Antecedentes Disciplinarios', entidad: 'Procuraduría General de la Nación', url: 'https://apps.procuraduria.gov.co/webcert/inicio.aspx?tpo=2'},
    {tramite: 'Certificado de Antecedentes Disciplinarios', entidad: 'Personería de Bogotá', url: 'https://www.personeriabogota.gov.co/al-servicio-de-la-ciudad/expedicion-de-antecedentes'},
    {tramite: 'Certificado Tarjeta Militar', entidad: 'Ejército Nacional', url: 'https://www.libretamilitar.mil.co/Modules/Consult/MilitaryCardCertificate'},
    {tramite: 'Certificado de Antecedentes Judiciales', entidad: 'Policía Nacional de Colombia', url: 'https://antecedentes.policia.gov.co:7005/WebJudicial/'},
    {tramite: 'Sistema Registro Nacional de Medidas Correctivas – RNMC', entidad: 'Policía Nacional de Colombia', url: 'https://srvcnpc.policia.gov.co/PSC/frm_cnp_consulta.aspx'},
    {tramite: 'Certificado de vigencia y antecedentes disciplinarios', entidad: 'Consejo Profesional Nacional de Ingeniería – COPNIA', url: 'https://www.copnia.gov.co/tramites-y-servicios/certificado-de-vigencia-y-antecedentes-disciplinarios'}
  ];

  public hover = false

  constructor(
    public bottomService: BottomMenuService,
    protected servicioHeader: HeaderService,
    protected servicioSideNav: SidenavService,
  ) { }

  ngOnInit(): void {
    this.servicioHeader.estadoHeader(false,true);
    this.bottomService.seleccionandoItem(1);
    this.bottomService.ajustandoPantalla(false);
    this.servicioSideNav.seleccionandoItem(false,'null');
    (document.getElementById('topScroll') as HTMLElement).style.top = '7.25rem';
    (document.getElementById('topScroll') as HTMLElement).scrollTop = 0;
  }

}
