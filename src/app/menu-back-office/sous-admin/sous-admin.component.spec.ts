import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SousAdminComponent } from './sous-admin.component';

describe('SousAdminComponent', () => {
  let component: SousAdminComponent;
  let fixture: ComponentFixture<SousAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SousAdminComponent]
    });
    fixture = TestBed.createComponent(SousAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
