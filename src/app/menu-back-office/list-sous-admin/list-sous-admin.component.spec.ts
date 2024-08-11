import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSousAdminComponent } from './list-sous-admin.component';

describe('ListSousAdminComponent', () => {
  let component: ListSousAdminComponent;
  let fixture: ComponentFixture<ListSousAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListSousAdminComponent]
    });
    fixture = TestBed.createComponent(ListSousAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
