import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carrusel-dos',
  templateUrl: './carrusel-dos.component.html',
  styleUrls: ['./carrusel-dos.component.scss']
})
export class CarruselDosComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
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
