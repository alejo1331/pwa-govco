import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoriasService } from '../../services/categorias-service/categorias-service.service';
import { HeaderBibliotecaService } from '../../services/header-service/header-biblioteca-service.service';
import { PublicacionesService } from '../../services/publicaciones-service/publicaciones-service.service';
import { ValidarUrlService } from '../../services/validar-url-service/validar-url-service.service';
import Categoria from '../../shared/models/categoria';
import SeccionNivelUno from '../../shared/models/seccion-niveles';

declare var $: any;

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.scss']
})
export class CategoriasComponent implements OnInit {

  articulosInteres: any = [];
  infoCategoria: Categoria = new Categoria();
  // importantes: ArchivosPublicacion[] = [];
  importante = {};
  datos: any[];
  seccionNivelUno: SeccionNivelUno;

  categoria: string;
  query: string = '';
  cargando: boolean = true;

  constructor(private categoriasService: CategoriasService,
    private activatedRoute: ActivatedRoute,
    private headerService: HeaderBibliotecaService,
    private validarUrlService: ValidarUrlService,
    private publicacionesService: PublicacionesService) { }

  ngOnInit() {
    this.onInitElements();
    this.headerService.currentTitle.subscribe(categoria => this.categoria = categoria);

    this.activatedRoute.url.subscribe(() => {
      this.categoria = this.activatedRoute.snapshot.paramMap.get('categoria')!;
      //this.getInfoCategoria(this.categoria);
      this.headerService.setTitle(this.categoria);

      //this.getPublicacionesByCategoria(this.categoria);

      this.obtenerSeccionNivelUnoPortal(this.activatedRoute.snapshot.paramMap.get('id')!);
    });

  }

  private onInitElements() {
    $('select').selectpicker();
  }

  private getInfoCategoria(categoria: string) {
    this.categoriasService.getCategoriaByNombre(categoria).subscribe((data) => {
      this.infoCategoria = data;
    }, (error) => {
      console.error(error);
    });
  }

  // private getPublicacionesByCategoria(categoria: string) {

  //   this.publicacionesService.getPublicacionesByCategoria(categoria).subscribe((data) => {

  //     if (data.length > 0) {
  //       this.importantes = data.filter(d => d.destacado == 1);
  //       this.datos = data.filter(d => d.destacado != 1);
  //       this.cargando = false;
  //     } else {
  //       this.importantes = undefined;
  //       this.datos = undefined;
  //       this.cargando = false;
  //     }
  //   }, (error) => {

  //     this.cargando = false;
  //     console.error(error);

  //   });

  // }

  private obtenerSeccionNivelUnoPortal(nivel: string) {
    this.publicacionesService.obtenerSeccionNivelUnoPortal(nivel).subscribe((data: SeccionNivelUno) => {
      this.seccionNivelUno = data;

    }, (error) => {

      this.cargando = false;
      console.error(error);

    });

  }

  hyphenateUrlParams(str: string) {
    return str.split(' ').join('-').toLowerCase();
  }

  abrirRecurso(data: any) {
    this.validarUrlService.openLink(data.url);
  }

}
