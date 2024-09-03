
// import { Injectable } from '@angular/core';
// import { HttpClient , HttpErrorResponse} from '@angular/common/http';
// import { Observable, throwError } from 'rxjs';
// import { catchError } from 'rxjs/operators';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthserviceService {

//   constructor(private http: HttpClient) { }

//   apiurl = 'http://localhost:3000'

//   GetAll(): Observable<any> {
//     return this.http.get(`${this.apiurl}/user`).pipe(
//       catchError(this.handleError)
//     );
//   }

//   Getbycode(code: any): Observable<any> {
//     return this.http.get(`${this.apiurl}/user/${code}`).pipe(
//       catchError(this.handleError)
//     );
//   }

//   Proceedregister(inputdata: any): Observable<any> {
//     return this.http.post('http://localhost:3000/registernew', inputdata).pipe(
//       catchError(this.handleError)
//     );
//   }

//   Updateuser(code: any, inputdata: any): Observable<any> {
//     return this.http.put(`${this.apiurl}/user/${code}`, inputdata).pipe(
//       catchError(this.handleError)
//     );
//   }

//   private handleError(error: any) {
//     console.error('An error occurred', error);
//     return throwError(error);
//   }







// }


import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {

  private apiUrl = 'http://localhost:3000/register/newuser'; // Ensure this URL matches your backend setup

  constructor(private http: HttpClient) {}

  registerUser(userData: { id: string; password: string }): Observable<any> {
    return this.http.post(this.apiUrl, userData);
  }

  getAllData(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error.message);
    return throwError(() => new Error('Something went wrong; please try again later.'));
  }
}
