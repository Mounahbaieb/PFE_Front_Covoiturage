import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reservation } from 'src/app/model/Reservation';

@Injectable({
  providedIn: 'root'
})
export class ReservationsService {
  private apiUrl = 'http://localhost:9009/api/reservations';
  private api = 'http://localhost:9009/api';

  constructor(private http: HttpClient) { }

  createReservation(reservation: Reservation): Observable<any> {
    return this.http.post<Reservation>(this.apiUrl, reservation);
  }

  getReservations(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(`${this.api}/reservations`);
  }
  getPassagers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.api}/passagers`);
  }
   getReservationsByAnnonceId(annonceId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/annonce/${annonceId}`);
  }
}
