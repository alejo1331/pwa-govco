import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'govco-app-lo-mas-consultado',
  templateUrl: './lo-mas-consultado.component.html',
  styleUrls: ['./lo-mas-consultado.component.css']
})
export class LoMasConsultadoComponent implements OnInit {

  public data_mas_consultado: data_mas_consultado[];

  constructor(
  ) { }

  ngOnInit(): void {
    this.data_mas_consultado = [
      {
        link: '/noticias',
        titulo: 'Actualización del Registro Único Tributario RUT'
      },
      {
        link: 'https://m.www.gov.co/categorias-subcategorias/17',
        titulo: 'Inscripción en el Registro Único Tributario RUT'
      },
      {
        link: '/noticias',
        titulo: 'Registro sanitario o renovación de medicamentos'
      }
      ,
      {
        link: 'https://m.www.gov.co/categorias-subcategorias/17',
        titulo: 'Afiliación en forma colectiva al sistema de seguridad social integral kalsdkl akjdslkam slkdmlaks askjfkasjn lijsa'
      }
    ]
  }

}

export interface data_mas_consultado {
  link: string,
  titulo: string
}
