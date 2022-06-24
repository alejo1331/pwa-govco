import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing'

import { FooterComponent } from './footer.component';
import { By } from '@angular/platform-browser';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      declarations: [
        FooterComponent,
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Estado cerrado (false) de cada uno de los accordions', () => {
    const estadoAccordionOne = 'false'
    const estadoAccordionTwo = 'false'
    const estadoAccordionThree = 'false'

    expect(component.estadoAccordionOne).toEqual(estadoAccordionOne);
    expect(component.estadoAccordionTwo).toEqual(estadoAccordionTwo);
    expect(component.estadoAccordionThree).toEqual(estadoAccordionThree);
  });

});
