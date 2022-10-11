import { Component, Input, OnInit } from '@angular/core';
import { TramitesPorIdService } from '../../services/tramites-por-id-service/tramites-por-id.service';

@Component({
  selector: 'app-ficha-especifica-detalle-pwa',
  templateUrl: './ficha-especifica-detalle-pwa.component.html',
  styleUrls: ['./ficha-especifica-detalle-pwa.component.scss'],
})
export class FichaEspecificaDetallePwaComponent implements OnInit {
  @Input() data: any;

  infoDescripcionTramite: any;
  contenidoDescripcion: string;
  contenidoLeido: string;
  caracteresCategoria: boolean = false;
  textoBoton: string = 'Iniciar trámite';
  urlBoton = '';
  iconoTramite = '';
  iconoCosto = '';

  showBotonFechas: boolean;

  constructor(protected fichaTramiteService: TramitesPorIdService) {}

  ngOnInit(): void {
    this.fichaTramiteService
      .GetServicioYTramiteEspecifico(this.data.IdTramite)
      .subscribe((data: any) => {
        this.infoDescripcionTramite = data;
        this.getIconoCosto(data?.Costo);
        this.contenidoDescripcion =
          this.infoDescripcionTramite.DescripcionTramite.substring(0, 250);
        this.contenidoLeido = this.infoDescripcionTramite.DescripcionTramite;
        if (this.contenidoDescripcion.length > 249) {
          this.caracteresCategoria = true;
        }
      });
    this.getIconoTramite(this.data.Tipotramite);
    this.showBotonFecha();
  }

  goToLink(url: string) {
    window.open(url, '_blank');
  }

  getIconoTramite(data: any) {
    if (data === 'En línea') {
      this.iconoTramite = 'laptop_mac';
    } else if (data === 'Presencial') {
      this.iconoTramite = 'person';
    } else {
      this.iconoTramite = 'co_present';
    }
  }

  getIconoCosto(data: any) {
    data === 'SI'
      ? (this.iconoCosto = 'monetization_on')
      : (this.iconoCosto = 'money_off');
  }

  showBotonFecha() {
    this.fichaTramiteService.GetFechasByTramite(this.data.IdTramite).subscribe(
      (resp: any) => {
        this.showBotonFechas = resp.length > 0;
      },
      (error) => console.log(error)
    );
  }

  getFechas() {
    this.fichaTramiteService
      .GetFechasByTramite(this.data.IdTramite)
      .subscribe((resp) => {
        console.log('getFechas', resp);
        // this.showModalFechas(resp)
      });
  }
}
