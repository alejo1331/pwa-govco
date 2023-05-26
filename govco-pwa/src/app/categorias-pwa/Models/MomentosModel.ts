export interface MomentosTitle {
  data: DataTitle;
  succeeded: boolean;
  errors: null;
  message: null;
}

export interface DataTitle {
  id: number;
  codigo: string;
  titulo: string;
  descripcion: string;
}
