import { Component, Input, OnInit } from '@angular/core';
import { BannerInternasService } from '../../services/banner-internas-service/banner-internas.service';

@Component({
  selector: 'app-banner-secciones-internas',
  templateUrl: './banner-secciones-internas.component.html',
  styleUrls: ['./banner-secciones-internas.component.scss']
})
export class BannerSeccionesInternasComponent implements OnInit {

  @Input() codigo: string = '';
  
  title: string = '';
  description: string = '';

  constructor(private categoriasService: BannerInternasService) { }

  ngOnInit(): void {
    this.categoriasService.getTitleAndDescription(this.codigo)
    .subscribe((resp) => {
      console.log("olii",resp)
      if(this.codigo){
        this.title = resp.data.titulo;
        this.description = resp.data.descripcion;
      } else {
        console.error('El BannerPrincipal requiere un código valido obligatorio')
      }
    })
  }

}
