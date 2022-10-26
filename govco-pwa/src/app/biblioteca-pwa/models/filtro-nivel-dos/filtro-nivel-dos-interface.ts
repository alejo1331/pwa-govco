export interface InformacionModalInterface {
    contendioModal: ContenidoModalFiltroInterface [];
    titulo: string;
    itemSeleccionado: number;
}

export interface ContenidoModalFiltroInterface {
    item: string; 
    idItem: number | string;
}
