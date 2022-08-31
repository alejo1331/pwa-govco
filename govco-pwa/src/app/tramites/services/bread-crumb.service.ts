import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BreadCrumbService {

  tittle: string;
  tittleCiiu: string;
  tittleChange: BehaviorSubject<string> = new BehaviorSubject<string>('');
  titleObserver = this.tittleChange.asObservable();
  tittleChangeCiiu: BehaviorSubject<string> = new BehaviorSubject<string>('');
  titleObserverCiiu = this.tittleChangeCiiu.asObservable();

constructor() { }

getTittle(): Observable<string> {
  return this.tittleChange.asObservable();
}
getTittleCiiu(): Observable<string> {
  return this.tittleChangeCiiu.asObservable();
}
setTittle(title: string) {
  this.tittleChange.next(title);
}

setTittleCiiu(tittleCiiu: string) {
  this.tittleChangeCiiu.next(tittleCiiu);
}


}
