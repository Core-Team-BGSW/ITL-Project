import { Component , OnInit} from '@angular/core';
import { DataService } from '../../data.service';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FilterPipe } from '../../filter.pipe';



@Component({
  selector: 'app-lab-decommission',
  standalone: true,
  imports: [ RouterLink,CommonModule,RouterOutlet,FormsModule,FilterPipe],
  templateUrl: './lab-decommission.component.html',
  styleUrl: './lab-decommission.component.scss'
})
export class LabDecommissionComponent  implements OnInit  {

  dataList!: any[];
  labList: any[] = [];
  errorMessage: string | undefined;
  searchQuery: string = '';
  filteredLabList: any[] = [];
  expandedLabId: string | null = null; // To track which lab is expanded



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

  removeLab(id: string): void {
    if (confirm('Are you sure you want to remove this lab?')) {
      this.dataService.removeLab(id).subscribe({
        next: () => {
          // Remove the item from the local list
          this.labList = this.labList.filter(lab => lab._id !== id);
          this.filteredLabList = this.filteredLabList.filter(lab => lab._id !== id);
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

}
