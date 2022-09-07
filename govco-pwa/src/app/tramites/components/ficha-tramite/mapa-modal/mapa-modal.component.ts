import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {Loader, LoaderOptions} from 'google-maps';

@Component({
  selector: 'app-mapa-modal',
  templateUrl: './mapa-modal.component.html',
  styleUrls: ['./mapa-modal.component.scss']
})
export class MapaModalComponent implements OnInit, AfterViewInit {
  @Input() latitud: any;
  @Input() longitud: any;
  @Input() direccion: any;
  @ViewChild('mapContainer') gmap: ElementRef;
  map: google.maps.Map;

  constructor(
    private activeModal: NgbActiveModal
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.mapInitializer();
  }

  mapInitializer(): void {
    /*Coordenadas para inicializar el mapa*/
    const coordinates = new google.maps.LatLng(this.latitud, this.longitud);

    const mapOptions: google.maps.MapOptions = {
      center: coordinates,
      zoom: 16,
      fullscreenControl: false,
      mapTypeControl: false,
      streetViewControl: false
    };

    this.map = new google.maps.Map(this.gmap.nativeElement, mapOptions);

     /*Inicializacion del marcadorr*/
    const marker = new google.maps.Marker({
        position: coordinates,
        map: this.map,
        title: this.direccion
      });
    /*Se añade evento al marcador*/
    
    marker.addListener('click', () => {
      const infoWindow = new google.maps.InfoWindow({
        content: marker.getTitle()!
      });
      infoWindow.open(marker.getMap()!, marker);
    });

    /*Se añade marcador al mapa*/
    marker.setMap(this.map);

  }

  closeModal() {
    this.activeModal.close();
  }

}
