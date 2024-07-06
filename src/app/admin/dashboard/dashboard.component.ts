import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbar } from '@angular/material/toolbar';

@Component({
  selector: 'app-dashboard',
  standalone:true,
  imports:[CommonModule, MatButtonModule, MatCardModule, MatToolbar,],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],


})
export class DashboardComponent implements OnInit {

  toggleProperty = true;

  constructor() { }
  ngOnInit(): void {
    // Initialization code here
  }

  toggle() {
    this.toggleProperty = !this.toggleProperty;
  }
}
