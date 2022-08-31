import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalTutorialesComponent } from './modal-tutoriales.component';

describe('ModalTutorialesComponent', () => {
  let component: ModalTutorialesComponent;
  let fixture: ComponentFixture<ModalTutorialesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalTutorialesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalTutorialesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
