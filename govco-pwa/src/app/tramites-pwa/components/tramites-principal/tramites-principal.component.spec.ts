import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TramitesPrincipalComponent } from './tramites-principal.component';

describe('TramitesPrincipalComponent', () => {
  let component: TramitesPrincipalComponent;
  let fixture: ComponentFixture<TramitesPrincipalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TramitesPrincipalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TramitesPrincipalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
