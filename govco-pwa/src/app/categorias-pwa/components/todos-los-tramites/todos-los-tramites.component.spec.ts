import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodosLosTramitesComponent } from './todos-los-tramites.component';

describe('TodosLosTramitesComponent', () => {
  let component: TodosLosTramitesComponent;
  let fixture: ComponentFixture<TodosLosTramitesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodosLosTramitesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodosLosTramitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
