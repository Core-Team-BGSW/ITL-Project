// data.service.ts
//Edited By Jay Jambhale

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  /**
   * @param formData - The JSON string of the form data to submit.
   * @returns An observable containing the response from the server.
   */

  //private baseUrl = 'http://localhost:3000/Lablist'; // Replace with your backend server URLgit
  private locationUrl = 'http://localhost:8080/boschLabsLocation/location/api';
  private formsubmitUrl = 'http://localhost:8080/boschLabs/form/submit';
  private uniqueEntityUrl = 'http://localhost:8080/boschLabs/allEntity';
  private allLabsUrl = 'http://localhost:8080/boschLabs/allLabs';
  private uniqueGBUrl = 'http://localhost:8080/boschLabs/allGB';

  constructor(private http: HttpClient) {}

  getAllLabData(): Observable<any[]> {
    return this.http
      .get<any[]>(this.allLabsUrl)
      .pipe(catchError(this.handleError));
  }

  // removeLab(id: string): Observable<void> {
  //   const url = `${this.baseUrl}/${id}`;
  //   return this.http.delete<void>(url).pipe(catchError(this.handleError));
  // }

  submitForm(formData: any): Observable<string> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post(this.formsubmitUrl, JSON.stringify(formData), {
      headers,
      responseType: 'text',
    });
  }

  getGBOptions(): Observable<any[]> {
    return this.http.get<any[]>(this.uniqueGBUrl); // Adjust endpoint as needed
  }

  getEntityOptions(): Observable<any[]> {
    return this.http.get<any[]>(this.uniqueEntityUrl);
  }

  // getPendingApplications(): Observable<any[]> {
  //   return this.http.get<any[]>(`${this.baseUrl}/pending`);
  // }

  getLocations(): Observable<any> {
    return this.http.get<any>(this.locationUrl);
  }

  private handleError(error: any): Observable<never> {
    let errorMessage = 'An unknown error occurred!';
    let responseBody: any;

    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;

      // Log the entire error object for inspection
      console.error('Full error response:', error);

      // Attempt to log the response body to see its format
      if (error.error) {
        responseBody = error.error; // Get the response body
        console.error('Response body:', responseBody);
      }

      // Log the Content-Type header if available
      if (error.headers && error.headers.get) {
        const contentType = error.headers.get('Content-Type');
        console.error('Response Content-Type:', contentType);
      }
    }

    console.error(errorMessage); // Log the error message
    return throwError(errorMessage); // Return an observable with a user-facing error message
  }
}
