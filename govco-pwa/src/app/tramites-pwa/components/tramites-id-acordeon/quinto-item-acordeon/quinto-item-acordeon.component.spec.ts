/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { QuintoItemAcordeonComponent } from './quinto-item-acordeon.component';

describe('QuintoItemAcordeonComponent', () => {
  let component: QuintoItemAcordeonComponent;
  let fixture: ComponentFixture<QuintoItemAcordeonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuintoItemAcordeonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuintoItemAcordeonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
