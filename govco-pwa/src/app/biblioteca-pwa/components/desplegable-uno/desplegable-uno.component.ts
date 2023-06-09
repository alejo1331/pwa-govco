import { AfterViewInit, Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { Platform } from '@angular/cdk/platform';


@Component({
  selector: 'app-desplegable-uno',
  templateUrl: './desplegable-uno.component.html',
  styleUrls: ['./desplegable-uno.component.css']
})
export class DesplegableUnoComponent implements OnInit, AfterViewInit {

  active = 1;
  @Input() data: any[];
  @Input() estructura: { titulo: string, icono: string }[];
  @Output() perfilSeleccionado = new EventEmitter<string>();
  @Output() botonRetroalimentaciona = new EventEmitter<string>();

  estado: boolean[] = [true, true, true, true];
  titulo: string[] = ['', '', '', '']
  posicion: number[] = [];

  touchMoveInicial: number = 0;
  touchMoveFinal: number = 0;
  touchMoveDiferencia: number = 0;
  itemSelected: number;

  desplegableVisible: boolean = false;

  constructor(
    public platform: Platform,
  ) { }

  ngOnInit(): void {
    var cont: number = 0;
    this.estructura.forEach((element, i) => {
      if (this.data != undefined) {
        this.data.forEach(elemento => {
          if (elemento['detalle'] === this.estructura[i].titulo) {
            this.estado[i] = false;
            this.posicion[cont] = i;
            this.seleccionarItem(this.posicion[0]);
            cont = cont + 1;
            if (this.estructura[this.itemSelected] != undefined) {
              this.perfilSeleccionado.emit(this.estructura[this.itemSelected].titulo)
            }
          }
        });
      }
      this.titulo[i] = element.titulo.split(" ").join("<br/>")
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.abrirModal();
    }, 800);
  }

  seleccionarItem(dataItem: number) {
    this.itemSelected = dataItem;
  }

  abrirModal() {
    this.desplegableVisible = !this.desplegableVisible;

    if (this.desplegableVisible) {
      this.botonRetroalimentaciona.emit('ocultar');
      var espaldar = (document.getElementById('espaldarModal') as HTMLElement);
      espaldar.style.zIndex = '5';
      espaldar.style.opacity = '1';
      espaldar.style.backgroundColor = '#00000080'
      var body = (document.getElementsByTagName('body') as HTMLCollectionOf<HTMLElement>)[0];
      body.style.overscrollBehavior = 'contain';
      var contenedor = (document.querySelector('.modal-desplegable-pwa.contenedor') as HTMLElement);
      contenedor.style.bottom = '0';
      contenedor.style.transition = '0.6s';
      if (this.platform.IOS || this.platform.SAFARI) {
        body.style.position = 'fixed';
        body.style.overflow = 'hidden';
      }
    } else {
      this.cerrarModal();
    }
  }

  cerrarModal() {
    this.botonRetroalimentaciona.emit('mostrar');
    if (this.estructura[this.itemSelected] != undefined) {
      this.perfilSeleccionado.emit(this.estructura[this.itemSelected].titulo)
    }
    var espaldar = (document.getElementById('espaldarModal') as HTMLElement);
    espaldar.style.zIndex = '-1'
    espaldar.style.opacity = '0';
    var body = (document.getElementsByTagName('body') as HTMLCollectionOf<HTMLElement>)[0];
    setTimeout(() => { body.style.overscrollBehavior = 'auto' }, 500);
    var contenedor = (document.querySelector('.modal-desplegable-pwa.contenedor') as HTMLElement);
    contenedor.style.bottom = '-25.125rem';
    contenedor.style.transition = '0.6s'
    if (this.platform.IOS || this.platform.SAFARI) {
      body.style.removeProperty('position')
      body.style.removeProperty('overflow')
    }
    this.desplegableVisible = false;
  }

  @HostListener('touchstart', ['$event']) onTouchStart(event: any): void {
    var button = document.getElementById('modalDesplegable')
    var hr = (document.getElementsByTagName('hr') as HTMLCollectionOf<HTMLElement>)[1];
    if (button == event.target || hr == event.target) {
      this.touchMoveInicial = event.changedTouches[0].screenY;
    }
  }

  @HostListener('touchmove', ['$event']) onTouchMove(event: any): void {
    var button = document.getElementById('modalDesplegable');
    var hr = (document.getElementsByTagName('hr') as HTMLCollectionOf<HTMLElement>)[1];
    if (button == event.target || hr == event.target) {
      this.touchMoveFinal = event.changedTouches[0].screenY;
      if (this.touchMoveInicial < this.touchMoveFinal) {
        this.cerrarModal()
      } else {
        this.abrirModal();
      }
    }
  }
}
