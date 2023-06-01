import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltrosPrimerNivelComponent } from './filtros-primer-nivel.component';

describe('FiltrosPrimerNivelComponent', () => {
  let component: FiltrosPrimerNivelComponent;
  let fixture: ComponentFixture<FiltrosPrimerNivelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FiltrosPrimerNivelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltrosPrimerNivelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
