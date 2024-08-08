import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LabData } from '../models/lab-data';


@Injectable({
  providedIn: 'root'
})
export class LabDataService {

  constructor(private http: HttpClient) { }

  private baseUrl = 'http://localhost:8080/boschLabs/form';



  // Method to submit form data to the backend
  submitForm(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/submit`, data);
  }
  getAll(): Observable<LabData[]> {
    return this.http.get<LabData[]>(this.baseUrl);
  }

  get(id: any): Observable<LabData> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(this.baseUrl, data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(this.baseUrl);
  }

  findByTitle(title: any): Observable<LabData[]> {
    return this.http.get<LabData[]>(`${this.baseUrl}?title=${title}`);
  }
}
