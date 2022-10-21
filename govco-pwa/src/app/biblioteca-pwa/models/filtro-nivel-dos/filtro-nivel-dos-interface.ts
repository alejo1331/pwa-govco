export interface InformacionModalInterface {
    contendioModal: ContenidoModalFiltroInterface [];
    titulo: string
}

export interface ContenidoModalFiltroInterface {
    item: string; 
    idItem: number | string;
}
