import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerDetalleSeccionesInternasComponent } from './banner-detalle-internas-dos.component';

describe('BannerDetalleSeccionesInternasComponent', () => {
  let component: BannerDetalleSeccionesInternasComponent;
  let fixture: ComponentFixture<BannerDetalleSeccionesInternasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BannerDetalleSeccionesInternasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BannerDetalleSeccionesInternasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
