import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-acordeon',
  templateUrl: './acordeon.component.html',
  styleUrls: ['./acordeon.component.scss']
})
export class AcordeonComponent implements OnInit {

  public items = [
    {
      active: false,
      titulo: 'Título #1 del acordeón',
      descripcion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam gravida.'
    },
    {
      active: false,
      titulo: 'Título #2 del acordeón',
      descripcion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam gravida.'
    },
    {
      active: false,
      titulo: 'Título #3 del acordeón',
      descripcion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam gravida.'
    }      
  ]

  constructor() { }

  ngOnInit(): void {
  }

  activarItem(index:number) {
    this.items.forEach(function(item){
      item.active = false;
    });
    this.items[index].active = !this.items[index].active;
  }

}
