import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carrusel-uno-copy',
  templateUrl: './carrusel-uno-copy.component.html',
  styleUrls: ['./carrusel-uno-copy.component.scss']
})
export class CarruselUnoCopyComponent implements OnInit {

  public data: any = [
    {
      titulo: 'titulo 1'
    },
    {
      titulo: 'titulo 2'
    },
    {
      titulo: 'titulo 3'
    },    
    {
      titulo: 'titulo 4'
    },
    {
      titulo: 'titulo 5'
    },
    {
      titulo: 'titulo 6'
    },
    {
      titulo: 'titulo 7'
    },
    {
      titulo: 'titulo 8'
    },
    {
      titulo: 'titulo 9'
    }
  ]

  public dataCarrusel: any = [];

  constructor() { }

  ngOnInit(): void {
    this.dataCarrusel = this.agruparData([...this.data], 3);
  console.log('this.dataCarrusel', this.dataCarrusel)
  }

  agruparData (arr: any, len: number) {
    let dataAgrupado = [],
        i = 0,
        n = arr.length;
  
    while (i < n) {
      dataAgrupado.push(arr.slice(i, i += len));
    }
  
    return dataAgrupado;
  }
}
