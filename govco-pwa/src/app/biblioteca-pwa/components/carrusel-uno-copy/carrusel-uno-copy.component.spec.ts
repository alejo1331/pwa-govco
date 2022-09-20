import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarruselUnoCopyComponent } from './carrusel-uno-copy.component';

describe('CarruselUnoCopyComponent', () => {
  let component: CarruselUnoCopyComponent;
  let fixture: ComponentFixture<CarruselUnoCopyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarruselUnoCopyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarruselUnoCopyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
