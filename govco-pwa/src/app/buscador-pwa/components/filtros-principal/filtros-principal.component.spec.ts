import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltrosPrincipalComponent } from './filtros-principal.component';

describe('FiltrosPrincipalComponent', () => {
  let component: FiltrosPrincipalComponent;
  let fixture: ComponentFixture<FiltrosPrincipalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FiltrosPrincipalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltrosPrincipalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
