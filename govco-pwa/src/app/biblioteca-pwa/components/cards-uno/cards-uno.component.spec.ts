import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardsUnoComponent } from './cards-uno.component';

describe('CardsUnoComponent', () => {
  let component: CardsUnoComponent;
  let fixture: ComponentFixture<CardsUnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardsUnoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardsUnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
