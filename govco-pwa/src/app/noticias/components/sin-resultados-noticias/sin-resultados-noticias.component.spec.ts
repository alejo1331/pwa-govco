import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SinResultadosNoticiasComponent } from './sin-resultados-noticias.component';

describe('SinResultadosNoticiasComponent', () => {
  let component: SinResultadosNoticiasComponent;
  let fixture: ComponentFixture<SinResultadosNoticiasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SinResultadosNoticiasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SinResultadosNoticiasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
