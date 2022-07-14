import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConoceModel, } from '../../models/conoce.model';
import { NosotrosModel } from '../../models/nosotros.model';
import { SobreNosotrosModel } from '../../models/sobre-nosotros.model';
import { SobreNosotrosService } from '../../services/sobre-nosotros.service';

@Component({
  selector: 'app-sobre-nosotros',
  templateUrl: './sobre-nosotros.component.html',
  styleUrls: ['./sobre-nosotros.component.scss']
})
export class SobreNosotrosComponent implements OnInit {

  codigo: string = 'sobrenosotros';
  dataNosotros: NosotrosModel;
  description: string;
  infoConoce: ConoceModel;
  loadData: boolean;
  sobreNosotros: SobreNosotrosModel;
  title: string;


  constructor(private sobreNosotrosService: SobreNosotrosService, private router: Router) { }

  ngOnInit(): void {
    this.sobreNosotrosService.getTitleAndDescription(this.codigo)
      .subscribe((resp) => {
        this.title = resp.data.titulo;
        this.description = resp.data.descripcion;
      });

    this.sobreNosotrosService.getInfoConoce()
      .subscribe((data: ConoceModel) => {
        this.infoConoce = data;
      },
        (error) => {
          console.error(error);
        }
      );

    this.sobreNosotrosService.ObtenerSeccion()
      .subscribe((data: SobreNosotrosModel) => {
        this.sobreNosotros = data;
      },
        (error) => {
          console.error(error);
        }
      );

    
    this.consultarDataNosotros(); 
  }

  //Suscribe extrae la data de la pagina sobre nosotros
  consultarDataNosotros() {
    this.sobreNosotrosService.getInfoPaginaSobreNosotros()
      .subscribe((data: NosotrosModel) => {
        console.log(data)
        this.dataNosotros = data;
        this.loadData = true;
      })
  }

  validacionRegistrarse() {
    return true
  }

  mostrarRegistro() {
    this.router.navigate(['/registro'])
  }
}
