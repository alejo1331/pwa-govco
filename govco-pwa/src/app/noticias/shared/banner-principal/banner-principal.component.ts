import { Component, Input, OnInit } from '@angular/core';
import { ActualidadPrincipalService } from '../../services/actualidad-principal-service/actualidad-principal.service';

@Component({
  selector: 'app-banner-principal',
  templateUrl: './banner-principal.component.html',
  styleUrls: ['./banner-principal.component.scss']
})
export class BannerPrincipalComponent implements OnInit {

  title: string = '';
  description: string = '';
  @Input() codigo: string;
  @Input() segundoTitulo: string="";

  constructor(private actualidadPrincupalService: ActualidadPrincipalService) { }

  ngOnInit(): void {

    this.actualidadPrincupalService.getTitleAndDescription(this.codigo)
    .subscribe((resp) => {
      if(resp){
        this.title = resp.data.titulo?resp.data.titulo:"";
        this.description = resp.data.descripcion?resp.data.descripcion:"";
      }
    })
  }

}
