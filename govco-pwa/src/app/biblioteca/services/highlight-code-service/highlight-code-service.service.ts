import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

declare var Prism: any;

@Injectable({
  providedIn: 'root'
})
export class HighlightcodeService {

  
  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  highlightAll() {
    if (isPlatformBrowser(this.platformId)) {
      Prism.highlightAll();
    }
  }
}
