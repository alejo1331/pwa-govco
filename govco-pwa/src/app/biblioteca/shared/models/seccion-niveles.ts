export default class SeccionNivelUno {
  nivelUno:NivelUno;
  recursosPriorizados:RecursosPriorizados[];
}
export  class SeccionNivel {
  nivelHijo:NivelHijo;
  recursos:RecursosPriorizados[];
}

export class NivelHijo {
  id:number;
  nombreRecurso:string;
  descripcion:string;
  imagen:string;
  tipoVisualizacion:number;
  textoHipervinculo:string;
  listaSeccionesNivelHijo:NivelHijo[]
}

export class NivelUno {
  id:number;
  nombre:string;
  descripcion:string;
  imagen:string;
  tipoVisualizacion:number;
  textoHipervinculo:string;
  listaSeccionesNivelDos:NivelDos[]
}

export class NivelDos {
  id:number;
  nombreRecurso:string;
  descripcion:string;
  imagen:string;
  tipoVisualizacion:number;
  textoHipervinculo:string;
  listaSeccionesNivelTres:NivelTres[]
}

export class NivelTres {
  id:number;
  nombreRecurso:string;
  descripcion:string;
  imagen:string;
  tipoVisualizacion:number;
  textoHipervinculo:string;
}


export class RecursosPriorizados {
  id:number;
  tipoRecurso:string;
  nombre:string;
  descripcion:string;
  url:string;
  externo:number;
  nivel:string;
  nombreNivelUno:string;
  nombreNivelDos:string;
  nombreNivelTres:string;
  checked:boolean;
}
