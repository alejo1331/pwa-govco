import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
// @ts-ignore
import ASCIIFolder from 'fold-to-ascii';
import { STOPWORD } from '../models/dataSugerenciasModel';

export interface BuscadorParams {
  index : number,
  txtInputBuscador : string,
  txtConsumoApi : string,
  aplicaGeoreferenciacion: string
}

const buscadorParamsInit : BuscadorParams  = {
  index : 0,
  txtInputBuscador : '',
  txtConsumoApi : 'tramite',
  aplicaGeoreferenciacion: 'si'
}

@Injectable({
  providedIn: 'root'
})
export class BuscadorService {
  private buscadorParams$ = new BehaviorSubject<BuscadorParams>(buscadorParamsInit);
  private abrirBuscador$ = new BehaviorSubject<boolean>(false);
  private sugerenciasBuscador$ = new BehaviorSubject<any>([]);
  private stopWord = STOPWORD;

  // Get para obtener los parametros de busqueda
  get getBuscadorParams$ (): Observable<BuscadorParams>{
    return this.buscadorParams$.asObservable();
  }
  // Set para asignar parametros del buscador
  setBuscadorParams(buscadorParams:BuscadorParams):void{
    this.buscadorParams$.next(buscadorParams)
  }

  get getBuscadorParams(): BuscadorParams {
    return this.buscadorParams$.getValue();
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

  fnSugerenciasSintaxis(texto: string , longitudMin:any){
    const simbolos = ['.', '-', '_']; 
    texto = texto.trim();
    //Eliminar los caracteres especiales en el ultimo caracter
    const ultimoCaracter: string  = texto.substring(texto.length, texto.length - 1);

    if (simbolos.includes(ultimoCaracter))
      texto = texto.substring(0,texto.length-1);

    const caracter = texto.charAt(longitudMin-1);
    const cacterersig = texto.charAt(longitudMin  );
    let cortar = 1;
    if (texto.split(' ').length > 1) {  // Si tiene mas de una palabara
      if (longitudMin < texto.length) {
        if (caracter == ' ') {  // Si la longitud maxima es en un espacio
          texto = texto.substring(0 ,longitudMin -1 ).trim();
        } else if (caracter != ' ' && cacterersig !=' ') { // Si la longitud maxima esta en una palabara
          texto = texto.substring(0 ,longitudMin+1).trim();
          cortar=2;
        } else { 
          texto = texto.substring(0 ,longitudMin+1).trim(); 
        }
      }

      const txtArray = texto.split(' ');  // La frase dividas en palabras
      texto = '';
      let swStopWord = true;
      for (let i = txtArray.length - cortar; i >=0; i--) { // Recorremos de atras hacia adelante la frase para validar su terminación
        let pos = this.stopWord.indexOf(txtArray[i]);          // Verificar si la ultima palabra es un stopword
        if (pos <0 && swStopWord)
          swStopWord = false;

        if (!swStopWord)
          texto =  txtArray[i] + ' ' +  texto ;
      }
    }
    return texto;
  }

  fnResaltarCoincidenciasXPalabras(texto:any, buscarQue:any, ignorarMayMin:any) {
    buscarQue = buscarQue.trim();
    texto = texto.replaceAll(/[¿!¡"#$%&'()*+,-/:;<=>?@^_‘{|}~]/g, "").trim();
    let posicion: number;
    let auxTexto: string = ASCIIFolder.foldReplacing(texto.toLowerCase());
    let auxBuscarQue: string = ASCIIFolder.foldReplacing(buscarQue.toLowerCase());
    let listaPalabra: any[]=[];
    let largo: number = auxBuscarQue.length;
    texto = ASCIIFolder.foldReplacing(texto.toLowerCase());
    posicion = auxTexto.indexOf(auxBuscarQue);
    if ( posicion == -1 ) {  // Si la palabra o frase a buscar no coincide totalmente, se realiza el resaltado por c/u de las palabras.
      let contar = auxTexto.indexOf(' ');
      if (contar > 0) {
        const txtArray = buscarQue.split(' ');
        for (var j = 0 ; j <= txtArray.length-1; j++) {
          let pos = this.stopWord.indexOf(txtArray[j]);  // Verificar si es un stopword
          if (pos < 0 ){ // Al no ser stop Word se guarda la palabra a resaltar
            if (!listaPalabra.find(x => x === txtArray[j]))
              listaPalabra.push(txtArray[j]);
          }
        }

        for (const cadena of listaPalabra) {
          if (cadena != '' && cadena.length > 1) {
            const reemplazarCon = "<span>" + cadena.replace(/\$(?=[$&`'\d])/g, "$$$$") + "</span>";
            texto = texto.replaceAll(cadena, reemplazarCon);
          }
        }
      }
    } else {
      posicion = auxTexto.indexOf(auxBuscarQue);
      while ( posicion != -1 ) {
        let textoEncontrado = texto.substring(posicion, posicion + largo);
          if (!listaPalabra.includes(textoEncontrado))
          listaPalabra.push(textoEncontrado);
        posicion = auxTexto.indexOf(auxBuscarQue, posicion + 1);
      }

      for (const cadena of listaPalabra) {
        const reemplazarCon = "<span>" + cadena.replace(/\$(?=[$&`'\d])/g, "$$$$") + "</span>";
        texto = texto.replaceAll(cadena,reemplazarCon);
        
      }
    }
    return texto;
  }
}
