/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SeccionContactosEmerganciaComponent } from './seccion-contactos-emergancia.component';

describe('SeccionContactosEmerganciaComponent', () => {
  let component: SeccionContactosEmerganciaComponent;
  let fixture: ComponentFixture<SeccionContactosEmerganciaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeccionContactosEmerganciaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeccionContactosEmerganciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
