import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalConducteurComponent } from './modal-conducteur.component';

describe('ModalConducteurComponent', () => {
  let component: ModalConducteurComponent;
  let fixture: ComponentFixture<ModalConducteurComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalConducteurComponent]
    });
    fixture = TestBed.createComponent(ModalConducteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
