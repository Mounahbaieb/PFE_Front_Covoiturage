import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Passager } from 'src/app/model/Passager';

@Injectable({
  providedIn: 'root'
})
export class PassagerService {

  private api = 'http://localhost:9009/api/passagers';

  constructor(private http: HttpClient) {} 
   createPassager(passager: any): Observable<Passager> {
    return this.http.post<Passager>('http://localhost:9009/api/passagers', passager);
  }
  getAllPassagers(): Observable<Passager[]> {
    return this.http.get<Passager[]>(this.api);
  }

  getPassagerById(id: number): Observable<any> {
    return this.http.get<any>(`${this.api}/${id}`);
  }
}
