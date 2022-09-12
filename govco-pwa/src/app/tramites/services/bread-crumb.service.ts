import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BreadCrumbService {

  tittle: string;
  tittleCiiu: string;
  private tittleChange: BehaviorSubject<string> = new BehaviorSubject<string>('');
  public titleObserver = this.tittleChange.asObservable();
  private tittleChangeCiiu: BehaviorSubject<string> = new BehaviorSubject<string>('');
  public titleObserverCiiu = this.tittleChangeCiiu.asObservable();

constructor() { }

getTittle(): Observable<string> {
  return this.tittleChange.asObservable();
}
getTittleCiiu(): Observable<string> {
  return this.tittleChangeCiiu.asObservable();
}
async setTittle(title: string) {
  await this.tittleChange.next(title);
  console.log("Service setTittle",title)
}

async setTittleCiiu(tittleCiiu: string) {
  await this.tittleChangeCiiu.next(tittleCiiu);
  console.log("Service setTittle",tittleCiiu)
}


}
