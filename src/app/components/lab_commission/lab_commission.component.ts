
import { HomeComponent } from "../../admin/home/home.component";
import { SidebarComponent } from "../../admin/sidebar/sidebar.component";
import * as ExcelJS from 'exceljs';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatTabLabel, MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';
import { MatDialog, MatDialogModule  } from '@angular/material/dialog';
import { DialogModule } from "@angular/cdk/dialog";
import { DialogboxsubmitComponent } from "../dialogboxsubmit/dialogboxsubmit.component";
import { trigger, state, style, animate, transition } from '@angular/animations';
import { ChangeDetectorRef } from "@angular/core";
import axios from 'axios';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDatepicker, MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from '@angular/material/core';
import {MatIconModule} from '@angular/material/icon';
import { DateAdapter } from '@angular/material/core';
import { ToastrService } from "ngx-toastr";
import { DataService } from '../../data.service';


interface Location {
  Region: string;
  Country: string;
  LocationCode: string;
}



@Component({
    selector: 'app-lab_commission',
    standalone: true,
    templateUrl: './lab_commission.component.html',
    styleUrl: './lab_commission.component.scss',
    animations: [
      trigger('rotateArrow', [
        state('collapsed', style({
          transform: 'rotate(0)'
        })),
        state('expanded', style({
          transform: 'rotate(180deg)'
        })),
        transition('collapsed <=> expanded', animate('0.3s ease'))
      ])
    ],
    imports: [HomeComponent, SidebarComponent, RouterLink, RouterOutlet, LabCommissionComponent,CommonModule,
      MatTabsModule,MatButtonModule,MatTabLabel,MatInputModule,MatFormFieldModule,MatSelectModule,FormsModule,MatIconModule,MatCardModule,MatCheckboxModule,MatRadioModule,MatDatepicker,MatDatepickerModule,MatNativeDateModule,
      MatDialogModule,DialogModule,FormsModule,ReactiveFormsModule, ], changeDetection: ChangeDetectionStrategy.OnPush,
})






export class LabCommissionComponent {

  fileSelected = false;
  selectedFile: File | null = null; // Initialize selectedFile to null
  excelData: any[] = []; // Array to store parsed Excel data
  previewVisible = false; // Flag to control preview visibility
  tabIndex = 0; // Index of the active tabY
  isSelected = false;
  selectedRegion: string = '';
  selectedCountry: string = '';
  selectedLocation: string = '';
  selectedCode: string = '';
  selectedEntity: string = '';
  selectedGB: string = '';
  selectedLocal: string = '';
  cmdbradio: string = ''; // Initialize cmdbradio
  sharedlabradio: string = '';
  ACLradio: string = '';
  greenport: string = '';
  redport: string = '';
  yellowport: string = '';
  localITL: string = '';
  localITLproxy: string = '';
  KAM: string = '';
  DH:string='';
  Dept:string='';
  Building:string='';
  Floor:string='';
  labno:string='';
  primarylabco:string='';
  secondarylabco:string='';
  CC:string='';
  kindoflab:string='';
  purposeoflab:string='';
  description: string='';
  ACL:string='';
  greenports:string='';
  yellowports:string='';
  redports:string='';
  cmdb:string='';
  labelPosition: string="";
  choosemethod: string="";
  selectedLabType: string = '';
  //selfauditdate: string ='';
  showOtherField: boolean = false;
  otherLabType: string = '';
  applications: any[] = [];
  labForm!: FormGroup;
  selfauditdate: Date | null = null;
  selectedDate!: Date;
  isDatePickerDisabled: boolean = false; // Control the disabled stat
  countries: string[] = [];
  regions: string[] = [];
  locationCodes: string[] = [];
  filteredCountries: string[] = [];
  filteredSites: string[] = [];
  locations: Location[] = [];;
  showValidationMessage: boolean = false;





  ngOnInit(): void {
    const today = new Date();
    // Add 6 months to the current date
    const sixMonthsFromNow = new Date(today.setMonth(today.getMonth() + 6));
    this.selectedDate = sixMonthsFromNow;
    this.isDatePickerDisabled = true;

    this.dataService.getLocations().subscribe((data) => {
      this.locations = data;
      this.regions = [...new Set(this.locations.map(loc => loc.Region))];
      this.filteredCountries = [...new Set(data.map(loc => loc.Country))];

    });
    this.loadGBOptions();

  }

    // /////////////////////////////////////////////////////////////////////onfileupload////////////////////////////////////////////////////////////////////////////

  onFileChanged(event: any) {
    this.selectedFile = event.target.files[0];
    this.fileSelected = true; // Enable preview button
  }

  // onPreview() {
  //   if (this.selectedFile) {
  //     const fileReader = new FileReader();
  //     fileReader.onload = (e: any) => {
  //       const arrayBuffer = e.target.result;
  //       this.parseExcel(arrayBuffer);
  //     };
  //     fileReader.readAsArrayBuffer(this.selectedFile);
  //   }
  // }
  onPreview() {
    if (this.selectedFile) {
      // Validate the file type (e.g., .xls or .xlsx)
      const validFileTypes = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel'];
      const fileType = this.selectedFile.type;

      if (!validFileTypes.includes(fileType)) {
        alert('Invalid file type. Please upload an Excel file (.xls or .xlsx).');
        return;
      }

      // Validate the file size (e.g., limit to 5MB)
      const maxSizeInBytes = 5 * 1024 * 1024; // 5 MB
      if (this.selectedFile.size > maxSizeInBytes) {
        alert('File size exceeds the limit of 5MB. Please upload a smaller file.');
        return;
      }

      // If validation passes, proceed to read the file
      const fileReader = new FileReader();
      fileReader.onload = (e: any) => {
        const arrayBuffer = e.target.result;
        this.parseExcel(arrayBuffer);
      };
      fileReader.readAsArrayBuffer(this.selectedFile);
    } else {
      alert('No file selected. Please upload an Excel file.');
    }
  }

  // onPreview() {
  //   if (this.selectedFile) {
  //     // Validate the file type (e.g., .xls or .xlsx)
  //     const validFileTypes = [
  //       'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  //       'application/vnd.ms-excel'
  //     ];
  //     const fileType = this.selectedFile.type;

  //     if (!validFileTypes.includes(fileType)) {
  //       alert('Invalid file type. Please upload an Excel file (.xls or .xlsx).');
  //       return;
  //     }

  //     // Validate the file size (e.g., limit to 5MB)
  //     const maxSizeInBytes = 5 * 1024 * 1024; // 5 MB
  //     if (this.selectedFile.size > maxSizeInBytes) {
  //       alert('File size exceeds the limit of 5MB. Please upload a smaller file.');
  //       return;
  //     }

  //     // Check for mandatory headers
  //     const mandatoryHeaders = {
  //       Region: '',
  //       Country: '',
  //       'Location-Code': '',
  //       Entity: '',
  //       GB: '',
  //       'Local-ITL': '',
  //       'Local-ITL Proxy': '',
  //     };

  //     // Check for missing mandatory headers
  //     const missingHeaders = Object.keys(mandatoryHeaders).filter(
  //       (header) => !mandatoryHeaders[header as keyof typeof mandatoryHeaders]
  //     );

  //     if (missingHeaders.length > 0) {
  //       console.error(`Missing mandatory headers: ${missingHeaders.join(', ')}`);
  //       alert(`Missing mandatory headers: ${missingHeaders.join(', ')}`);
  //       return;
  //     }

  //     // If validation passes, proceed to read the file
  //     const fileReader = new FileReader();
  //     fileReader.onload = (e: any) => {
  //       const arrayBuffer = e.target.result;
  //       this.parseExcel(arrayBuffer);
  //     };
  //     fileReader.readAsArrayBuffer(this.selectedFile);
  //   } else {
  //     alert('No file selected. Please upload an Excel file.');
  //   }
  // }


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

        // Manually trigger change detection
      this.changeDetectorRef.detectChanges();

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
    if (!this.selectedFile) {
      console.log('No file selected');
      return;
    }

    const confirmUpload = window.confirm('Are you sure you want to upload this file?');

    if (!confirmUpload) {
        console.log('File upload cancelled by user');
        return;
    }

    const formData = new FormData();
    formData.append('file', this.selectedFile);

    axios.post('http://localhost:3000/upload-excel', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(response => {
      console.log('File uploaded successfully:', response.data);
      // Optionally, you can clear the selected file and reset form state here
      this.selectedFile = null;
      this.excelData = [];
      this.previewVisible = false;
    })
    // .catch(error => {
    //   this.toastr.error('Check Headers')
    //   console.error('Error uploading file:', error);
    // });
  //   .catch(error => {
  //     if (error.response && error.response.data) {
  //         console.error('Error Response Data:', error.response.data);
  //         if (error.response.data.validationErrors) {
  //             const errorMessages = error.response.data.validationErrors.map((e: any) =>
  //                 `Row ${e.row}: Missing fields: ${e.missingFields.join(', ')}`
  //             ).join('\n');
  //             alert('Validation Errors:\n' + errorMessages);
  //         } else {
  //             alert('Error: ' + error.response.data.error);
  //         }
  //     } else {
  //         console.error('Error:', error);
  //         alert('An unknown error occurred.');
  //     }
  // });

  .catch(error => {
    if (error.response && error.response.data) {
        console.error('Error Response Data:', error.response.data);

        // Handle missing headers
        if (error.response.data.error === 'Missing headers') {
            const missingHeaders = error.response.data.missingHeaders.join(', ');
            alert('Missing Headers:\n' + missingHeaders);
        }

        // Handle validation errors for fields
        if (error.response.data.validationErrors) {
            const errorMessages = error.response.data.validationErrors.map((e: any) =>
                `Row ${e.row}: Missing fields: ${e.missingFields.join(', ')}`
            ).join('\n');
            alert('Validation Errors:\n' + errorMessages);
        } else {
            alert('Error: ' + error.response.data.error);
        }
    } else {
        console.error('Error:', error);
        alert('An unknown error occurred.');
    }
});


  }


  // onfileSubmit() {
  //   if (!this.selectedFile) {
  //     console.log('No file selected');
  //     return;
  //   }

  //   const confirmUpload = window.confirm('Are you sure you want to upload this file?');

  //   if (!confirmUpload) {
  //     console.log('File upload cancelled by user');
  //     return;
  //   }

  //   // Define mandatory headers
  //   const mandatoryHeaders = {
  //     Region: '',
  //     Country: '',
  //     'Location-Code': '',
  //     Entity: '',
  //     GB: '',
  //     'Local-ITL': '',
  //     'Local-ITL Proxy': '',
  //   };

  //   // Check for missing mandatory headers using type assertion
  //   const missingHeaders = Object.keys(mandatoryHeaders).filter(
  //     (header) => !mandatoryHeaders[header as keyof typeof mandatoryHeaders]
  //   );

  //   if (missingHeaders.length > 0) {
  //     console.error(`Missing mandatory headers: ${missingHeaders.join(', ')}`);
  //     alert(`Missing mandatory headers: ${missingHeaders.join(', ')}`); // Alert shows only missing headers
  //     return;
  //   }

  //   const formData = new FormData();
  //   formData.append('file', this.selectedFile);

  //   axios.post('http://localhost:3000/upload-excel', formData, {
  //     headers: {
  //       'Content-Type': 'multipart/form-data',
  //       // Add other headers if needed, but they will be empty for this check
  //     },
  //   })
  //   .then(response => {
  //     console.log('File uploaded successfully:', response.data);
  //     // Clear the selected file and reset form state here
  //     this.selectedFile = null;
  //     this.excelData = [];
  //     this.previewVisible = false;
  //   })
  //   .catch(error => {
  //     console.error('Error uploading file:', error);
  //     alert('Error uploading the file. Please try again.');
  //   });
  // }



  // /////////////////////////////////////////////////////////////////////onDownloadTemplate////////////////////////////////////////////////////////////////////////////

  onDownloadTemplate() {
    const downloadUrl = 'https://bosch.sharepoint.com/sites/ITLConsultancyService-IN-ITLCoreTeam2/_layouts/15/download.aspx?SourceUrl=https://bosch.sharepoint.com/sites/ITLConsultancyService-IN-ITLCoreTeam2/Shared%20Documents/Lab%20Portal%20Project/New_Lab-Commision_template.xlsx?d=wfcd5f25bb2dd450388d27699a78641f0';
    window.open(downloadUrl, '_blank');
  }


// //////////////////////////////////////////////////////////////////////onregionchange//////////////////////////////////////////////////////////////////////////////////////


  // regionchange(event: Event) {
  //   const selectedregion = (event.target as HTMLSelectElement).value;
  //   const countrySelect = document.getElementById('countrySelect') as HTMLSelectElement;


  //   // Clear previous options
  //   countrySelect.innerHTML = '';

  //   if (selectedregion === 'APAC') {
  //     this.populateOptionsR(["Select Country","AU","BD","CN","HK","ID","IN","JP","KH","KR","LA","LK","MM","MY","NZ","PH","PK","SG","TH","TW","VN"]);
  //   } else if (selectedregion === 'EMEA') {
  //     this.populateOptionsR(["Select Country","DE",'PL']);
  //   } else if (selectedregion === 'AMERICA') {
  //     this.populateOptionsR(["Select Country","US", "BR"]);

  //   }
  //   this.selectedRegion = selectedregion;
  // }

  // populateOptionsR(options: string[]) {
  //   const countrySelect = document.getElementById('countrySelect') as HTMLSelectElement;

  //   options.forEach(option => {
  //     const optionElem = document.createElement('option');
  //     optionElem.value = option;
  //     optionElem.textContent = option;
  //     countrySelect.appendChild(optionElem);
  //   });
  // }

  onRegionChange(): void {
    this.countries = [...new Set(this.locations
        .filter(loc => loc.Region === this.selectedRegion)
        .map(loc => loc.Country))];
    this.selectedCountry = '';
}


  // //////////////////////////////////////////////////////////////////////oncountrychange//////////////////////////////////////////////////////////////////////////////////////

  // countrychange(event: Event) {
  //   const selectedcountry = (event.target as HTMLSelectElement).value;
  //   const locationselect = document.getElementById('locationselect') as HTMLSelectElement;

  //   // Clear previous options
  //   locationselect.innerHTML = '';

  //   if (selectedcountry === 'IN') {
  //     this.populateOptionsL(["Select location","Bangalore", "Hyderabad",'Pune', 'Coimbatore','Nagnathpura']);
  //   } else if (selectedcountry === 'CN') {
  //     this.populateOptionsL(["Select location",'Beijing']);
  //   }
  //   this.selectedCountry = selectedcountry;
  // }

  // populateOptionsL(options: string[]) {
  //   const locationselect = document.getElementById('locationselect') as HTMLSelectElement;

  //   options.forEach(option => {
  //     const optionElem = document.createElement('option');
  //     optionElem.value = option;
  //     optionElem.textContent = option;
  //     locationselect.appendChild(optionElem);
  //   });
  // }

  onCountryChange(): void {
    this.locationCodes = [...new Set(this.locations
        .filter(loc => loc.Country === this.selectedCountry)
        .map(loc => loc.LocationCode))];
}

  // //////////////////////////////////////////////////////////////////////onlocationchange//////////////////////////////////////////////////////////////////////////////////////

  // locationchangeha(event: Event) {
  //   const selectedlocation = (event.target as HTMLSelectElement).value;
  //   const codeSelect = document.getElementById('codeSelect') as HTMLSelectElement;

  //   // Clear previous options
  //   codeSelect.innerHTML = ' ';

  //   if (selectedlocation === 'Bangalore') {
  //     this.populateOptionsCo(["Select Location-Code","Bani-ADUGODI",'Ban-RBIN','BanM-BANGTP','BanO-OMTP','Kor-Kormangala']);
  //   } else if (selectedlocation === 'Hyderabad') {
  //     this.populateOptionsCo(["Select Location-Code",'HYD-Hyderabad']);
  //   }else if (selectedlocation === 'Pune') {
  //     this.populateOptionsCo(["Select Location-Code",'PUA']);
  //   }else if (selectedlocation === 'Coimbatore') {
  //     this.populateOptionsCo(["Select Location-Code",'Cob-SEZ','Cob2-ILKG','Cob5-GTP']);
  //   }else if (selectedlocation === 'Nagnathpura') {
  //     this.populateOptionsCo(["Select Location-Code",'NH3-Nagnathpura']);
  //   }
  //   this.selectedLocation = selectedlocation;
  // }

  // populateOptionsCo(options: string[]) {
  //   const codeSelect = document.getElementById('codeSelect') as HTMLSelectElement;

  //   options.forEach(option => {
  //     const optionElem = document.createElement('option');
  //     optionElem.value = option;
  //     optionElem.textContent = option;
  //     codeSelect.appendChild(optionElem);
  //   });
  // }
// //////////////////////////////////////////////////////////////////////oncodechange//////////////////////////////////////////////////////////////////////////////////////

  // codechange(event: Event) {
  //   const selectedCode = (event.target as HTMLSelectElement).value;
  //   const buildingSelect = document.getElementById('buildingSelect') as HTMLSelectElement;

  //   // Clear previous options
  //   buildingSelect.innerHTML = ' ';

  //   if (selectedCode === 'Bani-ADUGODI') {
  //     this.populateOptionsB(["Select Building","ADUGODI-601","ADUGODI-602","ADUGODI-603","ADUGODI-605"]);
  //   } else if (selectedCode === 'HYD-Hyderabad') {
  //     this.populateOptionsB(["Select Building",'HYD-Hyderabad']);
  //   }else if (selectedCode === 'HYD2-Hyderabad') {
  //     this.populateOptionsB(["Select Building",'HYD2-Hyderabad']);
  //   }else if (selectedCode === 'PUA') {
  //     this.populateOptionsB(["Select Building",'PUA']);
  //   }
  //   else if (selectedCode === 'Cob-SEZ') {
  //     this.populateOptionsB(["Select Building",'Cob-SEZ1','Cob-SEZ2']);
  //   }
  //   else if (selectedCode === 'Cob2-ILKG') {
  //     this.populateOptionsB(["Select Building",'Cob2-ILKG']);
  //   }else if (selectedCode === 'Cob5-GTP') {
  //     this.populateOptionsB(["Select Building",'Cob5-GTP']);
  //   }else if (selectedCode === 'NH3-Nagnathpura') {
  //     this.populateOptionsB(["Select Building",'NH3-Nagnathpura']);
  //   }
  //   else if (selectedCode === 'Ban-RBIN') {
  //     this.populateOptionsB(["Select Building",'RBIN-103','RBIN-105']);
  //   }
  //   else if (selectedCode === 'BanM-BANGTP') {
  //     this.populateOptionsB(["Select Building",'BanM-BANGTP']);
  //   }
  //   else if (selectedCode === 'BanO-OMTP') {
  //     this.populateOptionsB(["Select Building",'BanO-OMTP']);
  //   }
  //   else if (selectedCode === 'Kor-Kormangala') {
  //     this.populateOptionsB(["Select Building",'Kor-901','Kor-903','Kor-905']);
  //   }

  //   this.selectedCode = selectedCode;
  // }

  // populateOptionsB(options: string[]) {
  //   const buildingSelect = document.getElementById('buildingSelect') as HTMLSelectElement;

  //   options.forEach(option => {
  //     const optionElem = document.createElement('option');
  //     optionElem.value = option;
  //     optionElem.textContent = option;
  //     buildingSelect.appendChild(optionElem);
  //   });
  // }





// //////////////////////////////////////////////////////////////////////onentityChange//////////////////////////////////////////////////////////////////////////////////////

  entityChange(event: Event) {
    this.selectedEntity = (event.target as HTMLSelectElement).value;
    // Automatically fill Local-ITL based on selected entity
    if (this.selectedEntity === 'BGSW') {
      this.localITL = 'MNU1KOR';
      this.localITLproxy ='ada2kor';
    } else {
      this.localITL = ''; // Clear localITL for other entities
      this.localITLproxy ='';
    }


  }
  isBGSWOrBGSV(): boolean {
    return this.selectedEntity === 'BGSW' || this.selectedEntity === 'BGSV';
  }

// //////////////////////////////////////////////////////////////////////onGBchange//////////////////////////////////////////////////////////////////////////////////////

  // GBChange(event: Event) {
  //   this.selectedGB = (event.target as HTMLSelectElement).value;
  //   // Automatically fill Local-ITL based on selected entity
  //   if (this.selectedGB === 'MS/NE-PG') {
  //     this.KAM ='grs2kor';
  //   } else if(this.selectedGB === "2WP"){
  //     this.KAM ='ask2kor';
  //   }

  // }

  /////////////////////////////////////////////////////////////////////onReset-formfill////////////////////////////////////////////////////////////////////////////

  onReset() {
    // Reload the page
    window.location.reload();
  }
// /////////////////////////////////////////////////////////////////////onSubmit-formfill////////////////////////////////////////////////////////////////////////////

nextUniqueId: number = 1; // Initial unique ID counter
uniqueInstanceId: string = ''
constructor(private dialog: MatDialog,private changeDetectorRef: ChangeDetectorRef, private fb: FormBuilder, private dateAdapter: DateAdapter<Date>,private toastr: ToastrService, private dataService : DataService) {}

onPreviewform(): void {
  if (this.localITL && this.localITL.length == 7 && this.localITLproxy && this.selectedCountry && this.selectedRegion && this.selectedCode && this.selectedEntity && this.selectedGB
    && this.labno && this.Building && this.DH && this.KAM && this.Floor && this.CC && this.selectedLabType && this.purposeoflab && this.description
   ) {
    const dialogRef = this.dialog.open(DialogboxsubmitComponent, {
      width: '600px',
       data :  { region: this.selectedRegion, country: this.selectedCountry, location: this.selectedLocation, locationcode: this.selectedCode,
        entity: this.selectedEntity,GB: this.selectedGB,localITL: this.localITL,localITLproxy: this.localITLproxy, DH: this.DH, KAM: this.KAM,Dept: this.Dept,
        Building : this.Building,Floor: this.Floor,labno: this.labno,primarylabco: this.primarylabco, secondarylabco:this.secondarylabco,CC: this.CC,
        kindoflab: this.selectedLabType, purposeoflab:this.purposeoflab,description:this.description, ACL:this.ACL, greenports:this.greenports, yellowport:this.yellowport, redport:this.redport,
        cmdbradio: this.cmdbradio, otherLabType:this.otherLabType, sharedlabradio: this.sharedlabradio, ACLradio : this.ACLradio, greenport: this.greenports, yellowports: this.yellowports,redports : this.redports,
        selfauditdate: this.selfauditdate, selectedDate: this.selectedDate,
         }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog closed');
    });

    const data = {
      region: this.selectedRegion,
      country: this.selectedCountry,
      location: this.selectedLocation,
      locationcode: this.selectedCode,
      entity: this.selectedEntity,
      GB: this.selectedGB,
      localITL: this.localITL,
      localITLproxy: this.localITLproxy,
      DH: this.DH,
      KAM: this.KAM,
      Dept: this.Dept,
      Building: this.Building,
      Floor: this.Floor,
      labno: this.labno,
      primarylabco: this.primarylabco,
      secondarylabco: this.secondarylabco,
      CC: this.CC,
      kindoflab: this.selectedLabType,
      purposeoflab: this.purposeoflab,
      description: this.description,
      ACL: this.ACL,
      greenports: this.greenports,
      yellowport: this.yellowport,
      redport: this.redport,
      cmdbradio: this.cmdbradio,
      otherLabType: this.otherLabType,
      sharedlabradio: this.sharedlabradio,
      ACLradio: this.ACLradio,
      greenport: this.greenports,
      yellowports: this.yellowports,
      redports: this.redports,
      selfauditdate: this.selfauditdate,
      selectedDate: this.selectedDate,
    };


    // Perform submission logic
    console.log('Form previewed with:', { data });
  } else {
    this.toastr.error('Please fill required fields')
    console.error('Fill all the Required Fields');
  }
  this.showValidationMessage = true;
  console.log('Preview clicked. Show validation message:', this.showValidationMessage);
}

onLabTypeChange() {
  if (this.selectedLabType === 'Other') {
    this.showOtherField = true;
  } else {
    this.showOtherField = false;
  }
}

submittedFormData: any = "";
  updateSubmittedFormData(formData: any): void {
    this.submittedFormData = formData;
    console.log('Updated submitted form data:', this.submittedFormData);
  }

showOtherSection: boolean = false;
otherField: string = '';

  toggleOtherSection() {
    this.showOtherSection = !this.showOtherSection;
  }




  onDateSelected(date: Date) {
  console.log('Selected date:', date);
  }




  gbOptions: string[] = [];
  kamSuggestions: string[] = []; // All available KAM suggestions
  departmentSuggestions: string[] = [];
  dhSuggestions: string[] = []; // All available DH suggestions
  filteredDepartmentSuggestions: string[] = [];
  filteredDHSuggestions: string[] = []; // Filtered DH suggestions
  filteredKAMSuggestions: string[] = []; // Filtered suggestions based on user input


  GBChange(event: any) {
    this.selectedGB = event.target.value;
    if (this.selectedGB) {
      this.dataService.getKAMSuggestions(this.selectedGB).subscribe(suggestions => {
        this.kamSuggestions = suggestions;
        this.filteredKAMSuggestions = [];
        this.KAM = '';
      });
      this.dataService.getDepartmentSuggestions(this.selectedGB).subscribe(suggestions => {
        this.departmentSuggestions = suggestions;
        this.filteredDepartmentSuggestions = [];
        this.Dept = '';
      });
    } else {
      this.resetFields();
    }
  }
  resetFields() {
    this.kamSuggestions = [];
    this.filteredKAMSuggestions = [];
    this.KAM = '';
    this.departmentSuggestions = [];
    this.filteredDepartmentSuggestions = [];
    this.Dept = '';
    this.dhSuggestions = [];
    this.filteredDHSuggestions = [];
    this.DH = ''; // Clear DH input
  }

  loadGBOptions() {
    this.dataService.getGBOptions().subscribe(options => {
      this.gbOptions = options;
    });
  }

  showKAMSuggestions() {
    if (this.selectedGB) {
      this.filteredKAMSuggestions = this.kamSuggestions; // Show all suggestions
    }
  }
  // Method to fetch and display Department suggestions when Department input is focused
  showDepartmentSuggestions() {
    if (this.selectedGB) {
      this.filteredDepartmentSuggestions = this.departmentSuggestions;
    }
  }

  // Method to fetch and display DH suggestions when DH input is focused
  showDHSuggestions() {
    if (this.Dept) {
      this.filteredDHSuggestions = this.dhSuggestions; // Show all DH suggestions if a department is selected
    }
  }


  filterKAMSuggestions() {
    const searchTerm = this.KAM.toLowerCase();
    this.filteredKAMSuggestions = this.kamSuggestions.filter(kam =>
      kam.toLowerCase().includes(searchTerm)
    );
  }

  filterDepartmentSuggestions() {
    if (!this.selectedGB) return;

    const searchTerm = this.Dept.toLowerCase();
    this.filteredDepartmentSuggestions = this.departmentSuggestions.filter(dep =>
      dep.toLowerCase().includes(searchTerm)
    );
  }

  onDepartmentChange() {
    if (this.Dept) {
      this.dataService.getDHSuggestions(this.Dept).subscribe(suggestions => {
        this.dhSuggestions = suggestions;
        this.filteredDHSuggestions = []; // Clear previous filtered suggestions
      });
    } else {
      this.filteredDHSuggestions = []; // Clear if no department is selected
    }
  }

  filterDHSuggestions() {
    if (!this.Dept) return;

    const searchTerm = this.DH.toLowerCase();
    this.filteredDHSuggestions = this.dhSuggestions.filter(dh =>
      dh.toLowerCase().includes(searchTerm)
    );
  }

  selectKAM(kam: string) {
    this.KAM = kam; // Set the KAM input value
    this.filteredKAMSuggestions = []; // Clear suggestions after selection
  }

  selectDepartment(dep: string) {
    this.Dept = dep; // Set the department input value
    this.filteredDepartmentSuggestions = []; // Clear suggestions after selection
    this.onDepartmentChange(); // Fetch DH suggestions
  }

  selectDH(dh: string) {
    this.DH = dh; // Set the DH input value
    this.filteredDHSuggestions = []; // Clear suggestions after selection
  }


}









