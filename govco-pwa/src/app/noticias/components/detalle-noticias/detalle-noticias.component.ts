import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NoticiasServiceService } from 'src/app/noticias/services/noticias-service.service';
import { NoticiaPublicadaModel } from 'src/app/noticias/models/noticiaPublicadaModel';
import { SidenavService } from 'src/app/transversales/services/sidenav-service/sidenav-service.service';
import { HeaderService } from 'src/app/transversales/services/header-service/header.service';

@Component({
  selector: 'noticias-govco-detalle-noticias',
  templateUrl: './detalle-noticias.component.html',
  styleUrls: ['./detalle-noticias.component.scss']
})
export class DetalleNoticiasComponent implements OnInit {
  public idRecurso: string ;
  noticiasError: boolean = false;
  loadingInfo: boolean = true;
  noticia: NoticiaPublicadaModel;
  estadoCargaActualidad: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private noticiasService: NoticiasServiceService,
    protected servicioSideNav: SidenavService,
    protected servicioHeader: HeaderService) { }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.servicioHeader.estadoHeader(true, true);
    this.servicioSideNav.seleccionandoItem(true, 'noticias');

    this.activatedRoute.url.subscribe(() => {
      this.idRecurso = this.activatedRoute.snapshot.paramMap.get('id')!;
      this.estadoCargaActualidad = true;
      this.obtenerDetalleNoticia();
    });
  }

  obtenerDetalleNoticia() {
    this.noticiasService.obtenerDetalleNoticia(this.idRecurso).subscribe(
      (data: NoticiaPublicadaModel) => {
        this.loadingInfo = false;
        this.noticia = data;
      }
    );
  }


}
