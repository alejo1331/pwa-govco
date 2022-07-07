import { Component, OnInit } from '@angular/core';
import { ContactoEmergenciaModel } from '../../models/contacto-emergencia-model';
import { ContactoEmergenciaService } from '../../services/contacto-emergencia-service/contacto-emergencia.service';

@Component({
  selector: 'app-contactos-de-emergencia',
  templateUrl: './contactos-de-emergencia.component.html',
  styleUrls: ['./contactos-de-emergencia.component.css']
})
export class ContactosDeEmergenciaComponent implements OnInit {

  contactos: ContactoEmergenciaModel[];
  constructor(protected contactoEmergencia: ContactoEmergenciaService) { }

  ngOnInit() {
  
    this.contactoEmergencia.getContactos()
    .subscribe((data: ContactoEmergenciaModel[]) => { // Success
        this.contactos = data;
        console.log(this.contactos)
      },
      (error) => {
        console.error(error);
      }
    );
  }

}
