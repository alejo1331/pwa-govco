import { Component, ElementRef, HostListener, ViewChild, PipeTransform } from '@angular/core';

@Component({
  selector: 'app-buscador-sencillo-v1',
  templateUrl: './buscador-sencillo-v1.component.html',
  styleUrls: ['./buscador-sencillo-v1.component.scss']
})
export class BuscadorSencilloV1Component implements PipeTransform {

  @ViewChild('inputBuscador') inputBuscador: ElementRef;

  public busqueda: string = '';


  public items: {
    active: boolean,
    titulo: string,
    departamento: string,
  }[] = [
      {
        active: false,
        titulo: 'Funda de desarrollo de la Educación Superior',
        departamento: 'Bogotá. D.C.'
      },
      {
        active: false,
        titulo: 'Fondo de desarrollo de la Educación Superior de Arauca',
        departamento: 'Bogotá. D.C.'
      },
      {
        active: false,
        titulo: 'Fino de desarrollo de la Educación Superior',
        departamento: 'Bogotá. D.C.'
      },
      {
        active: false,
        titulo: 'Fondo de desarrollo de la Educación Superior',
        departamento: 'Bogotá. D.C.'
      },
      {
        active: false,
        titulo: 'Fondo de desarrollo de la Educación Superior',
        departamento: 'Bogotá. D.C.'
      }
    ]


  borrarContenido() {
    this.inputBuscador.nativeElement.value = ''
  }

  transform(items: { active: boolean, titulo: string, departamento: string }[], searchText: string): { active: boolean, titulo: string, departamento: string }[]{
    if (!items) {
      return [];
    }
    if (!searchText) {
      return items;
    }
    searchText = searchText.toLocaleLowerCase();

    return items.filter(it => {
      return it.titulo.toLocaleLowerCase().includes(searchText);
    });
  }


  @HostListener('window:keyup', ['$event']) onInput(event: KeyboardEvent) {
    if (this.inputBuscador.nativeElement == event.target) {
      this.busqueda = (event.target as HTMLInputElement).value;
      console.log('filtrado',this.transform(this.items, this.busqueda));
    }
  }

}
