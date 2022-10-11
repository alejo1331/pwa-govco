import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalTutorialesPwaComponent } from './modal-tutoriales-pwa.component';

describe('ModalTutorialesPwaComponent', () => {
  let component: ModalTutorialesPwaComponent;
  let fixture: ComponentFixture<ModalTutorialesPwaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalTutorialesPwaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalTutorialesPwaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
