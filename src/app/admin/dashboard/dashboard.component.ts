import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone:true,
  imports:[CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],


})
export class DashboardComponent implements OnInit {

  toggleProperty = false;

  constructor() { }
  ngOnInit(): void {
    // Initialization code here
  }

  toggle() {
    this.toggleProperty = !this.toggleProperty;
  }
}
