import { Component, OnInit } from '@angular/core';
import { ObtenerBannerNoticiaRespuesta, ListadoActualidadNoticia } from '../../models/NoticiasModel';
import { HomeService } from '../../services/home.service';

@Component({
  selector: 'app-seccion-actualidad',
  templateUrl: './seccion-actualidad.component.html',
  styleUrls: ['./seccion-actualidad.component.scss']
})
export class SeccionActualidadComponent implements OnInit {

  public titulo = "";
  public descripcion = "";
  public dataNoticias:ListadoActualidadNoticia[];
  public noticiasError: boolean = false;
  public noticiasEmpty: boolean = false;

  constructor(private homeService: HomeService) { }

  ngOnInit(): void {
    this.homeService.getNoticias().subscribe(
      (data: ObtenerBannerNoticiaRespuesta) => {
        if (data.succeeded) {
          this.titulo = data.data.banner.titulo;
          this.descripcion = data.data.banner.descripcion;
          if (data.data.noticias.length > 0) {
            this.dataNoticias = data.data.noticias;
          } else {
            this.noticiasEmpty = true;
          }
        } else {
          console.log('error al consultar noticias.');
          this.noticiasError = true;
        }
      }
    )
  }

  async shareNews(noticia:any) {
    let shareData = {
      url : '',
      title: noticia.titulo
    }

    try {
      await  navigator.share(shareData);
    } catch (err) {
      console.log('error al compartir noticia.');
    }
  }

}
