// src/app/services/approval.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApprovalService {

  private baseUrl = 'http://localhost:3000/Lablist';

  constructor(private http: HttpClient) {}

  getPendingApplications(): Observable<any> {
    return this.http.get(`${this.baseUrl}/pending`);
  }

  approveApplication(id: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/approve/${id}`, {});
  }

  rejectApplication(id: string, rejectionRemarks: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/reject/${id}`, { rejectionRemarks });
  }
}

