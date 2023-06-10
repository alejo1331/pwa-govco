export interface PageSizeTramites {
    data: DataResultadoSigla;
    succeeded: boolean;
    errors: string | null;
    message: string | null;
}

export interface DataResultadoSigla {
    id: number;
    sigla: string;
    nombre: string;
    valor: string;
}