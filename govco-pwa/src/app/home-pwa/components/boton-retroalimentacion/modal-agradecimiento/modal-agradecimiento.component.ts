import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal-agradecimiento',
  templateUrl: './modal-agradecimiento.component.html',
  styleUrls: ['./modal-agradecimiento.component.scss'],
})
export class ModalAgradecimientoComponent implements OnInit {
  textoTitulo = '¡Gracias!';
  textoContenido =
    'Tus comentarios nos ayudan a mejorar los servicios de nuestro país.';
  textoBoton = 'Cerrar';

  constructor() {}

  ngOnInit(): void {}
}
