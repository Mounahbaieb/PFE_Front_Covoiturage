import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailAnnonceRechercheComponent } from './detail-annonce-recherche.component';

describe('DetailAnnonceRechercheComponent', () => {
  let component: DetailAnnonceRechercheComponent;
  let fixture: ComponentFixture<DetailAnnonceRechercheComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailAnnonceRechercheComponent]
    });
    fixture = TestBed.createComponent(DetailAnnonceRechercheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
