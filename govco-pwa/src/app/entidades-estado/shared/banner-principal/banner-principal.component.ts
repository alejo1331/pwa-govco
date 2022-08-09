import { Component, Input, OnInit } from '@angular/core';
import { ApiCrossService } from 'src/app/participa/services/api-cross.service';

@Component({
  selector: 'app-banner-principal',
  templateUrl: './banner-principal.component.html',
  styleUrls: ['./banner-principal.component.css']
})
export class BannerPrincipalComponent implements OnInit {

  title: string = '';
  description: string = '';
  @Input() codigo: string;

  constructor(private apiCrossService: ApiCrossService) { }

  ngOnInit(): void {

    this.apiCrossService.getTitleAndDescription(this.codigo)
    .subscribe((resp) => {
      if(resp){
        this.title = resp.data.titulo?resp.data.titulo:"";
        this.description = resp.data.descripcion?resp.data.descripcion:"";
      }
    })
  }

}
