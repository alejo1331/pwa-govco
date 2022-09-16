import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerDetalleInternasDosComponent } from './banner-detalle-internas-dos.component';

describe('BannerDetalleInternasDosComponent', () => {
  let component: BannerDetalleInternasDosComponent;
  let fixture: ComponentFixture<BannerDetalleInternasDosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BannerDetalleInternasDosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BannerDetalleInternasDosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
