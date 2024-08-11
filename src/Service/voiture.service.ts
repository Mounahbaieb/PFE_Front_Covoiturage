import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Voiture } from 'src/app/model/Voiture';

@Injectable({
  providedIn: 'root'
})
export class VoitureService {

  constructor(private http:HttpClient) { }
  saveCarInfo(carData: any): Observable<any> {
    return this.http.post<any>(`http://localhost:9009/api/voitures`, carData);
  }
  getVoitureById(id: string): Observable<Voiture> {
    return this.http.get<Voiture>(`http://localhost:9009/api/voitures/${id}`);
  }
  editVoiture(data: any, id: string): Observable<any> {
    return this.http.put(`http://localhost:9009/api/voitures/${id}`, data);
  }
}
