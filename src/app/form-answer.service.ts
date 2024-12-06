import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormAnswerService {
  private questionsUrl ='http://localhost:8080/api/questions';
  private apiUrl = 'http://localhost:8080/responses/consolidate';

  constructor(private http: HttpClient) { }

  getAllQuestions(): Observable<any[]> {
    return this.http.get<any[]>(this.questionsUrl);
  }
  
  saveFormAnswer(formdata: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, formdata);
}

}
