import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalErrorUrlComponent } from './modal-error-url.component';

describe('ModalErrorUrlComponent', () => {
  let component: ModalErrorUrlComponent;
  let fixture: ComponentFixture<ModalErrorUrlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalErrorUrlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalErrorUrlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
