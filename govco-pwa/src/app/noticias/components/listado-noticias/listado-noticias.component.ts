import { async } from '@angular/core/testing';
import { Component, OnInit } from '@angular/core';
import { NoticiasServiceService } from 'src/app/noticias/services/noticias-service.service';
import { NoticiaPublicadaModel } from 'src/app/noticias/models/noticiaPublicadaModel';

@Component({
  selector: 'noticias-govco-listado-noticias',
  templateUrl: './listado-noticias.component.html',
  styleUrls: ['./listado-noticias.component.scss']
})
export class ListadoNoticiasComponent implements OnInit {
  noticias: NoticiaPublicadaModel[];
  noticiasError: boolean = false;
  noticiasEmpty: boolean = false;
  showNext: boolean = false;
  currentPage: number = 0;
  totalNoticias: number = 0;
  totalPages: number = 0;
  pages: number[] = new Array(4);

  private paginationInfo = {
    page: 0,
    pageSize: 10
  }

  constructor(private noticiasService: NoticiasServiceService) { }

  ngOnInit() {
    this.currentPage = this.noticiasService.getCurrentPage();
    this.obtenerNoticiasPaginadas(this.currentPage, this.paginationInfo.pageSize);    
    this.obtenerTotalNoticias();    
  }

  //Carga las noticias de acuerdo a la paginación definida
  obtenerNoticiasPaginadas(page:any, pageSize:any) {
    this.noticias = [];
    this.showNext = false;
    this.noticiasEmpty = false;
    this.noticiasError = false;

    this.noticiasService.obtenerNoticiasPaginadas(page, pageSize).subscribe(
      (data: NoticiaPublicadaModel[]) => {
        this.noticias = data;
        if (this.noticias.length == this.paginationInfo.pageSize){
          this.showNext = true;
        }
        if(this.noticias.length == 0){
          this.noticiasEmpty = true;
        }
      },
      (error) => {
        //TODO: mostrar error
        this.noticiasError = true;
      }
    );
  }

  obtenerTotalNoticias(){
    this.noticiasService.obtenerTotalNoticias().subscribe(
      (data: number) => {
        this.totalNoticias = data;

        this.totalPages = Math.trunc(this.totalNoticias/this.paginationInfo.pageSize);

        if ((this.totalNoticias%this.paginationInfo.pageSize) != 0){
          this.totalPages = this.totalPages + 1;  
        }

        this.calculatePages(this.currentPage);
      },
      (error) => {

        //TODO: mostrar error
        this.noticiasError = true;
      }
    );
  }

  calculatePages(page: number){
    
    let minPage: number = 0;
    let maxPage: number = 4;
    let index: number = 0;

    if (page > 3)
    {
      if ((page + 2) > (this.totalPages - 1)){
        minPage = this.totalPages - 5;
        maxPage = this.totalPages - 1;
      } else {
        minPage = page - 2;
        maxPage = page + 2;
      }      
    }
    
    for (var i = minPage; i <= maxPage; i++){
      this.pages[index]= i + 1;
      index++;
    }
  }

  changePage(page: number) {
    this.noticiasService.setCurrentPage(page);
    this.obtenerNoticiasPaginadas(page, this.paginationInfo.pageSize);
    this.calculatePages(page);
  }
}
