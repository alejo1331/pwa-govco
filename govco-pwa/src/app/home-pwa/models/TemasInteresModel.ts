export interface ObtenerTemasInteresRespuesta {
    data: DataTemasInteresRespuesta;
    succeeded: boolean;
    errors: string[] | null;
    message: string;
}

export interface DataTemasInteresRespuesta {
    estadoSeccion: number;
    contenidoPanelInferior: ContenidoPanelInferior[];
    panelSuperior : PanelSuperior;
    panelInferior : PanelInferior;
}

export interface ContenidoPanelInferior {
    id: number;
    idTemasDeInteres: number;
    ordenPresentacion: number;
    descripcion: string;
    estado: boolean;
    fechaModificacion: string;
    titulo: string;
    urlDestino: string;
    urlImagen: string;
    usuario: string;
}

export interface PanelSuperior {
    id: number;
    idMapaSitio: number;
    descripcion: string;
    estado: number;
    mapaDeSitio: MapaDeSitio;
    seccion: number;
    tipoPanel: number;
    titulo: string;
    urlLogo: string;
}

export interface PanelInferior {
    id: number,
    estado: number,
    urlLogo: string, 
    titulo: string, 
    descripcion: string, 
    seccion: number,
    tipoPanel: number,
    idMapaSitio: number,
    mapaDeSitio: MapaDeSitio
}

export interface MapaDeSitio {
    id: number,
    tituloSeccion: string, 
    itemsSeccion: string, 
    activo: number,
    tipo: number,
    seccion: number,
    permiteInactivar: boolean,
    bannerInformativo: string
}
