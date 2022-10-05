import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FichaEspecificaCardsPwaComponent } from './ficha-especifica-cards-pwa.component';

describe('FichaEspecificaCardsPwaComponent', () => {
  let component: FichaEspecificaCardsPwaComponent;
  let fixture: ComponentFixture<FichaEspecificaCardsPwaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FichaEspecificaCardsPwaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FichaEspecificaCardsPwaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
