import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalVerNotaComponent } from './modal-ver-nota.component';

describe('ModalVerNotaComponent', () => {
  let component: ModalVerNotaComponent;
  let fixture: ComponentFixture<ModalVerNotaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalVerNotaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalVerNotaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
