import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderByDate'
})
export class OrderByDatePipe implements PipeTransform {

  meses: string[] = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
  mesesNum: string[] = ["$01", "$02", "$03", "$04", "$05", "$06", "$07", "$08", "$09", "$10", "$11", "$12"];

  transform(in_array: string[], titulo: string, ordenFecha: string, ordenGeneral: string): string[] {
    let fechaConvertida: string[] = [], fechaOrdenada: string[] = [];
    if (titulo === 'Fecha de publicación' || titulo === 'Fecha de cierre') {
      fechaConvertida = this.convertirFecha(in_array, this.mesesNum, this.meses);
      fechaOrdenada = ordenFecha === 'desc' ? fechaConvertida.sort((a, b) => b.localeCompare(a))
        : fechaConvertida.sort((a, b) => a.localeCompare(b));
      fechaConvertida = this.convertirFecha(fechaOrdenada, this.meses, this.mesesNum);
      return fechaConvertida;
    } else {
      fechaOrdenada = ordenGeneral === 'desc' ?
        in_array.sort((a, b) => b.localeCompare(a)) : in_array.sort((a, b) => a.localeCompare(b));
      return fechaOrdenada;
    }
  }

  convertirFecha(array: string[], arrayMes_1: string[], arrayMes_2: string[]) {
    let transformar: string[] = []
    array.forEach((item: string, j: number) => {
      arrayMes_2.forEach((mes: string, i: number) => {
        item.includes(mes) === true ? transformar[j] = item.replace(mes, arrayMes_1[i]) : null;
      });
    })
    return transformar;
  }

}
