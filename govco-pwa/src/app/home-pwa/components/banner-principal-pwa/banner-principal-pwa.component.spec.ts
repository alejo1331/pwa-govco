/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BannerPrincipalPwaComponent } from './banner-principal-pwa.component';

describe('BannerPrincipalPwaComponent', () => {
  let component: BannerPrincipalPwaComponent;
  let fixture: ComponentFixture<BannerPrincipalPwaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BannerPrincipalPwaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BannerPrincipalPwaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
