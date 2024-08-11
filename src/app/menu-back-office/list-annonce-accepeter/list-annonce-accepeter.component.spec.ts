import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAnnonceAccepeterComponent } from './list-annonce-accepeter.component';

describe('ListAnnonceAccepeterComponent', () => {
  let component: ListAnnonceAccepeterComponent;
  let fixture: ComponentFixture<ListAnnonceAccepeterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListAnnonceAccepeterComponent]
    });
    fixture = TestBed.createComponent(ListAnnonceAccepeterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
