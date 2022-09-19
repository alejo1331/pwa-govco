import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceAreaContentComponent } from './service-area-content.component';

describe('DialogContentExampleDialogComponent', () => {
  let component: ServiceAreaContentComponent;
  let fixture: ComponentFixture<ServiceAreaContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ServiceAreaContentComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceAreaContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
