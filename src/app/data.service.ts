// data.service.ts

import { Injectable } from '@angular/core';
import { HttpClient , HttpErrorResponse} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private baseUrl = 'http://localhost:3000/Lablist'; // Replace with your backend server URL

  constructor(private http: HttpClient) {}

  getAllData(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl).pipe(
      catchError(this.handleError)
    );
  }

  removeLab(id: string): Observable<void> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<void>(url).pipe(
      catchError(this.handleError)
    );
  }
  submitForm(data: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, data);
  }

  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error.message);
    return throwError(() => new Error('Something went wrong; please try again later.'));
  }


  getPendingApplications(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/pending`);
  }

  updateApplicationStatus(id: string, status: string, rejectionRemarks?: string): Observable<any> {
    const body = { approvalStatus: status, rejectionRemarks };
    return this.http.patch<any>(`${this.baseUrl}/${id}/approve-or-reject`, body);
  }

}
