import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesplegableDosComponent } from './desplegable-dos.component';

describe('DesplegableDosComponent', () => {
  let component: DesplegableDosComponent;
  let fixture: ComponentFixture<DesplegableDosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DesplegableDosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DesplegableDosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
