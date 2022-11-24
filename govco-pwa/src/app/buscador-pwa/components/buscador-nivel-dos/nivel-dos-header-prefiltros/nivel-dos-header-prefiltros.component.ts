import { Component, OnInit } from '@angular/core';
import { BuscadorService, BuscadorParams } from 'src/app/buscador-pwa/services/buscador.service';
import { ItemsBuscador } from 'src/variables-globales/items-buscador';

@Component({
  selector: 'app-nivel-dos-header-prefiltros',
  templateUrl: './nivel-dos-header-prefiltros.component.html',
  styleUrls: ['./nivel-dos-header-prefiltros.component.scss']
})
export class NivelDosHeaderPrefiltrosComponent implements OnInit {
  tramiteIndex : number = 0;
  estadoClick = false;
  buscadorParams : BuscadorParams;
  constructor(
    private buscadorService : BuscadorService
  ) { }

  ngOnInit() {
    this.buscadorService.getBuscadorParams$.subscribe(
      (parametros : BuscadorParams) => {
        this.tramiteIndex = parametros.index;
        this.buscadorParams = parametros;
        let currentActive = document.getElementsByClassName('filtro-active')[0];
        if (currentActive){
          currentActive.classList.remove('filtro-active');
        }
        let tramiteSelected = document.getElementsByClassName('govco-pwa-prefiltro-element')[this.tramiteIndex]
        tramiteSelected.classList.add('filtro-active');
        let container : any = document.getElementById(this.tramiteIndex.toString())?.offsetLeft;
        document.getElementById('govco-pwa-prefiltros-container')!.scrollLeft = 0;
        document.getElementById('govco-pwa-prefiltros-container')!.scrollLeft += (container - 8);
        this.estadoClick = false
      }
    )
  }

  changePrefilter(index:number){
    let textoInputBuscador : any = document.getElementById('buscador-pwa');
    let currentActive = document.getElementsByClassName('filtro-active')[0];
    if (currentActive){
    currentActive.classList.remove('filtro-active')
    }
    let activePrefilter = document.getElementsByClassName('govco-pwa-prefiltro-element')[index]
    activePrefilter.classList.add('filtro-active')
    const nuevosBuscadorParams : BuscadorParams ={
    index : index,
    txtInputBuscador: textoInputBuscador.value,
    txtConsumoApi: ItemsBuscador[index].txtConsumoApi,
    aplicaGeoreferenciacion: ItemsBuscador[index].aplicaGeoreferenciacion
    }
    this.buscadorService.setBuscadorParams(nuevosBuscadorParams)

  }

}
