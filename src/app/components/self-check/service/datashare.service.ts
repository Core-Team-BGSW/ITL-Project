import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DatashareService {

  constructor() { }

  private labDetails: any;

  setLabDetails(lab: any) {
    this.labDetails = lab;
  }

  getLabDetails() {
    return this.labDetails;
  }
}
