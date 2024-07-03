
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
import {ChangeDetectionStrategy, Component, model,inject} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogModule  } from '@angular/material/dialog';
import { DialogModule } from "@angular/cdk/dialog";
import { DialogboxsubmitComponent } from "../dialogboxsubmit/dialogboxsubmit.component";


interface FormData {
  region: string;
  country: string;
  location: string;
  locationCode: string;
  entity: string;
  GB: string;
  localITL: string;
  localITLProxy: string;
  KAM: string;
  department: string;
  building: string;
  floor: string;
  labNo: string;
  primaryCoordinator: string;
  costCenter: string;
  kindOfLab: string;
  purposeOfLab: string;
  brief: string;
  ACLRequired: boolean;
  CMDBRequired: boolean;
  greenPorts?: number;
  yellowPorts?: number;
  redPorts?: number;
}


@Component({
    selector: 'app-lab_commission',
    standalone: true,
    templateUrl: './lab_commission.component.html',
    styleUrl: './lab_commission.component.scss',
    imports: [HomeComponent, SidebarComponent, RouterLink, RouterOutlet, LabCommissionComponent,CommonModule,
      MatTabsModule,MatButtonModule,MatTabLabel,MatInputModule,MatFormFieldModule,MatSelectModule,FormsModule,MatCardModule,MatCheckboxModule,MatRadioModule,MatDialogModule,DialogModule ], changeDetection: ChangeDetectionStrategy.OnPush,
})






export class LabCommissionComponent {

  fileSelected = false;
  selectedFile: File | null = null; // Initialize selectedFile to null
  excelData: any[] = []; // Array to store parsed Excel data
  previewVisible = false; // Flag to control preview visibility
  tabIndex = 0; // Index of the active tabY
  dialog1= inject(MatDialog);




    // /////////////////////////////////////////////////////////////////////onfileupload////////////////////////////////////////////////////////////////////////////

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


// //////////////////////////////////////////////////////////////////////onfileSubmit//////////////////////////////////////////////////////////////////////////////////////
  onfileSubmit(){
    // Open confirmation dialog
    console.log('File submitted');
    //this.openConfirmationDialog();
  }




  // /////////////////////////////////////////////////////////////////////onDownloadTemplate////////////////////////////////////////////////////////////////////////////






  onDownloadTemplate(){
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Template Sheet');

    const headerRow = worksheet.addRow(['Sr.No','Region','Country','Location', 'Location-Code', 'Entity','GB','Local-ITL','Local-ITL Proxy','DH','KAM','Dept Name','Building','Floor','Lab No','Cost Center','Lab Responsible NTID (Primary)','Lab Responsible NTID (Secondary)','ACL Implemented(Yes/NO)']);
    const firstRow = worksheet.addRow(['example','APAC','IN','Bangalore', 'Bani-ADUGODI', 'BGSW','PG','ada3kor','muk3kor','DH-NTID','grs2kor','EEM','ADUGODI-602','5th','C-520','654D678','Lab Responsible NTID (Primary)','Lab Responsible NTID (Secondary)','Yes']);

    headerRow.font = { bold: true };
    headerRow.alignment = { vertical: 'middle', horizontal: 'center' };
    headerRow.eachCell((cell, number) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFFF' },
      };
    });

    firstRow.font = { italic: true };
    firstRow.alignment = { vertical: 'middle', horizontal: 'center' };
    firstRow.eachCell((cell, number) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFFFFF' }

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


// //////////////////////////////////////////////////////////////////////onregionchange//////////////////////////////////////////////////////////////////////////////////////


  regionchange(event: Event) {
    const selectedregion = (event.target as HTMLSelectElement).value;
    const countrySelect = document.getElementById('countrySelect') as HTMLSelectElement;

    // Clear previous options
    countrySelect.innerHTML = '';

    if (selectedregion === 'APAC') {
      this.populateOptionsR(["Select Country","AU","BD","CN","HK","ID","IN","JP","KH","KR","LA","LK","MM","MY","NZ","PH","PK","SG","TH","TW","VN"]);
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


  // //////////////////////////////////////////////////////////////////////oncountrychange//////////////////////////////////////////////////////////////////////////////////////

  countrychange(event: Event) {
    const selectedcountry = (event.target as HTMLSelectElement).value;
    const locationselect = document.getElementById('locationselect') as HTMLSelectElement;

    // Clear previous options
    locationselect.innerHTML = '';

    if (selectedcountry === 'IN') {
      this.populateOptionsL(["Select location","Bangalore", "Hyderabad",'Pune', 'Coimbatore','Nagnathpura']);
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



  // //////////////////////////////////////////////////////////////////////onlocationchange//////////////////////////////////////////////////////////////////////////////////////

  locationchangeha(event: Event) {
    const selectedlocation = (event.target as HTMLSelectElement).value;
    const codeSelect = document.getElementById('codeSelect') as HTMLSelectElement;

    // Clear previous options
    codeSelect.innerHTML = ' ';

    if (selectedlocation === 'Bangalore') {
      this.populateOptionsCo(["Select Location-Code","Bani-ADUGODI",'Ban-RBIN','BanM-BANGTP','BanO-OMTP','Kor-Kormangala']);
    } else if (selectedlocation === 'Hyderabad') {
      this.populateOptionsCo(["Select Location-Code",'HYD-Hyderabad']);
    }else if (selectedlocation === 'Pune') {
      this.populateOptionsCo(["Select Location-Code",'PUA']);
    }else if (selectedlocation === 'Coimbatore') {
      this.populateOptionsCo(["Select Location-Code",'Cob-SEZ','Cob2-ILKG','Cob5-GTP']);
    }else if (selectedlocation === 'Nagnathpura') {
      this.populateOptionsCo(["Select Location-Code",'NH3-Nagnathpura']);
    }
  }

  populateOptionsCo(options: string[]) {
    const codeSelect = document.getElementById('codeSelect') as HTMLSelectElement;

    options.forEach(option => {
      const optionElem = document.createElement('option');
      optionElem.value = option;
      optionElem.textContent = option;
      codeSelect.appendChild(optionElem);
    });
  }
// //////////////////////////////////////////////////////////////////////oncodechange//////////////////////////////////////////////////////////////////////////////////////

  codechange(event: Event) {
    const selectedCode = (event.target as HTMLSelectElement).value;
    const buildingSelect = document.getElementById('buildingSelect') as HTMLSelectElement;

    // Clear previous options
    buildingSelect.innerHTML = ' ';

    if (selectedCode === 'Bani-ADUGODI') {
      this.populateOptionsB(["Select Building","ADUGODI-601","ADUGODI-602","ADUGODI-603","ADUGODI-605"]);
    } else if (selectedCode === 'HYD-Hyderabad') {
      this.populateOptionsB(["Select Building",'HYD-Hyderabad']);
    }else if (selectedCode === 'HYD2-Hyderabad') {
      this.populateOptionsB(["Select Building",'HYD2-Hyderabad']);
    }else if (selectedCode === 'PUA') {
      this.populateOptionsB(["Select Building",'PUA']);
    }
    else if (selectedCode === 'Cob-SEZ') {
      this.populateOptionsB(["Select Building",'Cob-SEZ1','Cob-SEZ2']);
    }
    else if (selectedCode === 'Cob2-ILKG') {
      this.populateOptionsB(["Select Building",'Cob2-ILKG']);
    }else if (selectedCode === 'Cob5-GTP') {
      this.populateOptionsB(["Select Building",'Cob5-GTP']);
    }else if (selectedCode === 'NH3-Nagnathpura') {
      this.populateOptionsB(["Select Building",'NH3-Nagnathpura']);
    }
    else if (selectedCode === 'Ban-RBIN') {
      this.populateOptionsB(["Select Building",'RBIN-103','RBIN-105']);
    }
    else if (selectedCode === 'BanM-BANGTP') {
      this.populateOptionsB(["Select Building",'BanM-BANGTP']);
    }
    else if (selectedCode === 'BanO-OMTP') {
      this.populateOptionsB(["Select Building",'BanO-OMTP']);
    }
    else if (selectedCode === 'Kor-Kormangala') {
      this.populateOptionsB(["Select Building",'Kor-901','Kor-903','Kor-905']);
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
  selectedGB : string='';
  //DH: string = '';
  KAM: string = '';
  labelPosition: string="";
// //////////////////////////////////////////////////////////////////////onentityChange//////////////////////////////////////////////////////////////////////////////////////

  entityChange(event: Event) {
    this.selectedEntity = (event.target as HTMLSelectElement).value;
    // Automatically fill Local-ITL based on selected entity
    if (this.selectedEntity === 'BGSW') {
      this.localITL = 'ada2kor';
      this.localITLproxy ='MNU1KOR';
    } else {
      this.localITL = ''; // Clear localITL for other entities
      this.localITLproxy ='';
    }
  }
  isBGSWOrBGSV(): boolean {
    return this.selectedEntity === 'BGSW' || this.selectedEntity === 'BGSV';
  }

// //////////////////////////////////////////////////////////////////////onGBchange//////////////////////////////////////////////////////////////////////////////////////

  GBChange(event: Event) {
    this.selectedGB = (event.target as HTMLSelectElement).value;
    // Automatically fill Local-ITL based on selected entity
    if (this.selectedGB === 'PG') {
      //this.DH = 'ada3kor';
      this.KAM ='grs2kor';
    } else {
      //this.DH = ''; // Clear localITL for other entities
      this.KAM ='';
    }
  }

  readonly cmdbradio = model<'before' | 'after'>('after');


  // /////////////////////////////////////////////////////////////////////onReset - formfill////////////////////////////////////////////////////////////////////////////


  onReset() {
    // Reload the page
    window.location.reload();
  }
// /////////////////////////////////////////////////////////////////////onSubmit - formfill////////////////////////////////////////////////////////////////////////////





nextUniqueId: number = 1; // Initial unique ID counter

formData: FormData = {
  region: '',
  country: '',
  location: '',
  locationCode: '',
  entity: '',
  GB: '',
  localITL: '',
  localITLProxy: '',
  KAM: '',
  department: '',
  building: '',
  floor: '',
  labNo: '',
  primaryCoordinator: '',
  costCenter: '',
  kindOfLab: '',
  purposeOfLab: '',
  brief: '',
  ACLRequired: false,
  CMDBRequired: false
};


onSubmit(): void {

  console.log('Form Submitted', this.formData);
  this.dialog1.open(DialogboxsubmitComponent, {
    width: '800px',
    data: {form: this.formData} // Pass formData to dialog
  });
}


  resetForm(): void {
    this.formData = {
      region: '',
      country: '',
      location: '',
      locationCode: '',
      entity: '',
      GB: '',
      localITL: '',
      localITLProxy: '',
      KAM: '',
      department: '',
      building: '',
      floor: '',
      labNo: '',
      primaryCoordinator: '',
      costCenter: '',
      kindOfLab: '',
      purposeOfLab: '',
      brief: '',
      ACLRequired: false,
      CMDBRequired: false
    };
  }




getMissingFields(): string[] {
  const missingFields: string[] = [];
  if (!this.localITL) {
    missingFields.push('Local-ITL');
  }
  if (!this.localITLproxy) {
    missingFields.push('Local-ITL Proxy');
  }
  if (!this.selectedEntity) {
    missingFields.push('Entity');
  }
  if (!this.selectedGB) {
    missingFields.push('GB');
  }
  // Add more fields as needed
  return missingFields;
}

}

