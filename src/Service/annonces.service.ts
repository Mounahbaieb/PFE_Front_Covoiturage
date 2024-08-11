import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin, map, of, switchMap } from 'rxjs';
import { Annonce } from 'src/app/model/Annonce';
import { Conducteur } from 'src/app/model/Conducteur';
import { EtatAnnonce } from 'src/app/model/EtatAnnonce';
import { Voiture } from 'src/app/model/Voiture';

@Injectable({
  providedIn: 'root'
})
export class AnnoncesService {
  private url = 'http://localhost:9009/api/annonces';
  private urletat = 'http://localhost:9009/api/annonces/etat';

  private conducteurUrl = 'http://localhost:9009/api/conducteurs';
  private voitureUrl = 'http://localhost:9009/api/voitures';

  constructor(private http: HttpClient) {}

  createAnnonce(data: Annonce): Observable<Annonce> {
    data.etat = EtatAnnonce.EN_COURS;

    return this.http.post<Annonce>(this.url, data);
  }

updateAnnonce(annonce: Annonce): Observable<Annonce> {
  return this.http.put<Annonce>(`${this.url}/${annonce.id}`, annonce);
}


  ONDELETE(id: string): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
  edit(rideForm: any, id: string): Observable<any> {
    return this.http.put<any>(`${this.url}/${id}`,rideForm);
  }
  getAllAnnonces(): Observable<Annonce[]> {
    return this.http.get<Annonce[]>(this.url);
  }
getAnnoncesByConducteurId(conducteurId: string): Observable<Annonce[]> {
  return this.http.get<Annonce[]>(`${this.url}/conducteur/${conducteurId}`);
}

  getAnnonceById(id: string): Observable<Annonce> {
    return this.http.get<Annonce>(`${this.url}/${id}`);
  }
    // Méthodes pour obtenir le conducteur et la voiture
    getConducteurById(id: string): Observable<Conducteur> {
      return this.http.get<Conducteur>(`${this.conducteurUrl}/${id}`);
    }
  
    getVoitureById(id: string): Observable<Voiture> {
      return this.http.get<Voiture>(`${this.voitureUrl}/${id}`);
    }
  
    // Méthode pour obtenir les détails complets d'une annonce
    getAnnonceAvecDetails(id: string): Observable<any> {
      return this.getAnnonceById(id).pipe(
        switchMap(annonce => {
          const conducteur$ = this.getConducteurById(annonce.conducteurId!);
          const voiture$ = this.getVoitureById(annonce.voitureId!);
          return forkJoin([conducteur$, voiture$, of(annonce)]);
        })
      );
    }

    getAnnoncesNonAcceptees(): Observable<Annonce[]> {
      return this.http.get<Annonce[]>(`${this.urletat}?etat=${EtatAnnonce.EN_COURS}`);
    }


  getAnnoncesAcceptees(): Observable<Annonce[]> {
    return this.http.get<Annonce[]>(`${this.urletat}?etat=${EtatAnnonce.ACCEPTEE}`);
  }
 

 
}
