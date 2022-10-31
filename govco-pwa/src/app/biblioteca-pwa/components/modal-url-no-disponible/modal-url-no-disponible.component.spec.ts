import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalUrlNoDisponibleComponent } from './modal-url-no-disponible.component';

describe('ModalUrlNoDisponibleComponent', () => {
  let component: ModalUrlNoDisponibleComponent;
  let fixture: ComponentFixture<ModalUrlNoDisponibleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalUrlNoDisponibleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalUrlNoDisponibleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
