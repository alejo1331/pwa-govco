export interface GeneralInterface {
    data: {
        id: number,
        nombre: string,
        iconoCategoria: string
    }[],
    succeeded: boolean,
    errors: string | null,
    message: string | null,
    totalRegistros: number;
}

