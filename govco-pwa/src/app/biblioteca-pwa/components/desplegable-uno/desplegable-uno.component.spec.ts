import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesplegableUnoComponent } from './desplegable-uno.component';

describe('DesplegableUnoComponent', () => {
  let component: DesplegableUnoComponent;
  let fixture: ComponentFixture<DesplegableUnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DesplegableUnoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DesplegableUnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
