import { Platform } from '@angular/cdk/platform';
import { ElementRef, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DesplegableDosService {

  constructor(
    public platform: Platform,
  ) { }

  // Este metodo permite dehabilitar o habilitar la accion actulizar por scroll o touchmove
  // garantizando una buena fluides del control de modales desplegables al momento de deplzarlos 
  // en direccion a la accion de actualizar por scroll o touchmove
  refreshF5(direction: string) {
    var body = (document.getElementsByTagName('body') as HTMLCollectionOf<HTMLElement>)[0];
    // if (direction == 'down' && this.getPropertyElement('bottom') >= 4) { // Habilita la actualizacion por scroll
    // console.log('bottom down',this.getPropertyElement('bottom'))
    // body.style.overscrollBehavior = 'auto'
    //   setTimeout(() => {  }, 500);
    //   if (this.platform.IOS || this.platform.SAFARI) {
    //     body.style.removeProperty('position')
    //     body.style.removeProperty('overflow')
    //   }
    // } else if (direction == 'up' && this.getPropertyElement('bottom') < 4) { // Deshabilita la actualizacion por scroll
      body.style.overscrollBehavior = 'contain';
      if (this.platform.IOS || this.platform.SAFARI) {
        body.style.position = 'fixed';
        body.style.overflow = 'hidden';
      }
    // }
  }
}
