import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListConducteursComponent } from './list-conducteurs.component';

describe('ListConducteursComponent', () => {
  let component: ListConducteursComponent;
  let fixture: ComponentFixture<ListConducteursComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListConducteursComponent]
    });
    fixture = TestBed.createComponent(ListConducteursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
