import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccionDocumentoComponent } from './accion-documento.component';

describe('AccionDocumentoComponent', () => {
  let component: AccionDocumentoComponent;
  let fixture: ComponentFixture<AccionDocumentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccionDocumentoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccionDocumentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
