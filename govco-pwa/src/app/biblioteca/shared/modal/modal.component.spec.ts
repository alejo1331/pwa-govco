import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { SafePipe } from 'src/app/pipes/safe.pipe';
import {NgbModal, NgbModalRef, NgbActiveModal, NgbModule} from "@ng-bootstrap/ng-bootstrap";

import { ModalComponent } from './modal.component';
import { BrowserModule } from '@angular/platform-browser';

describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports : [BrowserModule, NgbModule],
      declarations: [ ModalComponent, SafePipe ],
      providers: [NgbActiveModal]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', inject([NgbActiveModal], (activeModal: NgbActiveModal) => {
    expect(component).toBeTruthy();
  }));
});
