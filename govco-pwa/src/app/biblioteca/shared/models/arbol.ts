export default class NivelUno {
    id: number;
    nombre: string;
    favorito: number;
    icono: string;
    imagen:string;
    ruta: string;
    estado:any;
    listaSeccionesNivelDos: NivelDos[]
}

export class NivelDos {
    id: number;
    nombreRecurso: string;
    favorito: number;
    fecha: string;
    nuevo: boolean;
    ruta: string;
    estado:any;
    listaSeccionesNivelTres:NivelTres[]

}

export class NivelTres {
  id: number;
  nombreRecurso: string;
  estado:any;
  nuevo: boolean;
  ruta: string;
  favorito: number;
}
