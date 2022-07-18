import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'noticias-govco-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  @Input() page: number = 0;
  @Input() showNext: boolean;
  @Input() pages: number[];

  @Output() prev: EventEmitter<number> = new EventEmitter();
  @Output() next: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit() {
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
}
