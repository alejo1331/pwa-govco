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
    this.headerService.currentTitle.subscribe(categoria => this.categoria = categoria);

    this.activatedRoute.url.subscribe(() => {
      this.categoria = this.activatedRoute.snapshot.paramMap.get('categoria')!;
      this.headerService.setTitle(this.categoria);
      this.obtenerSeccionNivelUnoPortal(this.activatedRoute.snapshot.paramMap.get('id')!);
    });

  }

  private getInfoCategoria(categoria: string) {
    this.categoriasService.getCategoriaByNombre(categoria).subscribe((data) => {
      this.infoCategoria = data;
    }, (error) => {
      console.error(error);
    });
  }

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
