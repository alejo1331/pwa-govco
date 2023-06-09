import { Component, Input } from '@angular/core';
import { BreadCrumb } from '../../models/breadcrumb';


@Component({
  selector: 'app-bread-crumb',
  templateUrl: './bread-crumb.component.html',
  styleUrls: ['./bread-crumb.component.scss']
})

export class BreadCrumbComponent {
  breadCrumb: BreadCrumb[];

  @Input() title: string;



}
