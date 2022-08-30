import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginadorTramitesObligatoriosComponent } from './paginador-tramites-obligatorios.component';

describe('PaginadorTramitesObligatoriosComponent', () => {
  let component: PaginadorTramitesObligatoriosComponent;
  let fixture: ComponentFixture<PaginadorTramitesObligatoriosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaginadorTramitesObligatoriosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginadorTramitesObligatoriosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
