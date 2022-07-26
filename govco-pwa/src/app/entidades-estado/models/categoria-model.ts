export interface CategoriaModel {
    id: number,
    nombre: string,
    descripcionCorta: string,
    descripcionLarga: string,
    codigoEstado: number,
    padre: number,
    user: number,
    icono: string
}


interface Window {
    [key:string] : any;
}