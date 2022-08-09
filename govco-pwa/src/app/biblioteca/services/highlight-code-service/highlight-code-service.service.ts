import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

// import 'prismjs';
// import 'clipboard';
// import 'prismjs/plugins/toolbar/prism-toolbar';
// import 'prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard';
// import 'prismjs/plugins/show-language/prism-show-language';
// import 'prismjs/components/prism-css';
// import 'prismjs/components/prism-javascript';
// import 'prismjs/components/prism-java';
// import 'prismjs/components/prism-markup';

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
