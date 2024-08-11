import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSousAdminComponent } from './modal-sous-admin.component';

describe('ModalSousAdminComponent', () => {
  let component: ModalSousAdminComponent;
  let fixture: ComponentFixture<ModalSousAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalSousAdminComponent]
    });
    fixture = TestBed.createComponent(ModalSousAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
