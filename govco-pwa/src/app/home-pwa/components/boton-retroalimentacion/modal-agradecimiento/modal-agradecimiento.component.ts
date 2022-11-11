import { Component } from '@angular/core';

@Component({
  selector: 'app-modal-agradecimiento',
  templateUrl: './modal-agradecimiento.component.html',
  styleUrls: ['./modal-agradecimiento.component.scss'],
})
export class ModalAgradecimientoComponent{
  textoTitulo = '¡Gracias!';
  textoContenido =
    'Tus comentarios nos ayudan a mejorar los servicios de nuestro país.';
  textoBoton = 'Cerrar';

}
