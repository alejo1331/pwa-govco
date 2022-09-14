export interface ObtenerTemasInteresRespuesta {
    data: DataTemasInteresRespuesta;
    succeeded: boolean;
    errors: string[];
    message: string;
}

export interface DataTemasInteresRespuesta {
    contenidoPanelInferior: ContenidoPanelInferior[];
    panelSuperior : PanelSuperior;
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

export interface MapaDeSitio {
    id: number;
    activo: number;
    bannerInformativo: string;
    itemsSeccion: string;
    permiteInactivar: boolean;
    seccion: number;
    tipo: number;
    tituloSeccion: string;
}
