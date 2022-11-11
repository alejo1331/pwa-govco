import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-seccion-carpeta-ciudadana',
  templateUrl: './seccion-carpeta-ciudadana.component.html',
  styleUrls: ['./seccion-carpeta-ciudadana.component.scss']
})
export class SeccionCarpetaCiudadanaComponent{

  URLgovco = environment.URLgovco
  URLccd = environment.carpetaciudadana

  descargarGuion(){
    const url = 'https://govco-prod-webutils.s3.amazonaws.com/uploads/Guión%20Video%20-%20Así%20puedes%20registrarte%20en%20Carpeta%20Ciudadana%20Digital.pdf'
    window.open(url);
  }

}
