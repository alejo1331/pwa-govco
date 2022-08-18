import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BuscadorService } from 'src/app/biblioteca/services/buscador-service/buscador-service.service';
import { CategoriasService } from 'src/app/biblioteca/services/categorias-service/categorias-service.service';
import { PublicacionesService } from 'src/app/biblioteca/services/publicaciones-service/publicaciones-service.service';
import Categoria from 'src/app/biblioteca/shared/models/categoria';

declare var $: any;

@Component({
  selector: 'app-buscador-biblioteca',
  templateUrl: './buscador-biblioteca.component.html',
  styleUrls: ['./buscador-biblioteca.component.scss']
})
export class BuscadorBibliotecaComponent implements OnInit {

  categorias: Categoria[];
  tcontenidos: any[];
  contenidoId: string;
  seccionId: string;
  fechaPublicacion: string;
  constructor(public router: Router,
    private categoriasService: CategoriasService,
    private publicacionesService: PublicacionesService,
    private buscadorService: BuscadorService) {
    this.getCategorias();
    this.getTContenidos();
    this.onInitElements();
  }

  ngOnInit() {

    this.buscadorService.currentContenido.subscribe(contenidoId =>
      this.contenidoId = contenidoId
    );

    this.buscadorService.currentSeccion.subscribe(seccionId =>
      this.seccionId = seccionId
    );

    this.buscadorService.currentFecha.subscribe(fecha =>
      this.fechaPublicacion = fecha
    );

  }

  ngAfterViewChecked () {
    if (this.tcontenidos) {  // <-- IMPORTANT!
      //noinspection TypeScriptUnresolvedFunction
      // $('select').selectpicker();
    }
}

  private onInitElements() {
    // $('select').selectpicker();
  }

  getCategorias() {
    this.buscadorService.getSecciones().subscribe((data: Categoria[]) => {
      this.categorias = data;
    }, (error) => {
      console.error(error);
    });
  }

  getTContenidos() {
    this.buscadorService.getTipoContenido().subscribe((data: any[]) => {
      this.tcontenidos = data;
    }, (error) => {
      console.error(error);
    });
  }

  onChangeContenido(contenidoId: string) {
    this.buscadorService.setContenido(contenidoId);
    this.router.navigate(['/resultados/']);
  }

  onChangeSeccion(seccionId: string) {
    this.buscadorService.setSeccion(seccionId);
    this.router.navigate(['/resultados/']);
  }

  onChangeDate(e: any) {
    if(e.year){
      this.buscadorService.setFecha(new Date(e.year, e.month - 1, e.day).toUTCString());
    }else{
      this.buscadorService.setFecha("");
    }
    this.router.navigate(['/resultados/']);
  }

}
