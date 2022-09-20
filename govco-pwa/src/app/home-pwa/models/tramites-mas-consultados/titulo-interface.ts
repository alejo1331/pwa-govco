export interface TituloInterface {
    data: {
        id: number,
        seccion: string,
        titulo: string
    },
    succeeded: boolean,
    errors: string | null,
    message: string | null,
    totalRegistros: number
}

