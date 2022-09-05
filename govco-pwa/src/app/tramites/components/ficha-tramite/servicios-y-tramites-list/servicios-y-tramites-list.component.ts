import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { TramitesDestacadosModel } from 'src/app/tramites/models/TramitesDestacados.model';
import { ServiciosYTramitesService } from 'src/app/tramites/services/servicios-y-tramites.service';

@Component({
  selector: 'app-servicios-y-tramites-list',
  templateUrl: './servicios-y-tramites-list.component.html',
  styleUrls: ['./servicios-y-tramites-list.component.scss']
})
export class ServiciosYTramitesListComponent implements OnInit {
  estado:number=0;
  tramitesList: TramitesDestacadosModel[];
  tramitesListGroup: any[] = [];
  listSlider:any[] = [];
  customOptions: OwlOptions = {
    loop: false,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: [ '' ],
    responsive: {
      0: {
        items: 1
      },
     500: {
        items: 1
      },
      900: {
        items: 1
      },
      1000: {
        items: 1
      }
    },
    nav: true
  }

  constructor(
    protected serviciosYTramitesService: ServiciosYTramitesService
  ) { }

  ngOnInit(): void {
    forkJoin({
      tramites: this.serviciosYTramitesService.getListTramitesDestacados(),
      estados: this.serviciosYTramitesService.getListEstadoDestacados()
    }).subscribe(({
      tramites,
      estados
    }) => {

      console.log(estados, tramites)
      if (tramites['succeeded']) {
        this.tramitesList = tramites["data"];
        this.agrupaItems(tramites["data"]);
      } else {
        console.log("Errors: " + tramites["errors"] + " Message: " + tramites["message"]);
      }

      if (estados['succeeded']) {
        this.estado = estados["data"].activo;
      } else {
        console.log("Errors: " + estados["errors"] + " Message: " + estados["message"]);
      }
    },
    error => {
      console.log(error);
    })
  }

  private agrupaItems(data:any[]){
    const cantidad = 5;
    const columnas  = Math.ceil(data.length/cantidad);
    const slider = Math.ceil(data.length/10);
  
    for (let index = 0; index < columnas; index++) {

      let temporal = [];
      
      if(data.length >= cantidad){
        temporal = data.slice(0,cantidad);
        data.splice(0,cantidad);
      }else{
        temporal = data.slice(0,data.length);
      }
      this.tramitesListGroup.push(temporal);
    }
  
    this.listSlider = [];
    for (let index = 0; index < slider; index++) {
      let temList = [];
      temList.push(this.tramitesListGroup[0] ?? []);
      temList.push(this.tramitesListGroup[1] ?? []);
      this.listSlider.push(temList)
      this.tramitesListGroup.splice(0,1);
      this.tramitesListGroup.splice(0,1);
    }
        
  }

}
