import { Pipe, PipeTransform } from '@angular/core';
import { IconoPipeInterface } from '../models/icono-pipe-interface';

@Pipe({
  name: 'iconoPipe',
  pure: false
})
export class IconoPipePipe implements PipeTransform {

  transform(pipe: IconoPipeInterface): string {
    if(pipe.icono != 'url' && pipe.icono != '' && pipe.icono != null){
      return pipe.icono;
    }
    return 'https://govco-prod-webutils.s3.amazonaws.com/uploads/2021-10-26/d8f3f555-6765-451f-8ea8-d8109692f458-CAT_DEFAULT-80px.svg'
  }

}
