import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarpetaCiudadanaComponent } from './carpeta-ciudadana.component';

describe('CarpetaCiudadanaComponent', () => {
  let component: CarpetaCiudadanaComponent;
  let fixture: ComponentFixture<CarpetaCiudadanaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarpetaCiudadanaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarpetaCiudadanaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
