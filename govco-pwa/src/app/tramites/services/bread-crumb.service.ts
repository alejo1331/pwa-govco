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
async setTittle(title: string) {
  await this.tittleChange.next(title);
}

async setTittleCiiu(tittleCiiu: string) {
  await this.tittleChangeCiiu.next(tittleCiiu);
}


}
