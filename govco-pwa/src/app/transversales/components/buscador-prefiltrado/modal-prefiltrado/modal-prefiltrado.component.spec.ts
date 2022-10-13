import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalPrefiltradoComponent } from './modal-prefiltrado.component';

describe('ModalPrefiltradoComponent', () => {
  let component: ModalPrefiltradoComponent;
  let fixture: ComponentFixture<ModalPrefiltradoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalPrefiltradoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalPrefiltradoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
