import { Injectable } from '@angular/core';
import { dialogModal } from '../models/dialogModal';
import { ConfirmModalService } from '../services/confirm-modal.service';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  constructor(private dialog: ConfirmModalService) { }
  public wordLimit(value: string, limit: number = 3) {
    const splitValue = value.split(' ');
    if (splitValue.length > 0) {
      const endString = splitValue.length > limit ? '...' : '';
      return splitValue.splice(0, limit).join(' ') + endString;
    } else {
      return value;
    }
  }

  public openModalErrorValidateUrl() {

    this.dialog.openNotificationDialog(
      "Sitio externo no disponible",
      "No es posible redireccionar al sitio externo ya que no se encuentra disponible.",
      "error-site",
      () => { }
    );
  }
}
