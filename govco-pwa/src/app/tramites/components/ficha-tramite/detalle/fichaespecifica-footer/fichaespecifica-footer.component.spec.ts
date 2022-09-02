import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FichaespecificaFooterComponent } from './fichaespecifica-footer.component';

describe('FichaespecificaFooterComponent', () => {
  let component: FichaespecificaFooterComponent;
  let fixture: ComponentFixture<FichaespecificaFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FichaespecificaFooterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FichaespecificaFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
