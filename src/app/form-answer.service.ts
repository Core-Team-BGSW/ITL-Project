import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormAnswerService {
  private apiUrl = 'http://localhost:8080/selfCheck/save';

  constructor(private http: HttpClient) { }
  
  saveFormAnswer(formdata: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, formdata);
}
}
