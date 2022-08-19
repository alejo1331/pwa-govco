export default class Menu {
    id: number;
    nombre: string;
    favorito: number;
    icono: string;
    ruta: string;
    recursos: SubMenu[]
}

export class SubMenu {
    id: number;
    nombre: string;
    favorito: number;
    fecha: string;
    nuevo: boolean;
    ruta: string;
}