import { Component, OnInit, Input } from '@angular/core';
import { BuscadorService, BuscadorParams } from 'src/app/buscador-pwa/services/buscador.service';

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
        document.getElementById('govco-pwa-prefiltros-container')!.scrollLeft += container;
        this.estadoClick = false
      }
    )
  }

  changePrefilter(index:number, txtApi: string){
   let currentActive = document.getElementsByClassName('filtro-active')[0];
   if (currentActive){
    currentActive.classList.remove('filtro-active')
   }
   let activePrefilter = document.getElementsByClassName('govco-pwa-prefiltro-element')[index]
   activePrefilter.classList.add('filtro-active')
   const nuevosBuscadorParams : BuscadorParams ={
    index : index,
    txtInputBuscador: this.buscadorParams.txtInputBuscador,
    txtConsumoApi: txtApi
   }
   this.buscadorService.setBuscadorParams(nuevosBuscadorParams)

  }

}
