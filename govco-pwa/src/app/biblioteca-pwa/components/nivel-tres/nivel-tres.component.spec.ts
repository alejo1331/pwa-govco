/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { NivelTresComponent } from './nivel-tres.component';

describe('NivelTresComponent', () => {
  let component: NivelTresComponent;
  let fixture: ComponentFixture<NivelTresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NivelTresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NivelTresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
