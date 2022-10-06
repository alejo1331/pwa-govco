import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { BottomMenuService } from 'src/app/transversales/services/bottom-menu/bottom-menu.service';
import { HeaderService } from 'src/app/transversales/services/header-service/header.service';
import { SidenavService } from 'src/app/transversales/services/sidenav-service/sidenav-service.service';
import { TramitesPorIdService } from '../../services/tramites-por-id-service/tramites-por-id.service';

@Component({
  selector: 'app-puntos-de-atencion',
  templateUrl: './puntos-de-atencion.component.html',
  styleUrls: ['./puntos-de-atencion.component.scss']
})
export class PuntosDeAtencionComponent implements OnInit {

  @ViewChild('inputBuscador') inputBuscador: ElementRef;
  @Output() cerrarPuntosAtencion = new EventEmitter<[string, string]>();
  @Input() perfil_idTramite: { perfil: string, idTramite: number };


  public items = [
    {
      active: false,
      titulo: 'Fondo de desarrollo de la Educación Superior',
      departamentoMunicipio: 'Bogotá. D.C. / Bogotá, Distrito Capital.',
      direccion: 'Calle 57 No 8 B - 05 interior 32',
      horario: '5 p.m',
      telefono: '(+57) 315 3478616'
    },
    {
      active: false,
      titulo: 'Fondo de desarrollo de la Educación Superior de Arauca',
      departamentoMunicipio: 'Bogotá. D.C. / Bogotá, Distrito Capital.',
      direccion: 'Calle 57 No 8 B - 05 interior 32',
      horario: '5 p.m',
      telefono: '(+57) 315 3478616'
    },
    {
      active: false,
      titulo: 'Fondo de desarrollo de la Educación Superior',
      departamentoMunicipio: 'Bogotá. D.C. / Bogotá, Distrito Capital.',
      direccion: 'Calle 57 No 8 B - 05 interior 32',
      horario: '5 p.m',
      telefono: '(+57) 315 3478616'
    },
    {
      active: false,
      titulo: 'Fondo de desarrollo de la Educación Superior',
      departamentoMunicipio: 'Bogotá. D.C. / Bogotá, Distrito Capital.',
      direccion: 'Calle 57 No 8 B - 05 interior 32',
      horario: '5 p.m',
      telefono: '(+57) 315 3478616'
    },
    {
      active: false,
      titulo: 'Fondo de desarrollo de la Educación Superior',
      departamentoMunicipio: 'Bogotá. D.C. / Bogotá, Distrito Capital.',
      direccion: 'Calle 57 No 8 B - 05 interior 32',
      horario: '5 p.m',
      telefono: '(+57) 315 3478616'
    }
  ]

  active: boolean = false;

  constructor(
    protected servicioSideNav: SidenavService,
    protected servicioHeader: HeaderService,
    public bottomService: BottomMenuService,
    protected fichaTramiteService: TramitesPorIdService,
  ) { }

  ngOnInit(): void {
    this.servicioHeader.estadoHeader(false, false);
    this.bottomService.putOcultandoBottomMenu(true);
    this.servicioSideNav.seleccionandoItem(false, 'null');
    this.bottomService.ajustandoPantalla(false);
    const contenedorTopScroll = (document.getElementById('topScroll') as HTMLElement);
    contenedorTopScroll.style.top = '0';
    contenedorTopScroll.style.height = '100%';
    contenedorTopScroll.scrollTop = 0;
    this.getPuntosAtencion();
  }

  activarItem(index: number) {
    this.items[index].active = !this.items[index].active;
    this.items.forEach(function (item, indexItem) {
      if (indexItem != index) {
        item.active = false;
      }
    });
  }

  cerrarPuntoAtencion() {
    // (document.querySelector('.collapse.show') as HTMLElement).classList.remove('show');
    // (document.querySelector('.btn-block.text-left.collapsed') as HTMLElement).classList.remove('collapsed');
    // (document.querySelector('.card.active') as HTMLElement).classList.remove('active');
    const cerrarPuntosAtencion: string = '100%';
    const AbrirTramitesId: string = '0';
    this.cerrarPuntosAtencion.emit([cerrarPuntosAtencion, AbrirTramitesId]);
  }

  getPuntosAtencion() {
    console.log('this.perfil_idTramite.idTramite',this.perfil_idTramite.idTramite)
    const tipoAtencionPresencial = this.fichaTramiteService.getTipoAtencionPresencial();
    this.fichaTramiteService.GetPuntosAtencion(tipoAtencionPresencial, 1, this.perfil_idTramite.idTramite, 0, 0)
      .subscribe(response => {
        console.log('infor puntos', response)
      }, error => {
        console.error(error);
      },
      );
  }

  borrarContenido() {
    this.inputBuscador.nativeElement.value = ''
  }

  buscarContenido() {

  }

}
