import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-level-two-bread-crumbs',
  templateUrl: './level-two-bread-crumbs.component.html',
  styleUrls: ['./level-two-bread-crumbs.component.scss']
})
export class LevelTwoBreadCrumbsComponent {

  @Input() codigo: string = '';
  @Input() title: string = '';
  @Input() categoria: any;


}
