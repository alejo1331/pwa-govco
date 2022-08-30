import { Component, OnInit } from '@angular/core';
import { BreadCrumb } from '../../../../models/breadcrumb';
import { BreadCrumbService } from '../../../../services/bread-crumb.service';

@Component({
  selector: 'app-bread-crumb',
  templateUrl: './bread-crumb.component.html',
  styleUrls: ['./bread-crumb.component.scss']
})
export class BreadCrumbComponent implements OnInit {

  breadCrumb: BreadCrumb[];
  title: string;
  titleCiiu: string;
  
  constructor(private breadCrumbService: BreadCrumbService ) {
    this.breadCrumb = [];
  }

  ngOnInit (): void {
    this.tittleChange();
    this.tittleChangeCiiu();
  }

  tittleChange() {
    this.breadCrumbService.titleObserver.subscribe((tittle)=> {
        this.title = tittle;
        //console.log('Suscribe ' + tittle);
    } );
  }
  tittleChangeCiiu() {
    this.breadCrumbService.titleObserverCiiu.subscribe((tittleCiiu)=> {
        this.titleCiiu = tittleCiiu;
    } );
  }

  updateTitle() {
    this.title = '';
    this.titleCiiu = '';
  }

}
