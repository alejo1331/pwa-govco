import { Component, Input } from '@angular/core';
import { CarruselItem } from '../../models/CarruselDosModel';

@Component({
  selector: 'app-carrusel-dos',
  templateUrl: './carrusel-dos.component.html',
  styleUrls: ['./carrusel-dos.component.scss']
})
export class CarruselDosComponent {

  @Input() carruselItems: CarruselItem[];

  ngAfterViewInit():void {
    $('#carruselDosTemasInteres .carousel-item').each(function() {
      let next = $(this).next();
      if (!next.length) {
        next = $(this).siblings(':first');
      }
      
      const elementClone = next.children(':first-child').clone().appendTo($(this));
      $(<HTMLElement>elementClone[0].querySelector('a')).attr("tabindex", '0');

      if (next.next().length > 0) {
        const aa = next.next().children(':first-child').clone().appendTo($(this));
      } else {
        const ee = $(this).siblings(':first').children(':first-child').clone().appendTo($(this));
      }
    });

    $('.carousel-indicators li[data-target="#carruselDosTemasInteres"].active').trigger('click')
  }

  validarURL(item:{urlDestino:string}) {
    if (item.urlDestino.indexOf('portales') >= 0) {
      return '/portales';
    } else if (item.urlDestino.indexOf('ventanillas-unicas') >= 0) {
      return '/ventanillas-unicas';
    } else {
      return item.urlDestino;
    }
  }
}
