import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dialog-content-example-dialog',
  templateUrl: './service-area-content.component.html',
  styleUrls: ['./service-area-content.component.scss'],
})
export class ServiceAreaContentComponent implements OnInit {
  selected: boolean = false;
  constructor() {}

  ngOnInit(): void {}
}
