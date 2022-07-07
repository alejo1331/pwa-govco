import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactosDeEmergenciaComponent } from './contactos-de-emergencia.component';

describe('ContactosDeEmergenciaComponent', () => {
  let component: ContactosDeEmergenciaComponent;
  let fixture: ComponentFixture<ContactosDeEmergenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactosDeEmergenciaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactosDeEmergenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
