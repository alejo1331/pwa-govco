import { Component, OnInit } from '@angular/core';
import { CategoriaModel } from 'src/app/tramites/models/categoria.model';
import { CategoriaService } from 'src/app/tramites/services/categoria.service';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.scss']
})
export class CategoriasComponent implements OnInit {
  show = 8;
  Categorias: CategoriaModel[];
  constructor(
    protected serviceCategoria: CategoriaService,

  ) { }

  ngOnInit(): void {
    this.serviceCategoria.ObtenerCategorias().subscribe(data => {
      this.Categorias = data;
    });
  }

  abrirBuscador(objeto:any) {
    if(objeto != undefined) {
      localStorage.setItem("categorias", JSON.stringify({
        categorias: `${objeto.id}|${objeto.nombre}`,
        tipo: 'tramites'
      }));
      window.location.href = encodeURI(location.origin + "/buscador/");
    }
  }
}
