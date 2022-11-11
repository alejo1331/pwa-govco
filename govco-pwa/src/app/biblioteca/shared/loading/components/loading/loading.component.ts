import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent {

  loading: boolean;
  loadingSubscription: Subscription;

  constructor(private loadingService: LoadingService) {
    this.loading = false;
  }


  ngAfterViewInit() {
    this.loadingService.receivedFilter.subscribe((param: boolean) => {
      this.loading = param;
    });
  }

  ngOnDestroy(): void {
    if (this.loadingSubscription) {
      this.loadingSubscription.unsubscribe();
    }
  }

}
