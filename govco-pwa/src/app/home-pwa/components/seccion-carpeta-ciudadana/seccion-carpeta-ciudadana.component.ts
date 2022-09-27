import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-seccion-carpeta-ciudadana',
  templateUrl: './seccion-carpeta-ciudadana.component.html',
  styleUrls: ['./seccion-carpeta-ciudadana.component.scss']
})
export class SeccionCarpetaCiudadanaComponent implements OnInit {

  URLgovco = environment.URLgovco
  URLccd = environment.carpetaciudadana

  constructor() { }

  ngOnInit() {
  }

  descargarGuion(url:string){
    window.open(url, `target='_blank', rel=${url}`);
  }

}
