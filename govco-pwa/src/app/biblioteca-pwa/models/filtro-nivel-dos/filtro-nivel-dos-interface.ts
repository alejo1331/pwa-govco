export interface InformacionModalInterface {
    contendioModal: ContenidoModalFiltroInterface [];
    titulo: string;
    itemSeleccionado: string;
}

export interface ContenidoModalFiltroInterface {
    item: string; 
    idItem: number | string;
}
