
import { Injectable } from '@angular/core';
import { HttpClient , HttpErrorResponse} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {

  constructor(private http: HttpClient) { }

  apiurl = 'http://localhost:3000/'

  GetAll(): Observable<any> {
    return this.http.get(`${this.apiurl}/user`).pipe(
      catchError(this.handleError)
    );
  }

  Getbycode(code: any): Observable<any> {
    return this.http.get(`${this.apiurl}/user/${code}`).pipe(
      catchError(this.handleError)
    );
  }

  Proceedregister(inputdata: any): Observable<any> {
    return this.http.post(`${this.apiurl}/registernew`, inputdata).pipe(
      catchError(this.handleError)
    );
  }

  Updateuser(code: any, inputdata: any): Observable<any> {
    return this.http.put(`${this.apiurl}/user/${code}`, inputdata).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any) {
    console.error('An error occurred', error);
    return throwError(error);
  }







}
