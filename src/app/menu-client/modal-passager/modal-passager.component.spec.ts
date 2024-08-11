import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalPassagerComponent } from './modal-passager.component';

describe('ModalPassagerComponent', () => {
  let component: ModalPassagerComponent;
  let fixture: ComponentFixture<ModalPassagerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalPassagerComponent]
    });
    fixture = TestBed.createComponent(ModalPassagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
