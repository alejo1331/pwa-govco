import { Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import * as L from 'leaflet';


@Component({
  selector: 'app-modal-mapa',
  templateUrl: './modal-mapa.component.html',
  styleUrls: ['./modal-mapa.component.scss']
})
export class ModalMapaComponent implements OnInit {

  @Input() latitud: string;
  @Input() longitud: string;
  @Input() direccion: string;
  @ViewChild('mapContainer') gmap: ElementRef;
  @ViewChild('contentModal') contentModal: ElementRef;

  bodyElement: HTMLElement;
  modalMapa: HTMLElement;
  modalDialog: HTMLElement;
  modalContent: HTMLElement;
  heightPantalla: number;
  widthPantalla: number;
  heightBody: number = 0;
  widthBody: number = 0;
  heightBarraNavegador: number = 0;

  private map: any;


  constructor(private activeModal: NgbActiveModal) { }

  ngOnInit(): void {
    this.bodyElement = document.getElementsByTagName('body')[0];
    this.heightPantalla = screen.height;
    this.widthPantalla = screen.width;
    this.heightBarraNavegador = this.heightPantalla - this.bodyElement.clientHeight;

    if (this.heightBarraNavegador > 0) {
      this.heightBody = this.heightPantalla - this.heightBarraNavegador;
      this.widthBody = this.widthPantalla - this.heightBarraNavegador;
    } else {
      this.heightBody = this.bodyElement.clientHeight;
      this.widthBody = this.bodyElement.clientWidth;
    }
  }

  ngAfterViewInit(): void {
    this.contentModal.nativeElement.style.height = 'calc(' + this.heightBody + 'px - 1rem)';
    this.modalMapa = (document.getElementsByTagName('ngb-modal-window') as HTMLCollectionOf<HTMLElement>)[0];
    this.modalDialog = (this.modalMapa.getElementsByClassName('modal-dialog') as HTMLCollectionOf<HTMLElement>)[0];
    this.modalContent = (this.modalDialog.getElementsByClassName('modal-content') as HTMLCollectionOf<HTMLElement>)[0];
    this.modalMapa.classList.add('ajuste-modal');
    this.modalDialog.classList.add('ajuste-modal-dialog');
    this.modalContent.classList.add('ajuste-modal-content');
    this.mapInitializer();
  }

  mapInitializer(): void {
    this.map = L.map('map', {
      center: [Number(this.latitud), Number(this.longitud)],
      zoom: 16
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);

    const marker = L.marker([Number(this.latitud), Number(this.longitud)], {
      icon: L.icon({
        iconSize: [25, 41],
        iconAnchor: [13, 41],
        iconUrl: 'leaflet/marker-icon.png',
        shadowUrl: 'leaflet/marker-shadow.png'
      })
    });

    marker.addTo(this.map);
  }

  closeModal() {
    this.activeModal.close();
    this.modalMapa.classList.remove('ajuste-modal');
    this.modalDialog.classList.remove('ajuste-modal-dialog');
    this.modalContent.classList.remove('ajuste-modal-content');
  }

  @HostListener('window:orientationchange', ['$event']) onOrientationchange(event: any) {
    let rotacion: number = event.target.screen.orientation.angle;
    if (rotacion == 0) {
      if (this.heightBody < this.widthBody) {
        this.contentModal.nativeElement.style.height = 'calc(' + this.widthBody + 'px - 1rem)';
      } else {
        this.contentModal.nativeElement.style.height = 'calc(' + this.heightBody + 'px - 1rem)';
      }
    } else {
      if (this.heightBody < this.widthBody) {
        this.contentModal.nativeElement.style.height = 'calc(' + this.heightBody + 'px - 1rem)';
      } else {
        this.contentModal.nativeElement.style.height = 'calc(' + this.widthBody + 'px - 1rem)';
      }
    }
  }

}
