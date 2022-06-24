import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntidadesEstadoComponent } from './entidades-estado.component';

describe('EntidadesEstadoComponent', () => {
  let component: EntidadesEstadoComponent;
  let fixture: ComponentFixture<EntidadesEstadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntidadesEstadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EntidadesEstadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
