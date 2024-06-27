import { Component } from '@angular/core';
import { HomeComponent } from "../../admin/home/home.component";
import { SidebarComponent } from "../../admin/sidebar/sidebar.component";
import * as ExcelJS from 'exceljs';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { saveAs } from 'file-saver';
import { CommonModule } from '@angular/common';
import { MatTabLabel, MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';


@Component({
    selector: 'app-lab_commission',
    standalone: true,
    templateUrl: './lab_commission.component.html',
    styleUrl: './lab_commission.component.scss',
    imports: [HomeComponent, SidebarComponent, RouterLink, RouterOutlet, LabCommissionComponent,CommonModule,
      MatTabsModule,MatButtonModule,MatTabLabel,MatInputModule,MatFormFieldModule,MatSelectModule ],
})
export class LabCommissionComponent {
  fileSelected = false;
  selectedFile: File | null = null; // Initialize selectedFile to null
  excelData: any[] = []; // Array to store parsed Excel data
  previewVisible = false; // Flag to control preview visibility
  tabIndex = 0; // Index of the active tabY

  constructor() { }

  onFileChanged(event: any) {
    this.selectedFile = event.target.files[0];
    this.fileSelected = true; // Enable preview button
  }

  onPreview() {
    if (this.selectedFile) {
      const fileReader = new FileReader();
      fileReader.onload = (e: any) => {
        const arrayBuffer = e.target.result;
        this.parseExcel(arrayBuffer);
      };
      fileReader.readAsArrayBuffer(this.selectedFile);
    }
  }

  private parseExcel(arrayBuffer: any) {
    const workbook = new ExcelJS.Workbook();
    workbook.xlsx.load(arrayBuffer)
      .then(() => {
        const worksheet = workbook.getWorksheet(1);
        this.excelData = [];

        worksheet?.eachRow({ includeEmpty: false }, (row, rowNumber) => {
          // Assuming row.values is an array of cell values
          this.excelData.push(row.values);
        });
        this.previewVisible = true;

        // Optionally, you can navigate to a new route or display a preview component here
        // For simplicity, we will log the data to console
        console.log('Parsed Excel Data:', this.excelData);
      })
      .catch(error => {
        console.error('Error parsing Excel:', error);
        // Handle error
      });
  }

  onSubmit() {
    // Implement submit functionality
    console.log('Submit button clicked');
    // You can implement further logic here, such as uploading the file to a server
  }

  onDownloadTemplate(){
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Template Sheet');

    const headerRow = worksheet.addRow(['Sr.No','Location', 'Location Code', 'Building','GB','Dept Name','Lab No','Cost Center','Purpose','Lab Responsible','Lab resposibe (s)','Lab Responsible NTID (Primary)','Lab Responsible NTID (Secondary)','Present DH','DH NTID','KAM','KAM NTID','ACL Required','ACL Implemented(Yes/NO)']);
    headerRow.font = { bold: true };
    headerRow.alignment = { vertical: 'middle', horizontal: 'center' };
    headerRow.eachCell((cell, number) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFFF' },
      };
    });

    // Example: Adding headers to the worksheet
    // worksheet?.addRow(['Location', 'Location Code', 'Building','GB','Dept Name','Lab No','Cost Center','Purpose','Lab Responsible','Lab resposibe (s)','Lab Responsible NTID (Primary)','Lab Responsible NTID (Secondary)','Present DH','DH NTID','KAM','KAM NTID','ACL Required','ACL Implemented(Yes/NO)']);

    // Generate Excel file and save
    workbook?.xlsx.writeBuffer().then((buffer: ArrayBuffer) => {
      const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      saveAs(blob, 'NewLabCommission_Template.xlsx');
    });

  }
}

