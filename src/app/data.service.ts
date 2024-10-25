// data.service.ts
//Edited By Jay Jambhale

import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

interface Location {
  Region: string;
  Country: string;
  LocationCode: string;
}

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private baseUrl = 'http://localhost:3000/Lablist'; // Replace with your backend server URLgit
  private locationUrl = 'http://localhost:8080/boschLabsLocation/location/api';
  private formsubmitUrl = 'http://localhost:8080/boschLabs/form/submit';
  private entityUrl =
    'http://localhost:8080/boschLabsByEntity/labData/allEntity';

  constructor(private http: HttpClient) {}

  getAllData(): Observable<any[]> {
    return this.http
      .get<any[]>(this.baseUrl)
      .pipe(catchError(this.handleError));
  }

  removeLab(id: string): Observable<void> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<void>(url).pipe(catchError(this.handleError));
  }

  /**
   * @param formData - The JSON string of the form data to submit.
   * @returns An observable containing the response from the server.
   */

  submitForm(formData: any): Observable<string> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post(this.formsubmitUrl, JSON.stringify(formData), {
      headers,
      responseType: 'text',
    });
  }

  // getGBOptions(): Observable<string[]> {
  //   return this.http.get<string[]>(this.entityUrl); // Adjust endpoint as needed
  // }

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

  getPendingApplications(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/pending`);
  }

  updateApplicationStatus(
    id: string,
    status: string,
    rejectionRemarks?: string
  ): Observable<any> {
    const body = { approvalStatus: status, rejectionRemarks };
    return this.http.patch<any>(
      `${this.baseUrl}/${id}/approve-or-reject`,
      body
    );
  }

  getLocations(): Observable<any> {
    return this.http.get<any>(this.locationUrl);
  }

  // getKAMSuggestions(gb: string): Observable<string[]> {
  //   return this.http.get<string[]>(`${this.apiURL}/kam-suggestions?gb=${gb}`);
  // }

  // // Method to get Department suggestions based on selected GB
  // getDepartmentSuggestions(gb: string): Observable<string[]> {
  //   return this.http.get<string[]>(
  //     `${this.apiURL}/department-suggestions?gb=${gb}`
  //   );
  // }

  // // Method to get DH suggestions based on selected Department
  // getDHSuggestions(department: string): Observable<string[]> {
  //   return this.http.get<string[]>(
  //     `${this.apiURL}/dh-suggestions?department=${department}`
  //   );
  // }
}
