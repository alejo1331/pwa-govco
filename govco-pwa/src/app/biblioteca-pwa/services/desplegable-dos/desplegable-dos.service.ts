import { Platform } from '@angular/cdk/platform';
import { ElementRef, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DesplegableDosService {

  position_top: number = 0;
  position_top_initial: number = 0;
  lastY: number = 0;
  speed_top: number = 0;
  modal_desplegable: ElementRef;

  constructor(
    public platform: Platform,
  ) { }

  createElement(desplegable: ElementRef) {
    this.modal_desplegable = desplegable;
  }

  getPositionInitial() {
    this.position_top_initial = this.getPropertyElement('top');

    if (this.getPropertyElement('height') <= 10) this.speed_top = 0.125;
    else if (this.getPropertyElement('height') > 10 && this.getPropertyElement('height') <= 50) this.speed_top = 0.75;
    // else if (this.getPropertyElement('height') > 20 && this.getPropertyElement('height') <= 50) this.speed_top = 0.375;
    else if (this.getPropertyElement('height') > 50) this.speed_top = 1;
  }

  getPositionTop() {
    this.position_top = this.getPropertyElement('top');
  }

  setPositionTop(direction: string) {
    this.refreshF5(direction);
    this.modal_desplegable.nativeElement.style.top = this.position_top + "rem";

    if (direction == 'up' && this.getPropertyElement('bottom') < 4.25)
      this.position_top -= this.speed_top;
    else if (direction == 'down' && this.getPropertyElement('top') < this.position_top_initial)
      this.position_top += this.speed_top;
  }

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

  getPropertyElement(property: string): number {
    const property_value: string = getComputedStyle(this.modal_desplegable.nativeElement).getPropertyValue(property);
    return Number(property_value.split("px").join('')) / 16; // px a rem
  }
}
