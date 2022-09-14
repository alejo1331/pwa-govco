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
    navText: [ 
      '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAAA0ElEQVRIibXVIU4DURCA4Q9EBaLBoJrgKiEcoBfoATCcgBOgOQMXwGFx1VhIkMgmBQEGSJAkQDFvkidoRZn57Wa/TXb3zfD/JnhMcP7sCO9YVuCHeGv4RzY+xkvDPzHNxPexaPgXjjPxEeYN/8ZJJr6Hh4b/4DQT38V9w5c4y8SHuOvw80x8BzcdfpGJDzDr8EtsZT7gusOvsL0Jsu6mkuPfV/6KKP7I0RC3in7TqPSgRaWjIioddlHpuI7GeFa0cKIDvCpamVHp0o8meFp18RepAkYE7nsHmgAAAABJRU5ErkJggg==">', 
      '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAAA0ElEQVRIic3WIW4CMBQA0DcUAgHB4EhwW8LcHG4exQW4wO6A3Ql2AuQuwCyTLEHiWKYWECgSssBMkzUkYNZP+LbNf8lv+385HZ/onVn/dxywwUMUsEnICt0I4BHbhHzjNgLpY5eQL3QikAF+ErJEOwIZYp+QBVoRyFMCDpijGYGMMmSGegTynCFT1EoDN3jJkAmqpZEKxhnyem7j1cVxid4ULlF+yO8KH3J+TT/QKJk89KGFtorQZhfaro8Hzl3J5PyNzDXuSyfnAkN/qcC35RecbkUnJ/dOewAAAABJRU5ErkJggg==">' 
    ],
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
