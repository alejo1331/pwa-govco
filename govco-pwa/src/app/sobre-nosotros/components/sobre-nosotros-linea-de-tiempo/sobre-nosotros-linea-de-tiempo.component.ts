import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SobreNosotrosModel } from '../../models/sobre-nosotros.model';
import { SobreNosotrosService } from '../../services/sobre-nosotros.service';

@Component({
  selector: 'app-sobre-nosotros-linea-de-tiempo',
  templateUrl: './sobre-nosotros-linea-de-tiempo.component.html',
  styleUrls: ['./sobre-nosotros-linea-de-tiempo.component.scss']
})
export class SobreNosotrosLineaDeTiempoComponent implements OnInit {

  restadoResposive: boolean = true;
  estadoBotonAtras: boolean;
  estadoBotonAdelante: boolean = true;
  widthTotalSlide: number = 0;
  widthTotalSlideResponsive: number = 0;
  varLeft: number = 0;
  slideMove: number = 0;
  fechaSeleccionada = 0;
  estadoInicialTeclado: boolean = true;
  sobreNosotros: SobreNosotrosModel;
  lineaTiempo: any[] = [];
  posicionActual = 1;

  @ViewChild('contenedor') contenedor: ElementRef<HTMLElement> | any;
  @ViewChild('labelRadio') labelRadio: ElementRef<HTMLElement> | any;
  constructor(private sobreNosotrosService: SobreNosotrosService) { }

  ngOnInit(): void {
    window["objeto"] = this;
    window.addEventListener('resize', () => {
      if (!this.isMobile()) {
        setTimeout(() => {
          this.slideMove = 0;
          this.estadoBotonAdelante = true;
          this.estadoBotonAtras = false;
          this.esResponsive() ? this.calcularWidthLineaTiempoResponsive() : this.calcularWidthLineaTiempo();
          this.mostrarVisibilidadAccesible();
          this.adicionarVisibilidadAccesibleCheck();
          this.adicionarVisibilidadAccesibleLabel()
        }, 200);
      }
    });
  }

  ngAfterViewInit() {
    this.sobreNosotrosService.ObtenerSeccion()
      .subscribe((data: any) => {
        if (this.validarModeloLineaTemporal(data)) {
          this.lineaTiempo = data.lineaTemporal;
          setTimeout(() => {
            this.esResponsive() ? this.calcularWidthLineaTiempoResponsive() : this.calcularWidthLineaTiempo();
            this.mostrarVisibilidadAccesible();
            this.adicionarVisibilidadAccesibleCheck();
            this.adicionarVisibilidadAccesibleLabel();
          }, 200);
        } else {
          this.lineaTiempo = [];
        }
      },
        (error) => {
          console.error(error);
        }
      );
  }

  validarModeloLineaTemporal(modelo: any) {
    var estado = true;
    if (modelo == null) {
      // "Error validarModeloLineaTemporal() --> Falta modelo SobreNosotros"
      estado = false;
    } else {
      if (!modelo.lineaTemporal) {
        //  "Error validarModeloLineaTemporal() --> Falta lineaTemporal"
        estado = false;
      }
    }
    return estado;
  }

  esResponsive() {
    if ((window.matchMedia("(max-width: 992px)").matches)) {
      return true;
    } else {
      return false;
    }
  }

  calcularWidthLineaTiempoResponsive() {
    this.widthTotalSlideResponsive = 0;
    if (this.contenedor) {
      this.contenedor.nativeElement.style.marginLeft = "0px";
      this.varLeft = 0;
      for (let i = 0; i < this.lineaTiempo.length; i++) {
        let width = (this.contenedor.nativeElement.offsetWidth / 2) - 10;
        this.widthTotalSlideResponsive = this.widthTotalSlideResponsive + width;
        if (i == 0) {
          document.getElementById("checkbox_" + i)?.click();
        }
      }
    }
  }

  activarEventosAccesibilidad(evt: any) {
    if (evt.keyCode == 9) {
      window.addEventListener('keyup', this.setEventos);
      window.addEventListener('keypress', this.setEventos);
      document.addEventListener("click", this.desActivarEventosClickPorFuera);
    } else if (evt.keyCode == 27) {
      document.getElementById("salir-seccion-noticias")?.focus();
    }
  }

  setEventos(evt: any) {
    if (evt.key === "ArrowRight") {
      window["objeto"].siguienteTeclado();
    }
    if (evt.key === "ArrowLeft") {
      window["objeto"].atrasTeclado();
    }
    if (evt.key === "Escape") {
      window.removeEventListener('keyup', window["objeto"].setEventos);
      document.getElementById("salir-seccion-linea-tiempo")?.focus();
    }
  }

  desActivarEventosClickPorFuera(evt: any) {
    var element = evt.target["parentNode"];
    while (element) {
      if (element["id"] === "linea-tiempo-sobre-nosotros") {
        element = undefined;
        return;
      } else {
        element = element["parentNode"];
      }
    }
    window.removeEventListener('keyup', window["objeto"].setEventos);
    window.removeEventListener('keypress', window["objeto"].setEventos);
    document.removeEventListener("click", window["objeto"].desActivarEventosClick);
  }

  atras() {
    let left = this.contenedor.nativeElement.style.marginLeft === "" ? 0 : parseFloat(this.contenedor.nativeElement.style.marginLeft.replace("px", ""));
    left = left + (this.esResponsive() ? ((this.contenedor.nativeElement.offsetWidth / 2) + 10) : (this.contenedor.nativeElement.offsetWidth / 5));
    this.mostrarVisibilidadAccesible();
    this.contenedor.nativeElement.style.marginLeft = left + "px";
    left = parseInt("" + left);
    this.estadoBotonAtras = left == this.varLeft ? false : true;
    this.estadoBotonAdelante = true;
    this.slideMove--;
    this.posicionActual--;
    this.adicionarVisibilidadAccesibleCheck();
    this.adicionarVisibilidadAccesibleLabel();
    document.getElementById("checkbox_" + (this.fechaSeleccionada - 1))?.click();
  }

  mostrarVisibilidadAccesible() {
    for (let i = 0; i < this.lineaTiempo.length; i++) {
      document.getElementById("checkbox_" + i)!.style.visibility = "visible";
      document.getElementById("label_checkbox_" + i)!.style.transition = "opacity 1s";
      document.getElementById("label_checkbox_" + i)!.style.opacity = "1";
      document.getElementById("label_checkbox_" + i)!.style.visibility = "visible";
      document.getElementById("checkbox_" + i)!.removeEventListener('keyup', this.checkElemento.bind(this));
    }
  }

  adicionarVisibilidadAccesibleCheck() {
    setTimeout(() => {
      for (let i = 0; i < this.lineaTiempo.length; i++) {
        if (this.esResponsive()) {
          if (i == this.slideMove) {
            document.getElementById("checkbox_" + i)?.addEventListener('keyup', this.checkElemento.bind(this));
          } else {
            document.getElementById("checkbox_" + i)!.style.visibility = "hidden";
          }
        } else {
          if (i >= this.slideMove && i < this.slideMove + 5) {
            document.getElementById("checkbox_" + i)?.addEventListener('keyup', this.checkElemento.bind(this));
          } else {
            document.getElementById("checkbox_" + i)!.style.visibility = "hidden";
          }
        }
      }
    }, 400);
  }

  adicionarVisibilidadAccesibleLabel() {
    for (let i = 0; i < this.lineaTiempo.length; i++) {
      if (this.esResponsive()) {
        if (i != this.slideMove) {
          document.getElementById("label_checkbox_" + i)!.style.transition = "opacity 1s";
          document.getElementById("label_checkbox_" + i)!.style.opacity = "0";
          document.getElementById("label_checkbox_" + i)!.style.visibility = "hidden";
        }
      } else if (!(i >= this.slideMove && i < this.slideMove + 5)) {
        document.getElementById("label_checkbox_" + i)!.style.visibility = "hidden";
      }
    }
  }

  getValorDividir() {
    if (this.esResponsive()) {
      if (this.lineaTiempo.length <= 1) {
        this.estadoBotonAdelante = false;
      }
      return 2;
    } else {
      if (this.lineaTiempo.length <= 5) {
        this.estadoBotonAdelante = false;
      }
      return (this.lineaTiempo.length <= 5 ? this.lineaTiempo.length : 5);
    }
  }

  splitTitulo(titulo: any) {
    let arrTitulo = titulo.split(" ");
    let texto = "";
    for (const value of arrTitulo) {
      if (value != "") {
        texto += value + "<br>";
      }
    }
    return texto;
  }

  seleccionarFecha(id: any) {
    for (let i = 0; i < this.lineaTiempo.length; i++) {
      if (id >= i) {
        document.getElementById("linea_" + i)!.style.background = "#3366CC";
      } else {
        document.getElementById("linea_" + i)!.style.background = "#737373";
      }
      let element: any = document.getElementById("checkbox_" + i);
      element.checked = false;
    }
    document.getElementById("checkbox_" + id)!["checked"] = true;
    this.fechaSeleccionada = id;
  }

  isMobile() {
    return (
      (navigator.userAgent.match(/Android/i)) ||
      (navigator.userAgent.match(/webOS/i)) ||
      (navigator.userAgent.match(/iPhone/i)) ||
      (navigator.userAgent.match(/iPod/i)) ||
      (navigator.userAgent.match(/iPad/i)) ||
      (navigator.userAgent.match(/BlackBerry/i))
    );
  }

  calcularWidthLineaTiempo() {
    this.widthTotalSlide = 0;
    if (this.contenedor) {
      this.contenedor.nativeElement.style.marginLeft = -((this.contenedor.nativeElement.offsetWidth / this.getValorDividir()) - 20) / 2 + "px";
      this.varLeft = parseInt(-((this.contenedor.nativeElement.offsetWidth / 5) - 20) / 2 + "");
      for (let i = 0; i < this.lineaTiempo.length; i++) {
        let width = (this.contenedor.nativeElement.offsetWidth / 5);
        this.widthTotalSlide = this.widthTotalSlide + width;
        if (i == 0) {
          document.getElementById("checkbox_" + i)?.click();
        }
      }
    }
  }

  checkElemento(event: any) {
    if (event.code === "Enter") {
      document.getElementById(event.currentTarget.id)?.click();
    }
  }

  siguiente() {
    let left = this.contenedor.nativeElement.style.marginLeft === "" ? 0 : parseFloat(this.contenedor.nativeElement.style.marginLeft.replace("px", ""));
    left = left - (this.esResponsive() ? ((this.contenedor.nativeElement.offsetWidth / 2) + 10) : (this.contenedor.nativeElement.offsetWidth / 5));
    this.mostrarVisibilidadAccesible();
    this.contenedor.nativeElement.style.marginLeft = left + "px";
    this.estadoBotonAtras = true;
    let width = (this.esResponsive() ? this.widthTotalSlideResponsive : this.widthTotalSlide - this.contenedor.nativeElement.offsetWidth);
    left = left * -1;
    this.estadoBotonAdelante = true;
    if (this.esResponsive()) {
      this.estadoBotonAdelante = left < width ? true : false;
    } else {
      this.estadoBotonAdelante = left >= width ? false : true;
    }
    
    this.slideMove++;
    this.posicionActual++;
    if (this.esResponsive()) {
      this.estadoBotonAdelante = this.lineaTiempo.length > this.posicionActual ? true : false;
    }
    this.adicionarVisibilidadAccesibleCheck();
    this.adicionarVisibilidadAccesibleLabel();
    document.getElementById("checkbox_" + (this.fechaSeleccionada + 1))?.click();
  }

  desActivarEventosAccesibilidad(evt: any) {
    if (evt.keyCode == 9) {
      window.removeEventListener('keyup', this.setEventos);
      window.removeEventListener('keypress', this.setEventos);

    }
  }
}
