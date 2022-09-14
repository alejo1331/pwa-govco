import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarruselUnoComponent } from './carrusel-uno.component';

describe('CarruselUnoComponent', () => {
  let component: CarruselUnoComponent;
  let fixture: ComponentFixture<CarruselUnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarruselUnoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarruselUnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
