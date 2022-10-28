/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { NivelDosHeaderPrefiltrosComponent } from './nivel-dos-header-prefiltros.component';

describe('NivelDosHeaderPrefiltrosComponent', () => {
  let component: NivelDosHeaderPrefiltrosComponent;
  let fixture: ComponentFixture<NivelDosHeaderPrefiltrosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NivelDosHeaderPrefiltrosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NivelDosHeaderPrefiltrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
