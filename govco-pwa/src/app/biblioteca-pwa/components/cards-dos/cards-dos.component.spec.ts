/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CardsDosComponent } from './cards-dos.component';

describe('CardsDosComponent', () => {
  let component: CardsDosComponent;
  let fixture: ComponentFixture<CardsDosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardsDosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardsDosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
