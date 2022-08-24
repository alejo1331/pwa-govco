import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreadcumbMomentosComponent } from './breadcumb-momentos.component';

describe('BreadcumbMomentosComponent', () => {
  let component: BreadcumbMomentosComponent;
  let fixture: ComponentFixture<BreadcumbMomentosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BreadcumbMomentosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BreadcumbMomentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
