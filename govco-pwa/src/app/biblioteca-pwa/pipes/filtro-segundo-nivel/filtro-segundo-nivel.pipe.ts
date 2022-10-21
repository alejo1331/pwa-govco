import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterSegundoNivel'
})
export class FiltroSegundoNivel implements PipeTransform {

  transform(items: { item: string, idItem: number | string}[], searchText: string): any[] {
    if (!items) {
      return [];
    }
    if (!searchText) {
      return items;
    }
    searchText = searchText.toLocaleLowerCase();

    return items.filter(it => {
      return it.item.toLocaleLowerCase().includes(searchText);
    });
  }

}
