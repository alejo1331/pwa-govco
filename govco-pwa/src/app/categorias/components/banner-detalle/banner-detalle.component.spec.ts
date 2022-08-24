import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerDetalleComponent } from './banner-detalle.component';

describe('BannerDetalleComponent', () => {
  let component: BannerDetalleComponent;
  let fixture: ComponentFixture<BannerDetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BannerDetalleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BannerDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
