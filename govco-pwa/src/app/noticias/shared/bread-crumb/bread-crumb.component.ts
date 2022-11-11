import { Component, Input } from '@angular/core';

@Component({
  selector: 'noticias-govco-bread-crumb',
  templateUrl: './bread-crumb.component.html',
  styleUrls: ['./bread-crumb.component.scss']
})
export class BreadCrumbComponent  {

  @Input() title: string;

}
