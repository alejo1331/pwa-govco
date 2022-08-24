import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerSeccionesInternasComponent } from './banner-secciones-internas.component';

describe('BannerSeccionesInternasComponent', () => {
  let component: BannerSeccionesInternasComponent;
  let fixture: ComponentFixture<BannerSeccionesInternasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BannerSeccionesInternasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BannerSeccionesInternasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
