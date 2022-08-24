import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-level-two-bread-crumbs',
  templateUrl: './level-two-bread-crumbs.component.html',
  styleUrls: ['./level-two-bread-crumbs.component.scss']
})
export class LevelTwoBreadCrumbsComponent implements OnInit {

  @Input() codigo: string = '';
  @Input() title: string = '';
  @Input() categoria: any;

  constructor() { }

  ngOnInit(): void {
  }

}
