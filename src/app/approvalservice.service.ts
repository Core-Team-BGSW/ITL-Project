// src/app/services/approval.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApprovalService {

  private apiUrl = 'http://localhost:3000/Lablist/pending'; // Adjust based on your server URL
  private baseUrl = 'http://localhost:3000/Lablist/'

  constructor(private http: HttpClient) { }

  getPendingItems(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  approveItem(data: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, data);
    //return this.http.patch<any>(`http://localhost:3000/Lablist/${id}/approve`, {});
  }

  rejectItem(id: string, rejectionRemarks: string): Observable<any> {
    return this.http.patch<any>(`http://localhost:3000/Lablist/${id}/reject`, { rejectionRemarks });
  }
}

