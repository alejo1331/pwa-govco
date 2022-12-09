import { Component, OnInit } from '@angular/core';
import { ObtenerBannerNoticiaRespuesta, ListadoActualidadNoticia, CabeceraActualidad, DataNoticias } from '../../models/NoticiasModel';
import { HomeService } from '../../services/home.service';

@Component({
  selector: 'app-seccion-actualidad',
  templateUrl: './seccion-actualidad.component.html',
  styleUrls: ['./seccion-actualidad.component.scss']
})
export class SeccionActualidadComponent implements OnInit {

  public titulo = "";
  public descripcion = "";
  botonTexto: string = '';
  public dataNoticias: ListadoActualidadNoticia[] = [];
  public noticiasError: boolean = false;
  public noticiasEmpty: boolean = false;

  constructor(private homeService: HomeService) { }

  ngOnInit(): void {
    // this.homeService.obtenerNoticias().subscribe(
    //   (data: ObtenerBannerNoticiaRespuesta) => {
    //     if (data.succeeded) {
    //       this.titulo = data.data.banner.titulo;
    //       this.descripcion = data.data.banner.descripcion;
    //       if (data.data.noticias.length > 0) {
    //         this.dataNoticias = data.data.noticias.slice(0, 2);
    //       } else {
    //         this.noticiasEmpty = true;
    //       }
    //     } else {
    //       console.log('error al consultar noticias.');
    //       this.noticiasError = true;
    //     }
    //   }
    // )

    this.homeService.obtenerActualidadGeneral().subscribe((actualidad: CabeceraActualidad) => {
      if (actualidad.succeeded) {
        this.botonTexto = actualidad.data.botonTexto;
        this.descripcion = actualidad.data.descripcion;
        this.titulo = actualidad.data.titulo;
      } else {
        console.log('error al consultar noticias.');
        this.noticiasError = true;
      }
    })

    this.homeService.obtenerCotenidoNoticias().subscribe((noticias: DataNoticias) => {
      if (noticias.succeeded) {
        noticias.data.forEach((data) => {
          this.dataNoticias.push({
            id: data.id,
            titulo: data.titulo,
            sumario: data.sumario,
            cuerpo: data.cuerpo,
            imagen: data.imagen,
            fecha: data.fecha,
            idEstado: data.idEstado,
            idCategoria: data.idCategoria,
            idSubCategoria: data.idSubCategoria,
            textoFecha: data.textoFecha,
            codigoEntidad: data.codigoEntidad,
            estado: data.estado,
          })
        })
      }
    })
  }


  async shareNews(noticia: any) {
    let shareData = {
      url: '/noticias/detalle/' + noticia.id,
      title: noticia.titulo
    }

    try {
      await navigator.share(shareData);
    } catch (err) {
      console.log('error al compartir noticia.');
    }
  }

}
