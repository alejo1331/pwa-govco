import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dialog-content-example-dialog',
  templateUrl: './service-area-content.component.html',
  styleUrls: ['./service-area-content.component.scss'],
})
export class ServiceAreaContentComponent implements OnInit {
  selectedY: boolean = false;
  selectedN: boolean = false;
  constructor() {}

  ngOnInit(): void {}

  selectedOption(value: string) {
    if (
      (value === 'Y' && this.selectedY === false && this.selectedN === false) ||
      (value === 'Y' && this.selectedY === false && this.selectedN === true)
    ) {
      this.selectedY = true;
      this.selectedN = false;
      document
        .querySelector('.selectionY')
        ?.classList.add('background-selection');
      document
        .querySelector('.selectionN')
        ?.classList.remove('background-selection');
    } else if (
      (value === 'N' && this.selectedY === false && this.selectedN === false) ||
      (value === 'N' && this.selectedY === true && this.selectedN === false)
    ) {
      this.selectedN = true;
      this.selectedY = false;
      document
        .querySelector('.selectionN')
        ?.classList.add('background-selection');
      document
        .querySelector('.selectionY')
        ?.classList.remove('background-selection');
    }
  }
}
