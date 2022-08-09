import ArchivosPublicacion from './publicacion';

export default class Categoria {
    id: number;
    nombre: string;
    descripcion: string;
    descripcionBreve: string;
    imagen: string;
    favorito: number;
    icono: string;
    ruta: string;
    publicaciones: ArchivosPublicacion[];
}