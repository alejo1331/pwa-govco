export default class ArchivosPublicacion {
    id: number;
    ubicacion: string;
    tipoArchivo: string;
    recursoPublicacionId: number;
    enlaceRapido: number;
    destacado: number;
    nombre: string;
    descripcion: string;
    fecha: Date;
    interes: number;
    tiempoLectura: string;
    tags: string;
    tipoContenido: string;
    nuevo: boolean;
}

export class Publicacion {
    categoria: string;
    imagen: string;
    recurso: string;
    ruta: string;
}