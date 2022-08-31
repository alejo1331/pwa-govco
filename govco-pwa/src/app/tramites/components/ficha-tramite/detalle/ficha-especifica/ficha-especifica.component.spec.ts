import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FichaEspecificaComponent } from './ficha-especifica.component';

describe('FichaEspecificaComponent', () => {
  let component: FichaEspecificaComponent;
  let fixture: ComponentFixture<FichaEspecificaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FichaEspecificaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FichaEspecificaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
