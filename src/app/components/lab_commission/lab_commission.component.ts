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
import { FormsModule } from '@angular/forms';


@Component({
    selector: 'app-lab_commission',
    standalone: true,
    templateUrl: './lab_commission.component.html',
    styleUrl: './lab_commission.component.scss',
    imports: [HomeComponent, SidebarComponent, RouterLink, RouterOutlet, LabCommissionComponent,CommonModule,
      MatTabsModule,MatButtonModule,MatTabLabel,MatInputModule,MatFormFieldModule,MatSelectModule,FormsModule ],
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




  regionchange(event: Event) {
    const selectedregion = (event.target as HTMLSelectElement).value;
    const countrySelect = document.getElementById('countrySelect') as HTMLSelectElement;

    // Clear previous options
    countrySelect.innerHTML = '';

    if (selectedregion === 'APAC') {
      this.populateOptionsR(["AU","BD","CN","HK","ID","IN","JP","KH","KR","LA","LK","MM","MY","NZ","PH","PK","SG","TH","TW","VN"]);
    } else if (selectedregion === 'EMEA') {
      this.populateOptionsR(["DE",'PL']);
    } else if (selectedregion === 'AMERICA') {
      this.populateOptionsR(['Pune']);

    }
  }

  populateOptionsR(options: string[]) {
    const countrySelect = document.getElementById('countrySelect') as HTMLSelectElement;

    options.forEach(option => {
      const optionElem = document.createElement('option');
      optionElem.value = option;
      optionElem.textContent = option;
      countrySelect.appendChild(optionElem);
    });
  }
  countrychange(event: Event) {
    const selectedcountry = (event.target as HTMLSelectElement).value;
    const locationselect = document.getElementById('locationselect') as HTMLSelectElement;

    // Clear previous options
    locationselect.innerHTML = '';

    if (selectedcountry === 'IN') {
      this.populateOptionsL(["Select location","Bangalore", "Hyderabad",'Pune', 'Coimbatore']);
    } else if (selectedcountry === 'CN') {
      this.populateOptionsL(['Beijing']);

    }
  }

  populateOptionsL(options: string[]) {
    const locationselect = document.getElementById('locationselect') as HTMLSelectElement;

    options.forEach(option => {
      const optionElem = document.createElement('option');
      optionElem.value = option;
      optionElem.textContent = option;
      locationselect.appendChild(optionElem);
    });
  }

  locationchangeha(event: Event) {
    const selectedlocation = (event.target as HTMLSelectElement).value;
    const buildingSelect = document.getElementById('buildingSelect') as HTMLSelectElement;

    // Clear previous options
    buildingSelect.innerHTML = ' ';

    if (selectedlocation === 'Bangalore') {
      this.populateOptionsB(["Select Building","ADUGODI-601","ADUGODI-602","ADUGODI-603","ADUGODI-605",]);
    } else if (selectedlocation === 'CN') {
      this.populateOptionsB(['Beijing']);

    }
  }

  populateOptionsB(options: string[]) {
    const buildingSelect = document.getElementById('buildingSelect') as HTMLSelectElement;

    options.forEach(option => {
      const optionElem = document.createElement('option');
      optionElem.value = option;
      optionElem.textContent = option;
      buildingSelect.appendChild(optionElem);
    });
  }


  selectedEntity: string = '';
  localITL: string = '';
  localITLproxy: string = '';

  entityChange(event: Event) {
    this.selectedEntity = (event.target as HTMLSelectElement).value;
    // Automatically fill Local-ITL based on selected entity
    if (this.selectedEntity === 'BGSW') {
      this.localITL = 'ada3kor';
      this.localITLproxy ='muk3kor';
    } else {
      this.localITL = ''; // Clear localITL for other entities
      this.localITLproxy ='';
    }
  }



}






