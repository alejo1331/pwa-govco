/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CardsServiciosParaEntidadesComponent } from './cards-servicios-para-entidades.component';

describe('CardsServiciosParaEntidadesComponent', () => {
  let component: CardsServiciosParaEntidadesComponent;
  let fixture: ComponentFixture<CardsServiciosParaEntidadesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardsServiciosParaEntidadesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardsServiciosParaEntidadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
