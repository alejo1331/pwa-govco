import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
// @ts-ignore
import ASCIIFolder from 'fold-to-ascii';

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
  const stopWord = [ "a",	        "al",		"algo",	"algunas",	"algunos",  "ante",	"antes",	"como",	"con",
      "contra",	"cual","cuando",	"de",    "del",	"desde","donde",	"durante",
      "e",	"el",	"ella",	"ellas",   "ellos",	"en",	"entre",	"era",
      "erais",	"eramos",	"eran",	"eras",   "eres",	"es",	"esa",	"esas",
      "ese",	"eso",	"esos",	"esta",         "estaba",	"estabais",	"estabamos",	"estaban",
      "estabas",	"estada",	"estadas",	"estado",   "estados",	"estais",	"estamos",	"estan",
      "estando",	"estar",	"estara",	"estaran",     "estaras",	"estare",	"estareis",	"estaremos",
      "estaria",	"estariais",	"estariamos",	"estarian",  "estarias",	"estas",	"este",	"esteis",
      "estemos",	"esten",	"estes",	"esto",      "estos",	"estoy",	"estuve",	"estuviera",
      "estuvierais",	"estuvieramos",	"estuvieran",	"estuvieras",   "estuvieron",	"estuviese",	"estuvieseis",	"estuviesemos",
      "estuviesen",	"estuvimos",	"estuviste",	"estuvisteis",     "estuvo",	"fue",	"fuera",	"fuerais",
      "fueramos",	"fueran",	"fueras",	"fueron",   "fuese",	"fueseis",	"fuesemos",	"fuesen",
      "fueses",	"fui",	"fuimos",	"fuiste",      "fuisteis",	"ha",	"habeis",	"habia",
      "habiais",	"habiamos",	"habian",	"habias",   "habida",	"habidas",	"habido",	"habidos",
      "habiendo",	"habra",	"habran",	"habras",    "habre",	"habreis",	"habremos",	"habria",
      "habriais",	"habriamos",	"habrian",	"habrias",   "han",		"has",	"hasta",	"hay",
      "haya",		"hayais",	"hayamos",	"hayan",       "hayas",	"he",	"hemos",	"hube",
      "hubiera",	"hubierais",	"hubieramos",	"hubieran",      "hubieras",	"hubieron",	"hubiese",	"hubieseis",
      "hubiesemos",	"hubiesen",	"hubieses",	"hubimos",  "hubiste",	"hubisteis",	"hubo",
      "la",		"las",		"le",		"les",      "lo",		"los",		"mas",		"me",
      "mi",		"mi",		"mia",		"mias",   "mio",		"mios",		"mis",		"mucho",
      "muchos",	"muy",		"nada",		"ni",     "no",		"nos",		"nosotras",	"nosotros",
      "nuestra",	"nuestras",	"nuestro",	"nuestros",   "o",		"os",		"otra",		"otras",
      "otro",		"otros",	"para",		"pero",       "poco",		"por",	"porque",	"que",
      "quien",	"quienes",	"se",		"sea",       "seais",	"seamos",	"sean",		"seas",
      "sera",		"seran",	"seras",	"sere",      "sereis",	"seremos",	"seria",	"seriais",
      "seriamos",	"serian",	"serias",	"si",        "sido",		"siendo",	"sin",		"sobre",
      "sois",		"somos",	"son",		"soy",       "su",		"sus",	"suya",		"suyas",
      "suyo",		"suyos",	"tambien",	"tanto",     "te",		"tendra",	"tendran",	"tendras",
      "tendre",	"tendreis",	"tendremos","tendria",   "tendriais",	"tendriamos",	"tendrian",	"tendrias",
      "tened",	"teneis",	"tenemos",	"tenga",    "tengais",	"tengamos",	"tengan",	"tengas",
      "tengo",	"tenia",	"teniais",	"teniamos",  "tenian",	"tenias",	"tenida",	"tenidas",
      "tenido",	"tenidos",	"teniendo",	"ti",        "tiene",	"tienen",	"tienes",	"todo",
      "todos",	"tu",	"tus",		"tuve",          "tuviera",	"tuvierais",	"tuvieramos",	"tuvieran",
      "tuvieras",	"tuvieron",	"tuviese",	"tuvieseis",  "tuviesemos",	"tuviesen",	"tuvieses",	"tuvimos",
      "tuviste",	"tuvisteis",	"tuvo",		"tuya",   "tuyas",	"tuyo",	"tuyos",	"un",
      "una",		"uno",	"unos",		"vosotras",       "vosotros",	"vuestra",	"vuestras",	"vuestro",
      "vuestros",	"y",	"ya",		"yo"
      ];

  texto = texto.trim();
  //Eliminar los caracteres especiales en el ultimo caracter
  var ultimoCaracter: string  = texto.substring(texto.length, texto.length - 1);

  if (simbolos.find(caracter => caracter === ultimoCaracter))
      texto = texto.substring(0,texto.length-1);

  var caracter     = texto.charAt(longitudMin-1);
  var cacterersig  = texto.charAt(longitudMin  );
  var cortar = 1;
  if (texto.split(' ').length > 1) {  // Si tiene mas de una palabara
      if (longitudMin  >= texto.length) {
          caracter=' ';   cacterersig =' ';
      } else if (caracter == ' ') {  // Si la longitud maxima es en un espacio
          texto = texto.substring(0 ,longitudMin -1 ).trim();
      } else if (caracter != ' ' && cacterersig !=' ') { // Si la longitud maxima esta en una palabara
          texto = texto.substring(0 ,longitudMin+1).trim();
          cortar=2;
      } else { 
        texto = texto.substring(0 ,longitudMin+1).trim(); 
      }

      var txtArray = texto.split(' ');  // La frase dividas en palabras
      texto ='';
      var  swStopWord = true;
      for (var i = txtArray.length - cortar ; i >=0; i--) { // Recorremos de atras hacia adelante la frase para validar su terminación
          let pos = stopWord.indexOf(txtArray[i]);          // Verificar si la ultima palabra es un stopword
          if (pos <0 && swStopWord)
              swStopWord = false;

          if (!swStopWord)
              texto =  txtArray[i] + ' ' +  texto ;
      }
  }
  return texto;
}

fnResaltarCoincidenciasXPalabras(texto:any, buscarQue:any, ignorarMayMin:any){
  const stopWord = [ "a",	        "al",		"algo",	"algunas",	"algunos",  "ante",	"antes",	"como",	"con",
  "contra",	"cual","cuando",	"de",    "del",	"desde","donde",	"durante",
  "e",	"el",	"ella",	"ellas",   "ellos",	"en",	"entre",	"era",
  "erais",	"eramos",	"eran",	"eras",   "eres",	"es",	"esa",	"esas",
  "ese",	"eso",	"esos",	"esta",         "estaba",	"estabais",	"estabamos",	"estaban",
  "estabas",	"estada",	"estadas",	"estado",   "estados",	"estais",	"estamos",	"estan",
  "estando",	"estar",	"estara",	"estaran",     "estaras",	"estare",	"estareis",	"estaremos",
  "estaria",	"estariais",	"estariamos",	"estarian",  "estarias",	"estas",	"este",	"esteis",
  "estemos",	"esten",	"estes",	"esto",      "estos",	"estoy",	"estuve",	"estuviera",
  "estuvierais",	"estuvieramos",	"estuvieran",	"estuvieras",   "estuvieron",	"estuviese",	"estuvieseis",	"estuviesemos",
  "estuviesen",	"estuvimos",	"estuviste",	"estuvisteis",     "estuvo",	"fue",	"fuera",	"fuerais",
  "fueramos",	"fueran",	"fueras",	"fueron",   "fuese",	"fueseis",	"fuesemos",	"fuesen",
  "fueses",	"fui",	"fuimos",	"fuiste",      "fuisteis",	"ha",	"habeis",	"habia",
  "habiais",	"habiamos",	"habian",	"habias",   "habida",	"habidas",	"habido",	"habidos",
  "habiendo",	"habra",	"habran",	"habras",    "habre",	"habreis",	"habremos",	"habria",
  "habriais",	"habriamos",	"habrian",	"habrias",   "han",		"has",	"hasta",	"hay",
  "haya",		"hayais",	"hayamos",	"hayan",       "hayas",	"he",	"hemos",	"hube",
  "hubiera",	"hubierais",	"hubieramos",	"hubieran",      "hubieras",	"hubieron",	"hubiese",	"hubieseis",
  "hubiesemos",	"hubiesen",	"hubieses",	"hubimos",  "hubiste",	"hubisteis",	"hubo",
  "la",		"las",		"le",		"les",      "lo",		"los",		"mas",		"me",
  "mi",		"mi",		"mia",		"mias",   "mio",		"mios",		"mis",		"mucho",
  "muchos",	"muy",		"nada",		"ni",     "no",		"nos",		"nosotras",	"nosotros",
  "nuestra",	"nuestras",	"nuestro",	"nuestros",   "o",		"os",		"otra",		"otras",
  "otro",		"otros",	"para",		"pero",       "poco",		"por",	"porque",	"que",
  "quien",	"quienes",	"se",		"sea",       "seais",	"seamos",	"sean",		"seas",
  "sera",		"seran",	"seras",	"sere",      "sereis",	"seremos",	"seria",	"seriais",
  "seriamos",	"serian",	"serias",	"si",        "sido",		"siendo",	"sin",		"sobre",
  "sois",		"somos",	"son",		"soy",       "su",		"sus",	"suya",		"suyas",
  "suyo",		"suyos",	"tambien",	"tanto",     "te",		"tendra",	"tendran",	"tendras",
  "tendre",	"tendreis",	"tendremos","tendria",   "tendriais",	"tendriamos",	"tendrian",	"tendrias",
  "tened",	"teneis",	"tenemos",	"tenga",    "tengais",	"tengamos",	"tengan",	"tengas",
  "tengo",	"tenia",	"teniais",	"teniamos",  "tenian",	"tenias",	"tenida",	"tenidas",
  "tenido",	"tenidos",	"teniendo",	"ti",        "tiene",	"tienen",	"tienes",	"todo",
  "todos",	"tu",	"tus",		"tuve",          "tuviera",	"tuvierais",	"tuvieramos",	"tuvieran",
  "tuvieras",	"tuvieron",	"tuviese",	"tuvieseis",  "tuviesemos",	"tuviesen",	"tuvieses",	"tuvimos",
  "tuviste",	"tuvisteis",	"tuvo",		"tuya",   "tuyas",	"tuyo",	"tuyos",	"un",
  "una",		"uno",	"unos",		"vosotras",       "vosotros",	"vuestra",	"vuestras",	"vuestro",
  "vuestros",	"y",	"ya",		"yo"
  ];

   buscarQue = buscarQue.trim();
   var reemplazarQue = buscarQue.replace(/[\\^$|?*+()[{]/g, "\\$&");
   var reemplazarCon = "" + buscarQue.replace(/\$(?=[$&`'\d])/g, "$$$$") + "";
   var listaPalabra  : any[]=[];

 texto = texto.replaceAll(/[¿!¡"#$%&'()*+,-/:;<=>?@^_‘{|}~]/g, "").trim();
 let posicion: number;
 let auxTexto: string = ASCIIFolder.foldReplacing(texto.toLowerCase());
 let auxBuscarQue: string = ASCIIFolder.foldReplacing(buscarQue.toLowerCase());

let modif: string ="";
var listaPalabra: any[]=[];
let largo: number = auxBuscarQue.length;
texto = ASCIIFolder.foldReplacing(texto.toLowerCase());
 posicion = auxTexto.indexOf(auxBuscarQue);
  if ( posicion == -1 ){  // Si la palabra o frase a buscar no coincide totalmente, se realiza el resaltado por c/u de las palabras.
      let contar = auxTexto.indexOf(' ');
        if (contar > 0) {
            var txtArray = buscarQue.split(' ');
                for (var j = 0 ; j <= txtArray.length-1; j++) {
                    let pos = stopWord.indexOf(txtArray[j]);  // Verificar si es un stopword
                        if (pos < 0 ){ // Al no ser stop Word se guarda la palabra a resaltar
                            if (!listaPalabra.find(x => x === txtArray[j]))
                                      listaPalabra.push(txtArray[j]);
                        }
                }
                  //texto = ASCIIFolder.foldReplacing(texto.toLowerCase());

                   for (let i = 0; i < listaPalabra.length; i++) {
                      const cadena = listaPalabra[i];
                      if   (cadena != '' && cadena.length > 1) {
                              var reemplazarQue = listaPalabra[i].replace(/[\\^$.|?*+()[{]/g, "\\$&");
                              modif = "g" + (ignorarMayMin ? "i" : "");
                              new RegExp(reemplazarQue, modif);

                              var reemplazarCon = "<span>" + listaPalabra[i].replace(/\$(?=[$&`'\d])/g, "$$$$") + "</span>";
                              texto = texto.replaceAll(listaPalabra[i], reemplazarCon);
                          }
                  }
              }
  }else {
       posicion = auxTexto.indexOf(auxBuscarQue);
       while ( posicion != -1 ) {
           let textoEncontrado = texto.substring(posicion, posicion + largo);
               if (!listaPalabra.find(x => x === textoEncontrado))
               listaPalabra.push(textoEncontrado);
           posicion = auxTexto.indexOf(auxBuscarQue, posicion + 1);
       }

       var reemplazarQue = buscarQue.replace(/[\\^$.|?*+()[{]/g, "\\$&");
       modif = "g" + (ignorarMayMin ? "i" : "");
       for (let i = 0; i < listaPalabra.length; i++) {
           new RegExp(reemplazarQue, modif);
           var reemplazarCon = "<span>" + listaPalabra[i].replace(/\$(?=[$&`'\d])/g, "$$$$") + "</span>";
           texto = texto.replaceAll(listaPalabra[i],reemplazarCon);
       }
  }
 return texto;
}


}
