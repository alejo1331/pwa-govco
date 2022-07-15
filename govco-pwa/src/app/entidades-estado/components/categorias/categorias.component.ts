import { Component, OnInit } from '@angular/core';
import { CategoriaModel } from '../../models/categoria-model';
import { CategoriaService } from '../../services/categorias-service/categorias-service.service';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.scss']
})
export class CategoriasComponent implements OnInit {
  show = 4;
  Categorias: CategoriaModel[];

  constructor(private categoriaService: CategoriaService) {
  }

  ngOnInit() {
    this.cargarCategorias();
  }

  cargarCategorias() {
    this.categoriaService.ObtenerCategorias().subscribe(data => {
      this.Categorias = data;
    });
  }
  abrirBuscador(objeto: any) {
    if (objeto != undefined) {
      let parametrosFiltro = { "categorias": objeto.id + "|" + objeto.nombre, "tipo": "entidades" };
      localStorage.setItem("categorias", JSON.stringify(parametrosFiltro))
      let redireccion = encodeURI(location.origin + "/buscador/");
      window.location.href = redireccion;
    }
  }

}
