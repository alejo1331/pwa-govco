import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-categorias',
  templateUrl: './card-categorias.component.html',
  styleUrls: ['./card-categorias.component.scss']
})
export class CardCategoriasComponent implements OnInit {

  @Input() categoria: any
  @Input() id_: any

  constructor() { }

  ngOnInit(): void {
  }

}
