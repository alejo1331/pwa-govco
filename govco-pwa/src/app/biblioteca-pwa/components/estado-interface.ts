export interface EstadoInterface {
    data: {
        id: number,
        tituloSeccion: string,
        itemsSeccion: string,
        activo: number,
        tipo: number,
        seccion: number,
        permiteInactivar: boolean,
        bannerInformativo: string | null
    },
    succeeded: boolean,
    errors: string | null,
    message: string | null
}
