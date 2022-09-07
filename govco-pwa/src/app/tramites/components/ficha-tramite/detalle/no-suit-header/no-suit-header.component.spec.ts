import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoSuitHeaderComponent } from './no-suit-header.component';

describe('NoSuitHeaderComponent', () => {
  let component: NoSuitHeaderComponent;
  let fixture: ComponentFixture<NoSuitHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoSuitHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoSuitHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
