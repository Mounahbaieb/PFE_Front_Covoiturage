import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Invitation } from 'src/app/model/Invitation';

@Injectable({
  providedIn: 'root'
})
export class InvitationService {
  private url = 'http://localhost:3000/invitations';

  constructor(private httpClient: HttpClient) {}

  getInvitations(): Observable<Invitation[]> {
    return this.httpClient.get<Invitation[]>(this.url);
  }

  ONDELETE(id: string): Observable<any> {
     return this.httpClient.delete(`http://localhost:3000/invitations/${id}`);
}

  GETALL(): Observable<Invitation[]> {
    return this.httpClient.get<Invitation[]>(this.url);
  }
}
