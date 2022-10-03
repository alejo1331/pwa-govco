import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PuntosDeAtencionComponent } from './puntos-de-atencion.component';

describe('PuntosDeAtencionComponent', () => {
  let component: PuntosDeAtencionComponent;
  let fixture: ComponentFixture<PuntosDeAtencionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PuntosDeAtencionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PuntosDeAtencionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
