import ArchivosPublicacion from './publicacion';

export default class Recurso {
    id: number;
    nombre: string;
    subtitulo: string;
    descripcion: string;
    enfasis: string;
    imagen: string;
    categoria: string;
    publicaciones: RecursosPublicaciones[];
}

export class RecursosPublicaciones {
    id: number;
    nombre: string;
    descripcion: string;
    fecha: Date;
    archivos: ArchivosPublicacion[]
}