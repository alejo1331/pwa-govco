import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscadorSencilloV1Component } from './buscador-sencillo-v1.component';

describe('BuscadorSencilloV1Component', () => {
  let component: BuscadorSencilloV1Component;
  let fixture: ComponentFixture<BuscadorSencilloV1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuscadorSencilloV1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscadorSencilloV1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
