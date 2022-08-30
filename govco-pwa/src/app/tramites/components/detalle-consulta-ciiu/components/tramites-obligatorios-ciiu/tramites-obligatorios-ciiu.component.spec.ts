import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TramitesObligatoriosCiiuComponent } from './tramites-obligatorios-ciiu.component';

describe('TramitesObligatoriosCiiuComponent', () => {
  let component: TramitesObligatoriosCiiuComponent;
  let fixture: ComponentFixture<TramitesObligatoriosCiiuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TramitesObligatoriosCiiuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TramitesObligatoriosCiiuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
