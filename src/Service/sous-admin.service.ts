import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Administrateur } from 'src/app/model/Administrateur';

@Injectable({
  providedIn: 'root'
})
export class SousAdminService {
  private apiUrl = 'http://localhost:9009/api/administrateurs/signup';

  private api = 'http://localhost:9009/api/administrateurs/login';
  private url = 'http://localhost:9009/api/administrateurs';


  constructor(private http: HttpClient) {}

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post<any>(this.api, credentials);
  }
  getSousAdmins(): Observable<Administrateur[]> {
    return this.http.get<Administrateur[]>(this.url);
  }

getSousAdminById(id: string): Observable<Administrateur> {
  return this.http.get<Administrateur>(`http://localhost:9009/api/administrateurs/${id}`);
}

  createSousAdmin(SousAdmin: Administrateur): Observable<Administrateur> {
    return this.http.post<Administrateur>(this.apiUrl, SousAdmin);
  }
  editSousAdmin(data: any, id: string): Observable<any> {
    return this.http.put(`http://localhost:9009/api/administrateurs/${id}`, data);
  }

  save(form: any): Observable<any> {
    return this.http.post<any>('http://localhost:9009/api/administrateurs', form);
  }


  deletSousAdmin(id: string): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
