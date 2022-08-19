import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodigosCiiuYTramitesComponent } from './codigos-ciiu-y-tramites.component';

describe('CodigosCiiuYTramitesComponent', () => {
  let component: CodigosCiiuYTramitesComponent;
  let fixture: ComponentFixture<CodigosCiiuYTramitesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CodigosCiiuYTramitesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CodigosCiiuYTramitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
