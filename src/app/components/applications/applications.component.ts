import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatDialogContent } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { ApprovalService } from '../../approvalservice.service';


@Component({
  selector: 'app-applications',
  standalone: true,
  imports: [RouterLink, FormsModule, MatDialogContent, CommonModule],
  templateUrl: './applications.component.html',
  styleUrl: './applications.component.scss'
})
export class ApplicationsComponent implements OnInit {

  pendingItems: any[] = [];

  constructor(private approvalService: ApprovalService) { }

  ngOnInit(): void {
    this.loadPendingItems();
  }

  loadPendingItems(): void {
    this.approvalService.getPendingItems().subscribe(
      (data) => {
        this.pendingItems = data;
      },
      (error) => {
        console.error('Error fetching pending items:', error);
      }
    );
  }

  approveItem(id: string): void {
    this.approvalService.approveItem(id).subscribe(
      () => {
        this.loadPendingItems(); // Refresh the list
      },
      (error) => {
        console.error('Error approving item:', error);
      }
    );
  }

  rejectItem(id: string, rejectionRemarks: string): void {
    this.approvalService.rejectItem(id, rejectionRemarks).subscribe(
      () => {
        this.loadPendingItems(); // Refresh the list
      },
      (error) => {
        console.error('Error rejecting item:', error);
      }
    );
  }
}
