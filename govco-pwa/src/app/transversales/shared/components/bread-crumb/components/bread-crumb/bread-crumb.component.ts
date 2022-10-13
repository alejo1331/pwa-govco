import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd, PRIMARY_OUTLET } from '@angular/router';

import { filter, partition } from 'rxjs/operators';
import { map } from 'rxjs/internal/operators';
import { BreadCrumb } from '../../models/breadcrumb';


@Component({
  selector: 'app-bread-crumb',
  templateUrl: './bread-crumb.component.html',
  styleUrls: ['./bread-crumb.component.scss']
})

export class BreadCrumbComponent implements OnInit {
  breadCrumb: BreadCrumb[];

  @Input() title: string;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges() {
    
  }

}
