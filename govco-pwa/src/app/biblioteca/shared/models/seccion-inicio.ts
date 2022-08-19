export default class SeccionInicio {
    inicio:Inicio;
    seccionesNivelUno:SeccionesNivelUno[];
}


export class Inicio {
    nombre:string;
    descripcion:string;
    descripcionBreve:string;
    textoHipervinculo:string;
}

export class SeccionesNivelUno {
  id:number;
  nombre:string;
  descripcion:string;
  imagen:string;
  tipoVisualizacion:number;
  textoHipervinculo:string;
  recursos:Recursos[];
  ruta:string;
}


export class Recursos {
  id:number;
  tipoRecurso:string;
  nombre:string;
  descripcion:string;
  url:string;
  externo:number;
}
