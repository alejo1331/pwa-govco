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
    id: number | null;
    titulo: string;
    sumario: string;
    cuerpo: string;
    imagen: string;
    fecha: string;
    idEstado: number | null;
    idCategoria: number | null;
    idSubCategoria: number | null;
    textoFecha: string;
    codigoEntidad: string;
    estado: string | null;
}

export interface ListadoActualidadBanner {
    id: number;
    codigo: string;
    titulo: string;
    descripcion: string;
    mensaje: string;
}

export interface CabeceraActualidad {
    data: ActualidadGeneral;
    succeeded: boolean;
    errors: string[] | null;
    message: string;
}
export interface ActualidadGeneral {
    botonTexto: string;
    botonTextoAlternativo: string;
    codigo: string;
    descripcion: string;
    id: number;
    mensaje: string | null;
    titulo: string;
}

export interface DataNoticias {
    data: ContenidoNoticias[];
    succeeded: boolean;
    errors: string[] | null;
    message: string;
}
export interface ContenidoNoticias {
    categoriaMvId: number;
    certificaLibreUso: boolean;
    codigoEntidad: string;
    cuerpo: string;
    estado: null | string;
    fecha: string;
    fechaActualizacion: string;
    fechaCreacion: string;
    fechaExpira: string;
    id: number | null;
    idCategoria: null | number;
    idEstado: number | null;
    idSector: number | null;
    idSubCategoria: number | null;
    imagen: string;
    noticiaSector: [];
    palabrasClave: string;
    razonBorrado: string | null;
    subcategoriaMvId: number | string | null;
    sumario: string;
    textoAlternativo: string;
    textoFecha: string;
    titulo: string;
    urlCorta: string | null;
    usuarioId: number | null;
}