import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  currentUrl: string = '';
  previousUrl: string = '';
  private selectedServiceOption: number = 0;

  getSelectedServiceOption(): number {
    return this.selectedServiceOption;
  }

  setSelectedServiceOption(option:number): void {
    this.selectedServiceOption = option;
  }
}
