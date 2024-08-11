import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Conducteur } from 'src/app/model/Conducteur';

@Injectable({
  providedIn: 'root'
})
export class ConducteurService {

  private apiUrl = 'http://localhost:9009/api/conducteurs/signup';

  private api = 'http://localhost:9009/api/conducteurs';

  constructor(private http: HttpClient) {}

  getConducteur(): Observable<Conducteur> {
    // Assurez-vous d'utiliser les bons en-têtes d'autorisation si nécessaire
    const headers = new HttpHeaders({
      'Authorization': 'Bearer YOUR_TOKEN_HERE'  // Remplacez YOUR_TOKEN_HERE par le token réel si nécessaire
    });
    return this.http.get<Conducteur>(`${this.api}/`, { headers });
  }
  getConducteurs(): Observable<Conducteur[]> {
    return this.http.get<Conducteur[]>(this.api);
  }

getConducteurById(id: string): Observable<Conducteur> {
  return this.http.get<Conducteur>(`http://localhost:9009/api/conducteurs/${id}`);
}

  createConducteur(conducteur: Conducteur): Observable<Conducteur> {
    return this.http.post<Conducteur>(this.apiUrl, conducteur);
  }
  editConducteur(data: any, id: string): Observable<any> {
    return this.http.put(`http://localhost:9009/api/conducteurs/${id}`, data);
  }

  save(form: any): Observable<any> {
    return this.http.post<any>('http://localhost:9009/api/conducteurs', form);
  }


  deleteConducteur(id: string): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }
}
