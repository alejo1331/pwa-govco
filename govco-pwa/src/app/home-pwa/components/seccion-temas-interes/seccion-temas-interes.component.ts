import { Component, OnInit } from '@angular/core';
import { ContenidoPanelInferior, ObtenerTemasInteresRespuesta } from '../../models/TemasInteresModel';
import { HomeService } from '../../services/home.service';

@Component({
  selector: 'app-seccion-temas-interes',
  templateUrl: './seccion-temas-interes.component.html',
  styleUrls: ['./seccion-temas-interes.component.scss']
})
export class SeccionTemasInteresComponent implements OnInit {

  public titulo = "";
  public dataTemasInteres: ContenidoPanelInferior[] = [];

  constructor(private homeService: HomeService) { }

  ngOnInit(): void {
    this.homeService.obtenerTemasInteres().subscribe(
      (data: ObtenerTemasInteresRespuesta) => {
        if (data.succeeded) {
          this.dataTemasInteres = data.data.contenidoPanelInferior;
          this.titulo = data.data.panelSuperior.mapaDeSitio == null ?
            data.data.panelInferior.mapaDeSitio.tituloSeccion : data.data.panelSuperior.mapaDeSitio.tituloSeccion;
        } else {
          console.log('error al consultar temas de interés.');
        }
      }
    )
  }
}
