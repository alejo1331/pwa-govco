import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'safe'
})
export class SafePipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) { }
  transform(value: any, ...args: any[]): any {
    let embedUrl = value;

    if (value.includes('youtu.be')) {
      embedUrl = 'https://www.youtube.com/embed/' + value.split('https://youtu.be/')[1];
    }

    if (value.includes('facebook')) {
      embedUrl = `https://www.facebook.com/plugins/video.php?href=${value}&width=500&show_text=false&appId=1614799852082198&height=281`;
    }

    return this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
  }
}
