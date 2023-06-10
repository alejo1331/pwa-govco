import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BottomMenuService } from 'src/app/transversales/services/bottom-menu/bottom-menu.service';
import { HeaderService } from 'src/app/transversales/services/header-service/header.service';
import { SidenavService } from 'src/app/transversales/services/sidenav-service/sidenav-service.service';
import { CategoriasService } from '../../services/categorias/categorias.service';
import { CategoriasModel } from '../../Models/CategoriasModel';

@Component({
  selector: 'govco-app-momentos-de-vida',
  templateUrl: './momentos-de-vida.component.html',
  styleUrls: ['./momentos-de-vida.component.css'],
})
export class MomentosDeVidaComponent implements OnInit {
  title: string = '';
  description: string = '';
  categorias: CategoriasModel[] = [];
  page: number = 0;
  totalCategories: number = 0;
  textMoreCategories: string = 'Ver más momentos de vida';

  constructor(
    private router: Router,
    protected servicioSideNav: SidenavService,
    protected servicioHeader: HeaderService,
    public bottomService: BottomMenuService,
    protected categoriasService: CategoriasService
  ) {}

  ngOnInit(): void {
    this.servicioHeader.estadoHeader(true, true);
    this.bottomService.desactivarSeleccion();

    this.bottomService.ajustandoPantalla(false);
    (document.getElementById('topScroll') as HTMLElement).style.top = '3.5rem';
    (document.getElementById('topScroll') as HTMLElement).scrollTop = 0;

    this.categoriasService
      .getTitleAndDescription('momentosdevida')
      .subscribe((resp) => {
        this.title = resp.data.titulo ? resp.data.titulo : '';
        this.description = resp.data.descripcion ? resp.data.descripcion : '';
      });
    this.listarCategorias();
    this.totalCategorias();
  }

  totalCategorias() {
    this.categoriasService.getCategorias().subscribe((resp: any) => {
      this.totalCategories = resp.data.length;
    });
  }

  listarCategorias() {
    this.categoriasService
      .getCategoriasPaginacion(this.page)
      .subscribe((resp: any) => {
        if (this.categorias.length > 0) {
          this.categorias = this.categorias.concat(resp?.data);
        } else {
          this.categorias = resp?.data;
        }
      });
  }

  cargarMasCategorias() {
    if (Math.ceil(this.totalCategories / 5) > this.page + 1) {
      this.page = this.page + 1;
    } else {
      this.page = 0;
      this.categorias = [];
    }
    this.listarCategorias();
  }

  changeTextButton() {
    if (Math.ceil(this.totalCategories / 5) > this.page + 1) {
      this.textMoreCategories = 'Ver más momentos de vida';
    } else {
      this.textMoreCategories = 'Ver menos momentos de vida';
    }
    return this.textMoreCategories;
  }
}
