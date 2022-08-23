import { Pipe, PipeTransform } from '@angular/core';
import { CategoriasInterface } from '../models/categorias-interface';

@Pipe({
  name: 'iconoPipe',
  pure: false
})
export class IconoPipePipe implements PipeTransform {

  transform(categoria: CategoriasInterface): string {
    if(categoria.icono != 'url' && categoria.icono != '' && categoria.icono != null){
      return categoria.icono;
    }
    return 'https://govco-prod-webutils.s3.amazonaws.com/uploads/2021-10-26/d8f3f555-6765-451f-8ea8-d8109692f458-CAT_DEFAULT-80px.svg'
  }

}
