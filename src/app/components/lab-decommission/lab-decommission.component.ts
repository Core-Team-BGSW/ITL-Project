import { Component, OnInit, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FilterPipe } from '../../filter.pipe';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { DialogdecommissionComponent } from '../../lab-decommission/dialogdecommission/dialogdecommission.component';
// import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-lab-decommission',
  standalone: true,
  imports: [RouterLink, CommonModule, RouterOutlet, FormsModule, FilterPipe, MatButtonModule],
  templateUrl: './lab-decommission.component.html',
  styleUrls: ['./lab-decommission.component.scss']
})
export class LabDecommissionComponent implements OnInit {

  labList: any[] = [];
  errorMessage: string | undefined;
  searchQuery: string = '';
  filteredLabList: any[] = [];
  expandedLabId: string | null = null;
  readonly dialog = inject(MatDialog);
  private http = inject(HttpClient);

  // API URL for the Spring Boot backend
  private apiUrl = `http://localhost:8080/boschLabs/allLabs`;

  constructor() {}

  ngOnInit(): void {
    this.loadLabList();
  }

  loadLabList(): void {
    this.http.get<any[]>(`${this.apiUrl}`)
      .subscribe({
        next: (data) => {
          this.labList = data;
          this.filteredLabList = data; // Initialize filtered list with all data
        },
        error: (err) => this.errorMessage = err
      });
  }

  removeLab(id: string): void {
    if (confirm('Are you sure you want to remove this lab?')) {
      this.http.delete<void>(`${this.apiUrl}/delete/${id}`)
        .subscribe({
          next: () => {
            // Remove the item from the local list
            this.labList = this.labList.filter(lab => lab._id !== id);
            this.filteredLabList = this.filteredLabList.filter(lab => lab._id !== id);
            this.dialog.open(DialogdecommissionComponent, {
              width: '40%',
              height: '200px'
            });
            console.log('Lab removed successfully');
          },
          error: (err) => this.errorMessage = err
        });
    }
  }

  onSearch(): void {
    const query = this.searchQuery.toLowerCase();
    this.filteredLabList = this.labList.filter(lab =>
      Object.values(lab).some(value =>
        (value as string).toString().toLowerCase().includes(query)
      )
    );
  }

  toggleDetails(labId: string): void {
    this.expandedLabId = this.expandedLabId === labId ? null : labId;
  }

  isExpanded(labId: string): boolean {
    return this.expandedLabId === labId;
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(DialogdecommissionComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
}
