import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'maxContent'
})
export class MaxContentPipe implements PipeTransform {

  transform(value: string): string {
    return value.slice(0,95);
  }

}
