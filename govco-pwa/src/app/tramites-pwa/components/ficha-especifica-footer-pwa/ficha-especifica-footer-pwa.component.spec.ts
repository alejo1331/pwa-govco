import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FichaEspecificaFooterPwaComponent } from './ficha-especifica-footer-pwa.component';

describe('FichaEspecificaFooterPwaComponent', () => {
  let component: FichaEspecificaFooterPwaComponent;
  let fixture: ComponentFixture<FichaEspecificaFooterPwaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FichaEspecificaFooterPwaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FichaEspecificaFooterPwaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
