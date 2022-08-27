import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalClasicoComponent } from './modal-clasico.component';

describe('ModalClasicoComponent', () => {
  let component: ModalClasicoComponent;
  let fixture: ComponentFixture<ModalClasicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalClasicoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalClasicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
