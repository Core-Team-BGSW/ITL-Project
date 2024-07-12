import { Injectable,Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class DataService {



  private apiUrl = 'http://localhost:3000/api'; // replace with your backend API URL

  constructor(@Inject(HttpClient) private http: HttpClient) { }

  getData() {
    return this.http.get(`${this.apiUrl}/data`);
  }

  addData(data: any) {
    return this.http.post(`${this.apiUrl}/data`, data);
  }

  updateData(id: string, data: any) {
    return this.http.put(`${this.apiUrl}/data/${id}`, data);
  }

  deleteData(id: string) {
    return this.http.delete(`${this.apiUrl}/data/${id}`);
  }
}
