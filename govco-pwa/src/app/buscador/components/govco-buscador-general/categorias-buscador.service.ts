import { Injectable,EventEmitter,Output } from '@angular/core';



@Injectable({
  providedIn: 'root'
})
export class CategoriasBuscadorService {

  resultparametros :any;
  @Output() openbuscador: EventEmitter<any> = new EventEmitter();

  toggle(parametrosFiltro:any) {
    this.openbuscador.emit(parametrosFiltro);
    this.resultparametros = parametrosFiltro;
  }

  getParametro()
  {
    return this.resultparametros
  }
}
