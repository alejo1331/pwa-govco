import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeolocalizacionFormularioComponent } from './geolocalizacion-formulario.component';

describe('GeolocalizacionFormularioComponent', () => {
  let component: GeolocalizacionFormularioComponent;
  let fixture: ComponentFixture<GeolocalizacionFormularioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeolocalizacionFormularioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GeolocalizacionFormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
