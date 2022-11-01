/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { NivelDosHeaderBuscadorComponent } from './nivel-dos-header-buscador.component';

describe('NivelDosHeaderBuscadorComponent', () => {
  let component: NivelDosHeaderBuscadorComponent;
  let fixture: ComponentFixture<NivelDosHeaderBuscadorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NivelDosHeaderBuscadorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NivelDosHeaderBuscadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
