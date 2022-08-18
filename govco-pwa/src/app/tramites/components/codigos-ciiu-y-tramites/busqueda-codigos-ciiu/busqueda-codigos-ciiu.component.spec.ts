import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusquedaCodigosCiiuComponent } from './busqueda-codigos-ciiu.component';

describe('BusquedaCodigosCiiuComponent', () => {
  let component: BusquedaCodigosCiiuComponent;
  let fixture: ComponentFixture<BusquedaCodigosCiiuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusquedaCodigosCiiuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusquedaCodigosCiiuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
