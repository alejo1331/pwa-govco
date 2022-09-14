import { Component, Input, OnInit } from '@angular/core';
import { CarruselItem } from '../../models/CarruselDosModel';

@Component({
  selector: 'app-carrusel-dos',
  templateUrl: './carrusel-dos.component.html',
  styleUrls: ['./carrusel-dos.component.scss']
})
export class CarruselDosComponent implements OnInit {

  @Input() carruselItems: CarruselItem[];

  constructor() { }

  ngOnInit(): void {
    
  }

  ngAfterViewInit():void {
    $('#carruselDosTemasInteres .carousel-item').each(function(){
      let next = $(this).next();
      if (!next.length) {
        next = $(this).siblings(':first');
      }
      next.children(':first-child').clone().appendTo($(this));
      
      if (next.next().length>0) {
        next.next().children(':first-child').clone().appendTo($(this));
      } else {
        $(this).siblings(':first').children(':first-child').clone().appendTo($(this));
      }
    });

  }
}
