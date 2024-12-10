import { Component, OnInit, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FilterPipe } from '../../filter.pipe';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { DialogdecommissionComponent } from '../../lab-decommission/dialogdecommission/dialogdecommission.component';
import { DataService } from '../../data.service';
import { AngularModule } from '../../angularmodule/angularmodule.module';
import { imagemodule } from '../../angularmodule/imagemodule.module';
import { MatIconRegistry } from '@angular/material/icon';
import { ToastrService } from 'ngx-toastr';
import { DateFormatPipe } from '../../service/date-format.pipe';
import { LoginService } from '../../service/login.service';

@Component({
  selector: 'app-lab-decommission',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    RouterOutlet,
    FormsModule,
    FilterPipe,
    MatButtonModule,
    AngularModule,
    imagemodule,
    DateFormatPipe,
  ],
  templateUrl: './lab-decommission.component.html',
  styleUrls: ['./lab-decommission.component.scss'],
})
export class LabDecommissionComponent implements OnInit {
  labList: any[] = [];
  errorMessage: string | undefined;
  searchQuery: string = '';
  filteredLabList: any[] = [];
  expandedLabId: string | null = null;
  ntId: any;
  readonly dialog = inject(MatDialog);
  isLoading: boolean = false;
  userId: string | null = null;
  constructor(
    private dataService: DataService,
    private toastr: ToastrService,
    private authService: LoginService
  ) {}

  ngOnInit(): void {
    this.authService.userId$.subscribe((id) => {
      this.userId = id;
      if (id) {
        this.loadLabList(id);
      }
    });
  }
  //function  for loading lab list
  loadLabList(ntId?: string): void {
    this.isLoading = true;
    this.dataService.reponsibleLabs(ntId).subscribe({
      next: (data) => {
        this.labList = data;
        this.filteredLabList = this.labList;
        this.isLoading = false;
        console.log(data);
      },
      error: (err) => {
        this.errorMessage = err;
        this.isLoading = false;
      },
    });
  }

  removeLab(id: any): void {
    if (confirm('Are you sure you want to remove this lab?')) {
      const labId = id.timestamp ? id.timestamp : id;
      console.log('Removing lab with Id:', labId);
      this.dataService.archiveSelectedLab(labId.toString()).subscribe(
        (response) => {
          console.log('Lab data Archived:', response.message);
          // Remove the deleted lab from the list
          this.labList = this.labList.filter((lab) => lab.id !== id);
          this.filteredLabList = [...this.labList]; // Update filtered list as well
          this.toastr.success('Lab has been Archived Succesfully');
        },
        (error) => {
          console.error('Error Archiving lab:', error);
          this.toastr.error('Error: Please contact Administrator');
          alert('Error Archiving lab');
        }
      );
    }
  }

  onSearch(): void {
    const query = this.searchQuery.toLowerCase();
    this.filteredLabList = this.labList.filter((lab) =>
      Object.values(lab).some((value) =>
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

  openDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    this.dialog.open(DialogdecommissionComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
}
