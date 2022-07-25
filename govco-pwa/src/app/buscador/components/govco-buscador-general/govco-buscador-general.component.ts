import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoriasBuscadorService } from './categorias-buscador.service';


@Component({
  selector: 'app-buscador-general',
  templateUrl: './govco-buscador-general.component.html',
  styleUrls: ['./govco-buscador-general.component.scss']
})
export class BuscadorGeneralComponent implements OnInit {
  busqueda: any;
  navegador: string;
  public paramtrofiltros:string;
  statusMenu: boolean = false;


  constructor(private actRoute: ActivatedRoute,
     private categoriasBuscadorService: CategoriasBuscadorService) { }

  ngOnInit() {
    this.navegador = this.getBrowserName();
    if (this.navegador != 'ie') {
      this.actRoute.paramMap.subscribe(params => {
        this.busqueda = params.get('busqueda');
      });
    } else {
      this.busqueda = this.actRoute.snapshot.paramMap.get('busqueda');
    }

    if (this.busqueda == null) { this.busqueda = ''; }
    this.paramtrofiltros= JSON.stringify(this.categoriasBuscadorService.getParametro());
  }

  private getBrowserName() {
    const agent = window.navigator.userAgent.toLowerCase()
    switch (true) {
      case agent.indexOf('edge') > -1:
        return 'edge';
      case agent.indexOf('opr') > -1 && !!(<any>window).opr:
        return 'opera';
      case agent.indexOf('chrome') > -1 && !!(<any>window).chrome:
        return 'chrome';
      case agent.indexOf('trident') > -1:
        return 'ie';
      case agent.indexOf('firefox') > -1:
        return 'firefox';
      case agent.indexOf('safari') > -1:
        return 'safari';
      default:
        return 'other';
    }
  }

}
