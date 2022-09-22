import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceAreaContentComponent } from './service-area-content.component';
import { MatDialogModule } from '@angular/material/dialog';

describe('ServiceAreaContentComponent', () => {
  let component: ServiceAreaContentComponent;
  let fixture: ComponentFixture<ServiceAreaContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ServiceAreaContentComponent],
      imports: [MatDialogModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceAreaContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Debe de crearse correctamente', () => {
    expect(component).toBeTruthy();
  });
});
