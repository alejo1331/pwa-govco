import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-listado-noticias',
  templateUrl: './listado-noticias.component.html',
  styleUrls: ['./listado-noticias.component.scss']
})
export class ListadoNoticiasComponent implements OnInit {

  public dataNoticias = [
    {
      imagen: "https://images.unsplash.com/photo-1533699224246-6dc3b3ed3304?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Y29sb21iaWF8ZW58MHx8MHx8&w=1000&q=80",
      descripcionImagen: "Descripcion de la imagen",
      url: "https://www.gov.co/",
      descripcioUrl:"Descripcion de la ruta",
      titulo: "Conoce Portucolombia, el portal de información turística de Colombia."
    },    
    {
      imagen: "https://images.unsplash.com/photo-1533699224246-6dc3b3ed3304?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Y29sb21iaWF8ZW58MHx8MHx8&w=1000&q=80",
      descripcionImagen: "Descripcion de la imagen",
      url: "https://www.gov.co/",
      descripcioUrl:"Descripcion de la ruta",
      titulo: "Conoce Portucolombia, el portal de información turística de Colombia."
    }
  ];  

  constructor() { }

  ngOnInit(): void {
  }

  async shareNews(noticia:any) {
    let shareData = {
      url : noticia.url,
      title: noticia.titulo
    }  

    try {
      await  navigator.share(shareData);
    } catch (err) {
      console.log('error al compartir noticia.')
    }
  }

}
