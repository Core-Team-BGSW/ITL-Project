import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestiontestService {

  private apiUrl = 'http://localhost:8080/api/questionsAshraf';

  constructor(private http: HttpClient) {}

  getQuestions(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl+"/get");
  }

  submitResponses(data: { userId: string; responses: any[] }): Observable<any> {
    return this.http.post(this.apiUrl+"/save", data);
  }
}
