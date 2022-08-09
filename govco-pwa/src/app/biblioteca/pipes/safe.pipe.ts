import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'safe'
})
export class SafePipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) { }
  public transform(value: any, type: any) {
    if (value) {
      let embedUrl = '';
      if (type == 1 || type == undefined) {
        if (value.includes('youtu.be')) {
          const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
          let match = value.match(regExp);

          if (match && match[2].length == 11) {
            let sepratedID = match[2];
            if (type != undefined) {
              embedUrl = '//www.youtube.com/embed/' + sepratedID;
            } else {
              embedUrl = '//img.youtube.com/vi/' + sepratedID + '/mqdefault.jpg';
            }
          } else {
            embedUrl = value;
          }
        }
        else if (value.includes('facebook')) {
          embedUrl = `https://www.facebook.com/plugins/video.php?href=${value}&width=500&show_text=false&appId=1614799852082198&height=281`;
        } else {
          embedUrl = value;
        }
      } else {
        if (type == 3) { //ofimática
          embedUrl = 'https://docs.google.com/viewer?url=' + value + '&embedded=true';
        } else { //audio
          embedUrl = value;
        }
      }
      return this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
    }
  }
}
