import { Component, OnInit } from '@angular/core';
import { ContactoEmergenciaModel } from 'src/app/inicio/models/contacto-emergencia-model';
import { ContactoEmergenciaService } from 'src/app/inicio/services/contacto-emergencia-service/contacto-emergencia.service';

@Component({
  selector: 'app-seccion-contactos-emergancia',
  templateUrl: './seccion-contactos-emergancia.component.html',
  styleUrls: ['./seccion-contactos-emergancia.component.scss']
})
export class SeccionContactosEmerganciaComponent implements OnInit {

  contactos!: ContactoEmergenciaModel[];

  constructor(
    protected contactoEmergencia: ContactoEmergenciaService) {

    }

  ngOnInit() {
    this.contactoEmergencia.getContactos()
    .subscribe((data: ContactoEmergenciaModel[]) => {
        this.contactos = data;

        console.log(this.contactos)

      },
      (error) => {
        console.error(error);
      }
    );
  }

}
