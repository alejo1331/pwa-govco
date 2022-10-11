import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TramitesIdAcordeonComponent } from './tramites-id-acordeon.component';

describe('TramitesIdAcordeonComponent', () => {
  let component: TramitesIdAcordeonComponent;
  let fixture: ComponentFixture<TramitesIdAcordeonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TramitesIdAcordeonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TramitesIdAcordeonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Debe de crearse correctamente', () => {
    expect(component).toBeTruthy();
  });
});
