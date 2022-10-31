import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface BuscadorParams {
  index : number,
  txtInputBuscador : string,
  txtConsumoApi : string
}

const buscadorParamsInit : BuscadorParams  = {
  index : 0,
  txtInputBuscador : '',
  txtConsumoApi : 'tramite'
}

@Injectable({
  providedIn: 'root'
})
export class BuscadorService {

private buscadorParams$ = new BehaviorSubject<BuscadorParams>(buscadorParamsInit);
private abrirBuscador$ = new BehaviorSubject<boolean>(false);
private sugerenciasBuscador$ = new BehaviorSubject<any>([]);

// Get para obtener los parametros de busqueda
get getBuscadorParams$ (): Observable<BuscadorParams>{
  return this.buscadorParams$.asObservable();
}
// Set para asignar parametros del buscador
setBuscadorParams(buscadorParams:BuscadorParams):void{
  this.buscadorParams$.next(buscadorParams)
}

// Get para obtener el observador de apertura del buscador
get getAbrirBuscador$ (): Observable<boolean>{
  return this.abrirBuscador$.asObservable();
}

// Set para abrir o cerrar el buscador
setAbrirBuscador(abrir : boolean){
  this.abrirBuscador$.next(abrir)
}

// Get para obtener las sugerencias del buscador
get getSugerenciasBuscador$ (): Observable<boolean>{
  return this.sugerenciasBuscador$.asObservable();
}

// Set para agregar las sugerencias del buscador
setSugerenrciasBuscador(sugerencias : any){
  this.sugerenciasBuscador$.next(sugerencias)
}

constructor() { }

}
