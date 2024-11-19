import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResponseService {
  private apiUrl = 'http://localhost:8080/api/responses';

  constructor(private http: HttpClient) { }

  // submitResponse(response: any): Observable<any> {
  //   return this.http.post(this.apiUrl, response);
  // }
  saveResponse(response: any): Observable<any> {
    return this.http.post(this.apiUrl, response);
  }

  // Fetch all responses
  // getResponses(): Observable<any> {
  //   return this.http.get(this.apiUrl);
  // }
}
