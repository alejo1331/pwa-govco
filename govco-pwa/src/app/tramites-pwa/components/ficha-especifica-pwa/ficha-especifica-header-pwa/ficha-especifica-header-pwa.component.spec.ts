import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FichaEspecificaHeaderPwaComponent } from './ficha-especifica-header-pwa.component';

describe('FichaEspecificaHeaderPwaComponent', () => {
  let component: FichaEspecificaHeaderPwaComponent;
  let fixture: ComponentFixture<FichaEspecificaHeaderPwaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FichaEspecificaHeaderPwaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FichaEspecificaHeaderPwaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
