/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SeccionCarpetaCiudadanaComponent } from './seccion-carpeta-ciudadana.component';

describe('SeccionCarpetaCiudadanaComponent', () => {
  let component: SeccionCarpetaCiudadanaComponent;
  let fixture: ComponentFixture<SeccionCarpetaCiudadanaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeccionCarpetaCiudadanaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeccionCarpetaCiudadanaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
