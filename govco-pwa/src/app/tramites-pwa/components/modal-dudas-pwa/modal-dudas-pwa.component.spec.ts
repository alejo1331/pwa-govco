import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDudasPwaComponent } from './modal-dudas-pwa.component';

describe('ModalDudasPwaComponent', () => {
  let component: ModalDudasPwaComponent;
  let fixture: ComponentFixture<ModalDudasPwaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalDudasPwaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDudasPwaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
