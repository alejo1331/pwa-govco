import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TramitesIdComponent } from './tramites-id.component';

describe('TramitesPrincipalComponent', () => {
  let component: TramitesIdComponent;
  let fixture: ComponentFixture<TramitesIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TramitesIdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TramitesIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
