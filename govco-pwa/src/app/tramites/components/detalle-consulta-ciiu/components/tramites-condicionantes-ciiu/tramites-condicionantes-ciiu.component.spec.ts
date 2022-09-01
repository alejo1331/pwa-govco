import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TramitesCondicionantesCiiuComponent } from './tramites-condicionantes-ciiu.component';

describe('TramitesCondicionantesCiiuComponent', () => {
  let component: TramitesCondicionantesCiiuComponent;
  let fixture: ComponentFixture<TramitesCondicionantesCiiuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TramitesCondicionantesCiiuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TramitesCondicionantesCiiuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
