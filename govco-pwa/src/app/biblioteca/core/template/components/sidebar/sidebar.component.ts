import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BuscadorService } from 'src/app/biblioteca/services/buscador-service/buscador-service.service';
import Menu from 'src/app/biblioteca/shared/models/menu';
import { NivelUno } from 'src/app/biblioteca/shared/models/seccion-niveles';
import { HeaderService } from 'src/app/transversales/services/header-service/header.service';
import { MenuService } from '../../services/menu-service/menu-service.service';
import { skip } from 'rxjs/operators';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  
  query: string = '';
  menu: Menu[];
  arbol: any[];
  inicio: NivelUno;
  categoria: string;
  constructor(private menuService: MenuService,
    private headerService: HeaderService,
    private buscadorService: BuscadorService,
    private router: Router) { }

  ngOnInit() {
    this.getMenu();
    this.getArbol();
    //this.headerService.currentTitle.subscribe(categoria => this.categoria = categoria);
    this.buscadorService.currentSearch.pipe(skip(1)).subscribe(query => setTimeout(() => {
      this.query = query
    }));
  }

  getMenu() {
    this.menuService.getMenu().subscribe((data) => {
      this.menu = data;
    }, (error) => {
      console.error(error);
    });
  }
  getArbol() {
    this.menuService.getArbol().subscribe((data) => {
      this.arbol =data["data"];
      this.inicio = this.arbol[0];
      this.arbol=this.arbol.slice(1,this.arbol.length);
    }, (error) => {
      console.error(error);
    });
  }

  replaceUrl(url: any){
    let re = /\ /gi;
    url=url.replace(re, "%20");
    return url;
  }

  buscar() {
    this.buscadorService.buscar(this.query);
    this.router.navigate(['/biblioteca/resultados/'], {queryParams: {busqueda: this.query}});
  }

  onChangeSearch(data: any) {
    this.buscadorService.buscar(data);
  }

  show(){
    document.querySelector('#menu')!.classList.toggle("show");
  }

  hyphenateUrlParams(str:string){
    return str.split(' ').join('-').toLowerCase();
  }

}
