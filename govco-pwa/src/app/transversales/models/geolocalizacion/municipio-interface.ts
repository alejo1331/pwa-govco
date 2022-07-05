export interface MunicipioInterface {
    codigo: string;
    nombre: string;
    codigoDepartamento: string;
    departamento: { 
        codigo: string, 
        nombre: string 
    } | null;
}
