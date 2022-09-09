import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarruselDosComponent } from './carrusel-dos.component';

describe('CarruselDosComponent', () => {
  let component: CarruselDosComponent;
  let fixture: ComponentFixture<CarruselDosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarruselDosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarruselDosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
