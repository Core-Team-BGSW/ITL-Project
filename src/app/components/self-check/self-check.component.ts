import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  FormsModule,
} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatTabLabel, MatTabsModule } from '@angular/material/tabs';
import { Router } from '@angular/router';
import {
  MatDatepickerModule,
  matDatepickerAnimations,
} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { DataService } from '../../data.service';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { FilterPipe } from '../../filter.pipe';
import { HttpClient } from '@angular/common/http';

interface Question {
  question: string;
  answer: string;
  showAnswer: boolean;
}
@Component({
  selector: 'app-self-check',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    MatCardModule,
    MatRadioModule,
    MatButtonModule,
    MatInputModule,
    MatTabLabel,
    MatTabsModule,
    MatNativeDateModule,
    MatDatepickerModule,
    RouterLink,
    CommonModule,
    RouterOutlet,
    FormsModule,
    MatMenuModule,
    FilterPipe,
  ],
  templateUrl: './self-check.component.html',
  styleUrl: './self-check.component.scss',
})
export class SelfCheckComponent {
  dataList!: any[];
  labList: any[] = [];
  errorMessage: string | undefined;
  searchQuery: string = '';
  filteredLabList: any[] = [];

  constructor(
    private dataService: DataService,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.loadLabList();
  }
  private apiurl = 'http://localhost:8080/boschLabs/allLabsWithEntity';

  // loadLabList(): void {
  //   this.dataService.getAllData()
  //     .subscribe({
  //       next: (data) => {
  //         this.labList = data;
  //         this.filteredLabList = data; // Initialize filtered list with all data
  //       },
  //       error: (err) => this.errorMessage = err
  //     });
  // }

  loadLabList(): void {
    this.http.get<any[]>(`${this.apiurl}`).subscribe({
      next: (data) => {
        this.labList = data;
        this.filteredLabList = this.labList;
      },
      error: (err) => (this.errorMessage = err),
    });
  }
  onSearch(): void {
    const query = this.searchQuery.toLowerCase();
    this.filteredLabList = this.labList.filter((lab) =>
      Object.values(lab).some((value) =>
        (value as string).toString().toLowerCase().includes(query)
      )
    );
  }
  expandedLabId: string | null = null; // To track which lab is expanded
  expandedaudit: string | null = null;
  // Toggle the visibility of the details section
  toggleDetails(labId: string): void {
    if (this.expandedLabId === labId) {
      this.expandedLabId = null; // Collapse if already expanded
    } else {
      this.expandedLabId = labId; // Expand the selected lab
    }
  }
  toggledetails1(audit: string): void {
    if (this.expandedaudit == audit) {
      this.expandedaudit = null;
    } else {
      this.expandedaudit = audit;
    }
  }
  // Check if a lab is expanded
  isExpanded(labId: string): boolean {
    return this.expandedLabId === labId;
  }
  isExpanded1(audit: string): boolean {
    return this.expandedaudit === audit;
  }
  isCollapsed = true; // Initial state of the collapsible content
  toggleCollapse(): void {
    this.isCollapsed = !this.isCollapsed;
  }
  formsVisible = false; // Initial state of the forms
  showForms(): void {
    this.formsVisible = !this.formsVisible;
  }
  isFormExpanded = false;
  toggleForm(): void {
    this.isFormExpanded = !this.isFormExpanded;
  }
  isDropdownVisible = false;
  toggleDropdown() {
    this.isDropdownVisible = !this.isDropdownVisible;
  }
  openForm(labentityName: string) {
    // condition if the enitity is "BGSW"
    if (labentityName === 'BGSW') {
      const confirmed = confirm(
        'This page will redirect to ITL Self-audit tool,before self-audit please contact ITL Consulatncy team (bd_toa-ets1_itl_consultancy_team@bcn.bosch.com)'
      );
      if (confirmed) {
        window.open(
          'https://apxbgswapexp.webapp.inside.bosch.cloud/apxbgswapexp/r/cibteapex_prod/itl-prd/self-claim-report?session=5134802335988'
        );
      }
    } else if (labentityName == 'bgsw') {
      const confirmed = confirm(
        'This page will redirect to ITL Self-audit tool,before self-audit please contact ITL Consulatncy team (bd_toa-ets1_itl_consultancy_team@bcn.bosch.com)'
      );
      if (confirmed) {
        window.open(
          'https://apxbgswapexp.webapp.inside.bosch.cloud/apxbgswapexp/r/cibteapex_prod/itl-prd/self-claim-report?session=5134802335988'
        );
      }
    } else {
      window.open('/self-audit');
    }
  }
}
