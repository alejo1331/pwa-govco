import { Component, Input, OnInit } from '@angular/core';
import { FichaTramiteService } from 'src/app/tramites/services/ficha-tramite.service';

@Component({
  selector: 'app-legislacion-asociada',
  templateUrl: './legislacion-asociada.component.html',
  styleUrls: ['./legislacion-asociada.component.scss']
})
export class LegislacionAsociadaComponent implements OnInit {
  @Input() data: any;
  urlTramite: string;
  @Input() normatividad: string;
  isEnLinea: boolean;
  IdTramite: any;
  p = 1;
  serchText: any;
  normatividad1: any[];
  download: any[];
  showUp = false;
  toggleBool=true;
  value: any;
  selectedItemsList: any[] = [];
  checkedIDs = [];
  checkbox: any;

  constructor(
    private fichaTramiteService: FichaTramiteService,
  ) { }

  ngOnInit(): void {
    this.checkbox = this.getNormatividadById();
  }

  getNormatividadById() {
    this.fichaTramiteService
      .GetNormatividadById(this.data.IdTramite)
      .subscribe((n: any) => {
        this.normatividad1 = n;
      }, error => console.log(error));
  }

  changeEvent(option: any, event: any) {
    console.log(option, event)
    if (event.target.checked) {
        this.toggleBool= false;
        this.selectedItemsList.push(option.UrlDescarga);
    }
    else {
        this.toggleBool= true;
        for(var i=0 ; i < this.normatividad1.length; i++) {
          if(this.selectedItemsList[i] == option.UrlDescarga) {
            this.selectedItemsList.splice(i,1);
         }
       }
    }
  }

  allDownload(){
    this.selectedItemsList.forEach(e =>  self.open(e),"_self")
  }

}
