import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ModalInterface } from '../models/modal-interface';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  dataModal: ModalInterface = {
    campoTitulo: "Esto es el titulo",
    campoTexto: "Esto es el campo texto",
    botonCancelar: "CANCELAR",
    botonAceptar: "ACEPTAR"
  }

  private InformacionModal = new BehaviorSubject<ModalInterface>(this.dataModal);
  public modalClasico = this.InformacionModal.asObservable();

  private enEspera = new BehaviorSubject<boolean>(false);
  public siguienteModal = this.enEspera.asObservable();

  public async clasico(datosModal: ModalInterface) {
    await this.InformacionModal.next(datosModal);
  }

  public async activarSiguienteModal(enEspera: boolean) {
    await this.enEspera.next(enEspera);
  }

}
