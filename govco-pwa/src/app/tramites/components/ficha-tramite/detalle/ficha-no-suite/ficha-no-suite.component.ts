import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-ficha-no-suite',
  templateUrl: './ficha-no-suite.component.html',
  styleUrls: ['./ficha-no-suite.component.scss']
})
export class FichaNoSuiteComponent implements OnInit {
  @Input() informacionFicha: any;

  constructor() { }

  ngOnInit(): void {
  }

}
