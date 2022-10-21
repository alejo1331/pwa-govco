import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscadorPrincipalComponent } from './buscador-principal.component';

describe('BuscadorPrincipalComponent', () => {
  let component: BuscadorPrincipalComponent;
  let fixture: ComponentFixture<BuscadorPrincipalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuscadorPrincipalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscadorPrincipalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
