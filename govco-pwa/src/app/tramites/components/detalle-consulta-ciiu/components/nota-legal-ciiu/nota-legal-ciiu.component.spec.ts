import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotaLegalCiiuComponent } from './nota-legal-ciiu.component';

describe('NotaLegalCiiuComponent', () => {
  let component: NotaLegalCiiuComponent;
  let fixture: ComponentFixture<NotaLegalCiiuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotaLegalCiiuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotaLegalCiiuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
