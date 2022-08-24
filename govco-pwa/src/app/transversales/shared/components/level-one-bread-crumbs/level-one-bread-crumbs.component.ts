import { Component, Input, OnInit } from '@angular/core';
import { BannerInternasService } from '../../services/banner-internas-service/banner-internas.service';

@Component({
  selector: 'app-level-one-bread-crumbs',
  templateUrl: './level-one-bread-crumbs.component.html',
  styleUrls: ['./level-one-bread-crumbs.component.scss']
})
export class LevelOneBreadCrumbsComponent implements OnInit {

  @Input() codigo: string = '';
  @Input() title: string = '';

  constructor(private bannerInternasService: BannerInternasService) { }

  ngOnInit(): void {
    if(this.codigo){
      this.bannerInternasService.getTitleAndDescription(this.codigo)
        .subscribe((resp) => {
          if(this.codigo){
            this.title = resp.data.titulo
          }else {
            console.error('El componente Breadcumbs require un código valido obligatorio')
          }
        })
    }
  }

}
