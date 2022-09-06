import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-boton',
  templateUrl: './boton.component.html',
  styleUrls: ['./boton.component.css']
})
export class BotonComponent implements OnInit {

  @Input() symbol = false;
  @Input() inverted = false;
  @Input() disabled = false;

  constructor() { }

  ngOnInit(): void {
  }

}
