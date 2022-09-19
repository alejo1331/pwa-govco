export interface ObtenerBannerNoticiaRespuesta {
    data: BannerNoticiaDetalle;
    succeeded: boolean;
    errors: string[] | null;
    message: string;
}

export interface BannerNoticiaDetalle {
    banner: ListadoActualidadBanner;
    noticias: ListadoActualidadNoticia[];
}

export interface ListadoActualidadNoticia {
    id: number;
    titulo: string;
    sumario: string;
    cuerpo: string;
    imagen: string;
    fecha: string;
    idEstado: number;
    idCategoria: number;
    idSubCategoria: number;
    textoFecha: string;
    codigoEntidad: string;
    estado: string;
}

export interface ListadoActualidadBanner {
    id: number;
    codigo: string;
    titulo: string;
    descripcion: string;
    mensaje: string;
}
