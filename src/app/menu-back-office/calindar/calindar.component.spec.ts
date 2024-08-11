import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalindarComponent } from './calindar.component';

describe('CalindarComponent', () => {
  let component: CalindarComponent;
  let fixture: ComponentFixture<CalindarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CalindarComponent]
    });
    fixture = TestBed.createComponent(CalindarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
