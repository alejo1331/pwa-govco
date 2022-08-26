import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiciosYTramitesListComponent } from './servicios-y-tramites-list.component';

describe('ServiciosYTramitesListComponent', () => {
  let component: ServiciosYTramitesListComponent;
  let fixture: ComponentFixture<ServiciosYTramitesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiciosYTramitesListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiciosYTramitesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
