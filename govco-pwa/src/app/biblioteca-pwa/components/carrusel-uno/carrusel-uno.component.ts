import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { CarruselUnoInterface } from '../../models/carrusel-uno-models/carrusel-uno-interface';
import { DataTarjetasInterface } from '../../models/carrusel-uno-models/data-tarjetas-interface';

@Component({
  selector: 'app-carrusel-uno',
  templateUrl: './carrusel-uno.component.html',
  styleUrls: ['./carrusel-uno.component.scss']
})
export class CarruselUnoComponent implements OnInit, OnChanges {

  @Input() dataCarruselUno: CarruselUnoInterface;

  public contenidoTarjetas: DataTarjetasInterface[];
  public dataCarrusel: any = [];
  catidadTarjetas: number = 3;
  titulo: string = "";
  icono: string = ''
  codigoMunicipio: string | null = "";
  codigoDepartamento: string | null = "";
  nombreMunicipio: string = "";
  estado: boolean = false;

  constructor() { }

  ngOnChanges(): void {
    if (this.dataCarrusel != undefined) {
      if (this.dataCarruselUno?.dataTitulo != undefined) {
        this.estado = true;
        this.titulo = this.dataCarruselUno.dataTitulo;
        this.nombreMunicipio = this.dataCarruselUno.ubicacion;
        this.codigoMunicipio = this.dataCarruselUno.codigoMunicipio;
        this.contenidoTarjetas = this.dataCarruselUno.dataTramites;
        this.dataCarrusel = this.agruparData([...this.contenidoTarjetas], this.catidadTarjetas);
      }
    }
  }

  ngOnInit(): void {
    this.estado = false;
  }

  agruparData(arr: any, len: number) {
    let dataAgrupado = [],
      i = 0,
      n = arr.length;

    while (i < n) {
      dataAgrupado.push(arr.slice(i, i += len));
    }
    return dataAgrupado;
  }
}
