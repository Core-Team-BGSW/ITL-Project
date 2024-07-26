// lab-decommission.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LabDecommissionService {
  private apiUrl = 'http://localhost:3000/api/labdecommission'; // API URL

  constructor(private http: HttpClient) {}

  getLabDecommissionData(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
