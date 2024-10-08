import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RouterLink } from '@angular/router';
import { DataService } from '../../data.service';
import { FilterPipe } from '../../filter.pipe';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-audit',
  standalone: true,
  imports: [RouterLink, CommonModule, FilterPipe, FormsModule],
  templateUrl: './audit.component.html',
  styleUrl: './audit.component.scss'
})
export class AuditComponent {
  dataList!: any[];
  labList: any[] = [];
  errorMessage: string | undefined;
  searchQuery: string = '';
  filteredLabList: any[] = [];
  expandedLabId: string | null = null; // To track which lab is expanded
  p :any;
  readonly dialog = inject(MatDialog);



  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.loadLabList();

  }

  loadLabList(): void {
    this.dataService.getAllData()
      .subscribe({
        next: (data) => {
          this.labList = data;
          this.filteredLabList = data; // Initialize filtered list with all data
        },
        error: (err) => this.errorMessage = err
      });
  }



  onSearch(): void {
    const query = this.searchQuery.toLowerCase();
    this.filteredLabList = this.labList.filter(lab =>
      Object.values(lab).some(value =>
        (value as string).toString().toLowerCase().includes(query)
      )
    );
  }



  // Toggle the visibility of the details section
  toggleDetails(labId: string): void {
    if (this.expandedLabId === labId) {
      this.expandedLabId = null; // Collapse if already expanded
    } else {
      this.expandedLabId = labId; // Expand the selected lab
    }
  }

  // Check if a lab is expanded
  isExpanded(labId: string): boolean {
    return this.expandedLabId === labId;
  }

  showPopup = false;  // Controls popup visibility
  name = '';
  date: string | null = null;

  // Method to handle form submission
  onSubmit() {
    // Process form data here
    console.log('Name:', this.name);
    console.log('Date:', this.date);

    // Optionally close the popup after submission
    this.closePopup();
  }

  // Method to close the popup
  closePopup() {
    this.showPopup = false;
  }




}
