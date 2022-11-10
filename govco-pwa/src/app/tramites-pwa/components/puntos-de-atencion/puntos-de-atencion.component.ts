import { Platform } from '@angular/cdk/platform';
import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, ViewChild } from '@angular/core';
import { BottomMenuService } from 'src/app/transversales/services/bottom-menu/bottom-menu.service';
import { HeaderService } from 'src/app/transversales/services/header-service/header.service';
import { SidenavService } from 'src/app/transversales/services/sidenav-service/sidenav-service.service';
import { ItemsAcordeon } from '../../models/puntos-de-atencion/items-acordeon-interface';
import { PuntosDeAtencionInterface } from '../../models/puntos-de-atencion/puntos-de-atencion-interface';
import { TramitesPorIdService } from '../../services/tramites-por-id-service/tramites-por-id.service';
import { PipeTransform } from '@angular/core';
import { DataBasicaPuntosInterface } from '../../models/puntos-de-atencion/data-basica-puntos-interface';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalMapaComponent } from './modal-mapa/modal-mapa.component';

@Component({
  selector: 'app-puntos-de-atencion',
  templateUrl: './puntos-de-atencion.component.html',
  styleUrls: ['./puntos-de-atencion.component.scss']
})
export class PuntosDeAtencionComponent implements OnInit, PipeTransform {

  @ViewChild('inputBuscador') inputBuscador: ElementRef;
  @ViewChild('seccionPuntos') seccionPuntos: ElementRef;

  @Output() cerrarPuntosAtencion = new EventEmitter<[string, string]>();
  @Input() perfil_idTramite: { perfil: string, idTramite: number };
  @Input() dataPuntosAtencion: DataBasicaPuntosInterface;

  public items: ItemsAcordeon[] = [];
  public itemsAux: ItemsAcordeon[] = [];
  public magnitudItemsAux: number = 0;
  public busqueda: string = '';
  numeroAcordeonPantalla: number = 5;
  public elementActive:Element;

  active: boolean = false;
  contadorVerMas: number = 0;
  iOS: boolean = false;

  constructor(
    private modalService: NgbModal,
    protected servicioSideNav: SidenavService,
    protected servicioHeader: HeaderService,
    public bottomService: BottomMenuService,
    protected fichaTramiteService: TramitesPorIdService,
    public platform: Platform,
  ) { }

  ngOnInit(): void {
    this.servicioHeader.estadoHeader(false, false);
    this.bottomService.putOcultandoBottomMenu(true);
    this.servicioSideNav.seleccionandoItem(false, 'null');
    this.bottomService.ajustandoPantalla(true);
    this.getPuntosAtencion();
    this.iOS = this.platform.IOS || this.platform.SAFARI ? true : false;

    if (document.activeElement) {
      this.elementActive = document.activeElement;
    }    
    const closeButton: HTMLElement = <HTMLElement>document.querySelector('.caja-icono-48-pwa');
    closeButton.focus();
  }

  activarItem(index: number) {
    this.items[index].active = !this.items[index].active;
    this.items.forEach(function (item, indexItem) {
      if (indexItem != index) {
        item.active = false;
      }
    });
  }

  getPuntosAtencion() {
    const tipoAtencionPresencial = this.fichaTramiteService.getTipoAtencionPresencial();
    this.fichaTramiteService.GetPuntosAtencion(tipoAtencionPresencial, this.dataPuntosAtencion.idTipo, this.perfil_idTramite.idTramite, this.dataPuntosAtencion.idMomento, this.dataPuntosAtencion.idAccion)
      .subscribe((puntosDeAntencion: PuntosDeAtencionInterface[]) => {
        puntosDeAntencion.forEach((elemento) => {
          this.itemsAux.push(
            {
              active: false,
              latitud: elemento.Latitud,
              longitud: elemento.Longitud,
              titulo: elemento.PuntoAtencionNombre,
              departamento: elemento.Departamento,
              municipio: elemento.Municipio,
              direccion: elemento.PuntoAtencionDireccion,
              horario: elemento.HorarioAtencion,
              telefono: elemento.PuntoAtencionTelefono.split(",").join("<br>")
            }
          );
        });
      },
        (error) => {},
        () => this.verMas(0, this.itemsAux)
      );
  }

  verMas(contadorVerMas: number, itemsAux: ItemsAcordeon[]) {
    this.magnitudItemsAux = itemsAux.length;
    let posicionConDefaseFinal: number = (contadorVerMas + 1) * this.numeroAcordeonPantalla;
    let diferencia: number = itemsAux.length - this.items.length;
    let ultimoContadorVerMas: number = diferencia < this.numeroAcordeonPantalla ?
      this.numeroAcordeonPantalla - diferencia
      : 0;

    for (let i = this.items.length; i < posicionConDefaseFinal - ultimoContadorVerMas; i++) {
      this.items.push(itemsAux[i]);
    }
  }

  resetValores(){
    this.contadorVerMas = 0;
    this.items = [];
  }

  verMenos() {
    this.resetValores();
    this.itemsFiltrados(this.contadorVerMas, this.busqueda);
  }

  cerrarPuntoAtencion() {
    const element = <HTMLElement>this.elementActive;
    element.focus();
    const cerrarPuntosAtencion: string = '100%';
    const AbrirTramitesId: string = '0%';
    this.cerrarPuntosAtencion.emit([cerrarPuntosAtencion, AbrirTramitesId]);
    this.verMenos();
  }

  borrarContenido() {
    this.busqueda = ''
    this.inputBuscador.nativeElement.value = this.busqueda;
    this.resetValores();
    this.itemsFiltrados(this.contadorVerMas, this.busqueda);
  }

  transform(items: ItemsAcordeon[], searchText: string): ItemsAcordeon[] {
    if (!items) {
      return [];
    }
    if (!searchText) {
      return items;
    }
    searchText = searchText.toLocaleLowerCase();

    return items.filter(it => {
      return it.titulo.toLocaleLowerCase().includes(searchText);
    });
  }

  itemsFiltrados(contador: number, busqueda: string) {
    let filtrado: ItemsAcordeon[] = this.transform(this.itemsAux, busqueda);
    this.verMas(contador, filtrado);
  }

  printCoordenadas(latitud:string, longitud:string, direccion:string){ 
    const modal = this.modalService.open(ModalMapaComponent,{ size: 'lg', backdrop: 'static', keyboard: false});
    modal.componentInstance.latitud = latitud;
    modal.componentInstance.longitud = longitud;
    modal.componentInstance.direccion = direccion;
  }


  @HostListener('window:keyup', ['$event']) onInput(event: KeyboardEvent) {
    if (this.inputBuscador.nativeElement == event.target) {
      this.busqueda = (event.target as HTMLInputElement).value;
      this.resetValores();
      this.itemsFiltrados(this.contadorVerMas, this.busqueda);
    }
  }

}
