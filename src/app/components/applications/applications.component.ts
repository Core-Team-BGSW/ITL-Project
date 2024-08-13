import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogContent, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { ApprovalService } from '../../approvalservice.service';
import { AppReviewComponent } from './app-review/app-review.component';


@Component({
  selector: 'app-applications',
  standalone: true,
  imports: [RouterLink, FormsModule, MatDialogContent, CommonModule, MatDialogModule],
  templateUrl: './applications.component.html',
  styleUrl: './applications.component.scss'
})
export class ApplicationsComponent implements OnInit {

  pendingApplications: any[] = [];

  constructor(private http: HttpClient, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadPendingApplications();
  }

  loadPendingApplications(): void {
    this.http.get<any[]>('http://localhost:3000/Lablist/pending')
      .subscribe(
        data => this.pendingApplications = data,
        error => console.error('Error loading applications', error)
      );
  }

  approveApplication(id: string): void {
    this.http.post(`http://localhost:3000/Lablist/approve/${id}`, {})
      .subscribe(
        () => this.loadPendingApplications(),
        error => console.error('Error approving application', error)
      );
  }

  openReviewDialog(application: any): void {
    this.dialog.open(AppReviewComponent, {
      width: '500px',
      data: application
    });
  }

}
