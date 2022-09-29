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
  c: number = 0

  constructor() { }

  ngOnChanges(): void {
    if (this.dataCarrusel != undefined) {
      if (this.dataCarruselUno?.dataTitulo != undefined) {
        this.estado = true;
        this.titulo = this.dataCarruselUno.dataTitulo;
        this.nombreMunicipio = this.dataCarruselUno.ubicacion;
        this.codigoMunicipio = this.dataCarruselUno.codigoMunicipio;
        this.contenidoTarjetas = this.dataCarruselUno.dataTramites;


        this.dataCarruselUno.dataTramites.forEach((contenidoTarjeta, i) => {
          this.contenidoTarjetas[i].id = contenidoTarjeta.id;
          var totalPalabras: string[] = contenidoTarjeta.nombre.split(" ")
          this.contenidoTarjetas[i].nombre = '';

          console.log('total palabras --------------------', totalPalabras.length)
          var totalCaracteres: number = 0

          totalPalabras.forEach((palabra, m) => {
            totalCaracteres += palabra.length
            console.log('totalCaracteres',totalCaracteres)
            if (totalPalabras.length < 6 && totalCaracteres < 30) {
              this.contenidoTarjetas[i].nombre += totalPalabras[m] + ' ';
            }
            if ((totalPalabras.length >= 6 && totalPalabras.length < 10) && totalCaracteres < 60) {
              this.contenidoTarjetas[i].nombre += totalPalabras[m] + ' ';
            }
            if ((totalPalabras.length >= 10 && totalPalabras.length < 14) && totalCaracteres < 50) {
              this.contenidoTarjetas[i].nombre += totalPalabras[m] + ' ';
            }
            if (totalPalabras.length >= 14 && totalCaracteres < 48) {
              this.contenidoTarjetas[i].nombre += totalPalabras[m] + ' ';
            }
          });
          console.log('nada')
          // textoTarjeta.forEach((element, m) => {
          //   if (m < 7) {
          //     c += element.length
          //     if (c < 48) {

          //       this.contenidoTarjetas[i].nombre = contenidoTarjeta.nombre.substring(0, 54)
          //     } else {
          //       this.contenidoTarjetas[i].nombre = contenidoTarjeta.nombre.substring(0, 48)
          //     }
          //   }
          // });
          // console.log('total caracteres:', c)
          this.contenidoTarjetas[i].iconoCategoria = contenidoTarjeta.iconoCategoria;
        });
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
