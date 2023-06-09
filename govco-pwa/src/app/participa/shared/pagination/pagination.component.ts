import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { esResponsive } from 'src/app/participa/utils/utils';

@Component({
  selector: 'govco-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  @Input() page: number = 0;
  @Input() showNext: boolean;
  pages: number[];
  @Input() totalPages:number;

  @Output() prev: EventEmitter<number> = new EventEmitter();
  @Output() next: EventEmitter<number> = new EventEmitter();
  esResponsive = esResponsive;

  ngOnInit() {
    let a ="";
  }

  ngOnChanges(changes:SimpleChanges):void {
    if(changes.page || changes.totalPages){
      esResponsive()?this.calculatePagesResponsive() :this.calculatePagesDesktop();
    }
  }

  nextPage() {
    this.page ++;
    this.next.emit(this.page);
  }

  prevPage() {
    if (this.page > 0) {
      this.page --;
      this.prev.emit(this.page);
    }
  }

  nPage(npage:number){
    this.page = npage;
    this.next.emit(this.page);
  }

  calculatePagesDesktop(){
    let minPage: number = 0;
    let maxPage: number = this.totalPages > 4 ? 4 : this.totalPages - 1;
    let index: number = 0;

    if (this.totalPages > 4 && this.page > 2 && (this.page + 2) > (this.totalPages - 1)) {
      this.calculatePagesDesktopCaso1(minPage, maxPage, index);
    } else if (this.totalPages > 4 && this.page > 2) {
      this.calculatePagesDesktopCaso2(minPage, maxPage, index);
    } else if (this.totalPages > 4) {
      this.calculatePagesDesktopCaso3(minPage, maxPage, index);
    } else {
      this.calculatePagesDesktopCaso4(minPage, maxPage, index);
    }
  }

  calculatePagesDesktopCaso1(minPage:number, maxPage:number, index:number) {
    this.pages = new Array(6);
    minPage = this.totalPages - 6;
    maxPage = this.totalPages - 1;
    for (let i = minPage; i <= maxPage; i++){
      let pos:any = i == minPage ? 1 : i + 1;
      pos = i == minPage + 1 ? -1 : pos;
      this.pages[index] = pos;
      index++;
    }
  }

  calculatePagesDesktopCaso2(minPage:number, maxPage:number, index:number) {
    this.pages = new Array(7);
    minPage = this.page - 3;
    maxPage = this.page + 3;
    for (let i = minPage; i <= maxPage; i++) {
      let pos:any = i == minPage + 0 ? 1 : i + 1;
      pos = i == minPage + 1 ? -1 : pos;
      pos = i == minPage + 5 ? -1 : pos;
      pos = i == minPage + 6 ? this.totalPages : pos;
      this.pages[index] = pos;
      index++;
    }
  }

  calculatePagesDesktopCaso3(minPage:number, maxPage:number, index:number) {
    this.pages = new Array(6);
    maxPage = 5;
    for (let i = minPage; i <= maxPage; i++) {
      let pos:any = i == 4 ? -1 : i + 1;
      pos = i == 5 ? this.totalPages:pos;
      this.pages[index] = pos;
      index++;
    }
  }

  calculatePagesDesktopCaso4(minPage:number, maxPage:number, index:number) {
    this.pages = new Array(this.totalPages);
    maxPage = this.totalPages - 1;
    for (let i = minPage; i <= maxPage; i++) {
      this.pages[index] = i + 1;
      index++;
    }
  }

  calculatePagesResponsive(){
    this.pages = new Array(3);
    this.pages[0]=this.page+1==this.totalPages?this.page:this.page+1;
    this.pages[1]=-1;
    this.pages[2]= +this.totalPages;
  }
}
