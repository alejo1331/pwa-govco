/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { GovcoBuscadorGeneralComponent } from './govco-buscador-general.component';

describe('GovcoBuscadorGeneralComponent', () => {
  let component: GovcoBuscadorGeneralComponent;
  let fixture: ComponentFixture<GovcoBuscadorGeneralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GovcoBuscadorGeneralComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GovcoBuscadorGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
