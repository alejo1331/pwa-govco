/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { NivelDosComponent } from './nivel-dos.component';

describe('NivelDosComponent', () => {
  let component: NivelDosComponent;
  let fixture: ComponentFixture<NivelDosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NivelDosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NivelDosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
