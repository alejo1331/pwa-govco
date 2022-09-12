import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FichaTramiteService } from 'src/app/tramites/services/ficha-tramite.service';

@Component({
  selector: 'app-legislacion-asociada',
  templateUrl: './legislacion-asociada.component.html',
  styleUrls: ['./legislacion-asociada.component.scss']
})
export class LegislacionAsociadaComponent implements OnInit {

  constructor(
    private fichaTramiteService: FichaTramiteService,
    private fb: FormBuilder
  ) { }

  @Input() data: any;
  urlTramite: string;
  @Input() normatividad: string;
  isEnLinea: boolean;
  IdTramite: any;
  p = 1;
  serchText: any;
  normatividad1: any[] = [];
  download: any[];
  showUp = false;
  toggleBool=true;
  value: any;
  selectedItemsList: any[] = [];
  checkedIDs = [];

  ngOnInit(): void {
    this.getNormatividadById();
  }

  getNormatividadById() {
    this.fichaTramiteService
      .GetNormatividadById(this.data.IdTramite)
      .subscribe((norm: any) => {
        this.normatividad1 = norm.map((n: any) => {
          return { ...n, checked: false }
        });
      }, error => console.log(error));
  }

  changeEvent(event: any, index: number, p: number) {
    this.normatividad1[2*(p-1) + index].checked = event.target.checked
  }

  get someSelected() {
    for (const i of this.normatividad1) {
      if (i.checked) return true
    }
    return false
  }

  allDownload(){
    this.normatividad1.forEach((e: any) => {
      if (e.checked) { // por ajustar
        window.open(e.UrlDescarga || e.UrlNorma)
        
        // const link = document.createElement('a');
        // link.setAttribute('target', '_self');
        // link.setAttribute('href', e.UrlDescarga || e.UrlNorma);
        // document.body.appendChild(link);
        // link.click();
        // link.remove();
        // console.log(e.UrlDescarga, e.UrlNorma, 'mostranding')
        // self.open(e.UrlDescarga || e.UrlNorma, "_self")
      }
    })
  }

}
