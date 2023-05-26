import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoMasConsultadoComponent } from './lo-mas-consultado.component';

describe('LoMasConsultadoComponent', () => {
  let component: LoMasConsultadoComponent;
  let fixture: ComponentFixture<LoMasConsultadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoMasConsultadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoMasConsultadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
