
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

  private apiurl = 'http://localhost:3000'; // Ensure this URL matches your backend setup

  constructor(private http: HttpClient) { }

  // Fetch all users
  GetAll(): Observable<any> {
    return this.http.get(`${this.apiurl}/user`).pipe(
      catchError(this.handleError)
    );
  }

  // Fetch user by code
  Getbycode(code: any): Observable<any> {
    return this.http.get(`${this.apiurl}/user/${code}`).pipe(
      catchError(this.handleError)
    );
  }

  // Register new user
  Proceedregister(inputdata: any): Observable<any> {
    return this.http.post(`${this.apiurl}/registernew`, inputdata).pipe(
      catchError(this.handleError)
    );
  }

  // Update user information
  Updateuser(code: any, inputdata: any): Observable<any> {
    return this.http.put(`${this.apiurl}/user/${code}`, inputdata).pipe(
      catchError(this.handleError)
    );
  }

  // Handle errors from HTTP requests
  private handleError(error: HttpErrorResponse) {
    // Log the error to the console
    console.error('An error occurred:', error.message);

    // Optionally, you could use different handling strategies based on the error status
    if (error.status === 0) {
      console.error('A network error occurred.');
    } else if (error.status === 404) {
      console.error('Resource not found.');
    } else {
      console.error(`Backend returned code ${error.status}, body was: ${error.error}`);
    }

    // Return an observable with a user-facing error message
    return throwError('Something went wrong; please try again later.');
  }
}
