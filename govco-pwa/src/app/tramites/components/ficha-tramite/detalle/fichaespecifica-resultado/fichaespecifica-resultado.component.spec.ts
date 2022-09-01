import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FichaespecificaResultadoComponent } from './fichaespecifica-resultado.component';

describe('FichaespecificaResultadoComponent', () => {
  let component: FichaespecificaResultadoComponent;
  let fixture: ComponentFixture<FichaespecificaResultadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FichaespecificaResultadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FichaespecificaResultadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
