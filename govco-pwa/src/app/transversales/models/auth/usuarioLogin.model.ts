import { UsuarioModel } from './usuario.model';

export interface UsuarioLoginModel {
  usuario: UsuarioModel,
  TipoIdentificacion: string
}
