export interface PorMunicipioInterface {
    data:
    {
        id: number,
        nombre: string,
        iconoCategoria: string
    }[],
    succeeded: boolean,
    errors: string | null,
    message: string | null,
    totalRegistros: number
}
