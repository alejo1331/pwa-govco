import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-bread-crumb',
  templateUrl: './bread-crumb.component.html',
  styleUrls: ['./bread-crumb.component.scss']
})
export class BreadCrumbComponent implements OnInit {

  @Input() title: string;
  @Input() style: string;
  @Input() codigo: string = '';

  constructor() { }

  ngOnInit(): void {
  }

}
