import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltrosPrincipalComponent } from './filtros-principal.component';
import { FiltrosService } from '../../services/filtros.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('FiltrosPrincipalComponent', () => {
  let component: FiltrosPrincipalComponent;
  let fixture: ComponentFixture<FiltrosPrincipalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FiltrosPrincipalComponent ],
      providers: [FiltrosService],
      imports: [HttpClientTestingModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltrosPrincipalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Debe de crearse correctamente', () => {
    expect(component).toBeTruthy();
  });
});
