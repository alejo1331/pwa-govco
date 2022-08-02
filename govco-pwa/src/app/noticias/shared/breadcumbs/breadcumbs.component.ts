import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-breadcumbs',
  templateUrl: './breadcumbs.component.html',
  styleUrls: ['./breadcumbs.component.scss']
})
export class BreadcumbsComponent implements OnInit {

  @Input() title: string = '';
  constructor() { }

  ngOnInit(): void {
  }

}
