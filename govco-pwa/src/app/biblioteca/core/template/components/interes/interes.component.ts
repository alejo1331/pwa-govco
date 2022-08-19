import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { skip, takeUntil } from 'rxjs/operators';
import { HeaderBibliotecaService } from 'src/app/biblioteca/services/header-service/header-biblioteca-service.service';
import { RecursosService } from 'src/app/biblioteca/services/recursos-service/recursos-service.service';

@Component({
  selector: 'app-interes',
  templateUrl: './interes.component.html',
  styleUrls: ['./interes.component.scss']
})
export class InteresComponent implements OnInit {

  articulosInteres: any = [];
  categoria: string;
  private unsubscribe: Subject<void> = new Subject();
  showAll: boolean = false;
  showSection: boolean = false;

  constructor(public router: Router,
    private recursosService: RecursosService,
    private headerService: HeaderBibliotecaService) { }

  ngOnInit() {
    this.headerService.currentTitle.pipe(takeUntil(this.unsubscribe)).pipe(skip(2)).subscribe((categoria: any) => setTimeout(() => {
      this.categoria = categoria.split(' ')[0].toLowerCase();
      this.getRecursosInteres(this.categoria)
    }));
  }

  ngOnDestroy(){
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  getRecursosInteres(categoria: string) {
    this.recursosService.getrecursosinteresbycategoria(categoria).subscribe((data) => {
      this.articulosInteres = data;
    }, (error) => {
      console.error(error);
    });
  }

  mostrarTodo() {
    this.showAll = !this.showAll;
  }


}
