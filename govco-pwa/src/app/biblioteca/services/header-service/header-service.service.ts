import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  private titleSource = new BehaviorSubject('Biblioteca');
  currentTitle = this.titleSource.asObservable();
  
  constructor() { }

  setTitle(categoria: string){
    this.titleSource.next(categoria);
  }

  getTitle(){
    return this.titleSource.value;
  }
}
