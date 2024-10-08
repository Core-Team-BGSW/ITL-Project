import { HomeComponent } from '../../admin/home/home.component';
import { SidebarComponent } from '../../admin/sidebar/sidebar.component';
import { AngularModule } from '../../angularmodule/angularmodule.module';
import * as ExcelJS from 'exceljs';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ChangeDetectorRef,
} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogModule } from '@angular/cdk/dialog';
import { DialogboxsubmitComponent } from '../dialogboxsubmit/dialogboxsubmit.component';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import axios from 'axios';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { ToastrService } from 'ngx-toastr';
import { DataService } from '../../data.service';

interface Location {
  Region: string;
  Country: string;
  LocationCode: string;
}
interface ExcelRow {
  [key: string]: any; // Dynamic key-value pairs for cell values
}

interface ExcelHeader {
  header: string;
  rows: ExcelRow[];
  isMissing: boolean;
}
@Component({
  selector: 'app-lab_commission',
  standalone: true,
  templateUrl: './lab_commission.component.html',
  styleUrl: './lab_commission.component.scss',
  animations: [
    trigger('rotateArrow', [
      state(
        'collapsed',
        style({
          transform: 'rotate(0)',
        })
      ),
      state(
        'expanded',
        style({
          transform: 'rotate(180deg)',
        })
      ),
      transition('collapsed <=> expanded', animate('0.3s ease')),
    ]),
  ],
  imports: [
    HomeComponent,
    SidebarComponent,
    RouterLink,
    RouterOutlet,
    LabCommissionComponent,
    CommonModule,
    FormsModule,
    AngularModule,
    DialogModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LabCommissionComponent {
  fileSelected = false;
  selectedFile: File | null = null; // Initialize selectedFile to null
  selectedFileName: string = '';
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
  DH: string = '';
  Dept: string = '';
  Building: string = '';
  Floor: string = '';
  labno: string = '';
  primarylabco: string = '';
  secondarylabco: string = '';
  CC: string = '';
  kindoflab: string = '';
  purposeoflab: string = '';
  description: string = '';
  ACL: string = '';
  greenports: string = '';
  yellowports: string = '';
  redports: string = '';
  cmdb: string = '';
  labelPosition: string = '';
  choosemethod: string = '';
  selectedLabType: string = '';
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
  locations: Location[] = [];
  showValidationMessage: boolean = false;
  nextUniqueId: number = 1; // Initial unique ID counter
  uniqueInstanceId: string = '';

  constructor(
    private dialog: MatDialog,
    private changeDetectorRef: ChangeDetectorRef,
    private fb: FormBuilder,
    private dateAdapter: DateAdapter<Date>,
    private toastr: ToastrService,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    const today = new Date();
    // Add 6 months to the current date
    const sixMonthsFromNow = new Date(today.setMonth(today.getMonth() + 6));
    this.selectedDate = sixMonthsFromNow;
    this.isDatePickerDisabled = true;

    this.dataService.getLocations().subscribe((data) => {
      this.locations = data;
      this.regions = [...new Set(this.locations.map((loc) => loc.Region))];
      this.filteredCountries = [...new Set(data.map((loc) => loc.Country))];
    });
    this.loadGBOptions();
  }

  /////////////////////////////////////////////////////////////////////onfileupload////////////////////////////////////////////////////////////////////////////
  onFileChanged(event: any) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0]; // Store the file object
      this.fileSelected = true; // Enable preview button
      this.selectedFileName = this.selectedFile.name; // Store the file name for display
    } else {
      this.selectedFile = null; // Reset if no file is selected
      this.fileSelected = false; // Disable preview button
      this.selectedFileName = ''; // Clear the file name
    }
  }

  /////////////////////////////////////////////////////////////////////onPreview////////////////////////////////////////////////////////////////////////////

  onPreview() {
    if (this.selectedFile) {
      // Validate the file type (e.g., .xls or .xlsx)
      const validFileTypes = [
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'application/vnd.ms-excel',
      ];
      const fileType = this.selectedFile.type;

      if (!validFileTypes.includes(fileType)) {
        alert(
          'Invalid file type. Please upload an Excel file (.xls or .xlsx).'
        );
        return;
      }

      // Validate the file size (e.g., limit to 5MB)
      const maxSizeInBytes = 5 * 1024 * 1024; // 5 MB
      if (this.selectedFile.size > maxSizeInBytes) {
        alert(
          'File size exceeds the limit of 5MB. Please upload a smaller file.'
        );
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

  private parseExcel(arrayBuffer: ArrayBuffer) {
    const workbook = new ExcelJS.Workbook();
    workbook.xlsx
      .load(arrayBuffer)
      .then(() => {
        const worksheet = workbook.getWorksheet(1);

        // Check if worksheet is null or undefined
        if (!worksheet) {
          alert('Worksheet not found. Please check the Excel file.');
          return;
        }

        this.excelData = [];

        // Extract the first row safely
        const firstRow = worksheet.getRow(1);
        if (!firstRow) {
          alert('First row not found. Please check the Excel file.');
          return;
        }

        // Check if firstRow.values is defined
        const values = firstRow.values;
        if (
          !values ||
          (typeof values === 'object' && Object.keys(values).length < 1)
        ) {
          alert(
            'First row is empty or does not contain headers. Please check the Excel file.'
          );
          return;
        }

        // Safely slice values from the first row
        const headers = Array.isArray(values) ? values.slice(1) : []; // Cast to string[]

        headers.forEach((header) => {
          if (typeof header === 'string') {
            this.excelData.push({
              header,
              rows: [],
              isMissing: false,
            });
          }
        });

        worksheet.eachRow({ includeEmpty: false }, (row) => {
          const rowData: { [key: string]: any } = {}; // Use a generic object for dynamic keys
          headers.forEach((header, index) => {
            const cell = row.getCell(index + 1);
            // Only assign value if header is valid
            rowData[
              typeof header === 'string' ? header : `Column${index + 1}`
            ] = cell ? cell.value : null;
          });
          this.excelData.forEach((item) => {
            item.rows.push(rowData); // Add the row data
          });
        });

        this.previewVisible = true;
        this.changeDetectorRef.detectChanges();
        console.log('Parsed Excel Data:', this.excelData);
      })
      .catch((error) => {
        console.error('Error parsing Excel:', error);
      });
  }

  onfileSubmit() {
    if (!this.selectedFile) {
      console.log('No file selected');
      return;
    }

    const confirmUpload = window.confirm(
      'Are you sure you want to upload this file?'
    );

    if (!confirmUpload) {
      console.log('File upload cancelled by user');
      return;
    }

    const formData = new FormData();
    formData.append('file', this.selectedFile);

    axios
      .post('http://localhost:3000/upload-excel', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        console.log('File uploaded successfully:', response.data);

        // Clear selected file and reset form state
        this.selectedFile = null;
        this.excelData = [];
        this.previewVisible = false;
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          console.error('Error Response Data:', error.response.data);

          // Handle missing headers
          if (error.response.data.error === 'Missing headers') {
            const missingHeaders = error.response.data.missingHeaders;
            missingHeaders.forEach((missingHeader: string) => {
              const headerIndex = this.excelData.findIndex(
                (h) => h.header === missingHeader
              );
              if (headerIndex !== -1) {
                this.excelData[headerIndex].isMissing = true; // Mark header as missing
              }
            });
          }

          // Handle validation errors for fields
          if (error.response.data.validationErrors) {
            const errorMessages = error.response.data.validationErrors
              .map(
                (e: any) =>
                  `Row ${e.row}: Missing fields: ${e.missingFields.join(', ')}`
              )
              .join('\n');

            error.response.data.validationErrors.forEach((e: any) => {
              e.missingFields.forEach((missingField: string) => {
                const headerIndex = this.excelData.findIndex(
                  (h) => h.header === missingField
                );
                if (headerIndex !== -1) {
                  this.excelData[headerIndex].isMissing = true; // Mark header as missing
                }
              });
            });

            alert('Validation Errors:\n' + errorMessages);
          } else {
            alert('Error: ' + error.response.data.error);
          }
        } else {
          console.error('Error:', error);
          alert('An unknown error occurred.');
        }

        // Trigger change detection to update UI
        this.changeDetectorRef.detectChanges();
      });
  }

  // /////////////////////////////////////////////////////////////////////onDownloadTemplate////////////////////////////////////////////////////////////////////////////

  onDownloadTemplate() {
    const downloadUrl =
      'https://bosch.sharepoint.com/sites/ITLConsultancyService-IN-ITLCoreTeam2/_layouts/15/download.aspx?SourceUrl=https://bosch.sharepoint.com/:x:/r/sites/ITLConsultancyService-IN-ITLCoreTeam2/Shared%20Documents/Lab%20Portal%20Project/NewLabCommission-templete.xlsx?d=wcc4bbffc32e04181bbce1816188a750f&csf=1&web=1&e=CjTsli';
    window.open(downloadUrl, '_blank');
  }

  // //////////////////////////////////////////////////////////////////////onregionchange//////////////////////////////////////////////////////////////////////////////////////

  onRegionChange(): void {
    this.countries = [
      ...new Set(
        this.locations
          .filter((loc) => loc.Region === this.selectedRegion)
          .map((loc) => loc.Country)
      ),
    ];
    this.selectedCountry = '';
  }

  // //////////////////////////////////////////////////////////////////////oncountrychange//////////////////////////////////////////////////////////////////////////////////////
  onCountryChange(): void {
    this.locationCodes = [
      ...new Set(
        this.locations
          .filter((loc) => loc.Country === this.selectedCountry)
          .map((loc) => loc.LocationCode)
      ),
    ];
  }
  // //////////////////////////////////////////////////////////////////////onentityChange//////////////////////////////////////////////////////////////////////////////////////

  entityChange(event: Event) {
    this.selectedEntity = (event.target as HTMLSelectElement).value;
    // Automatically fill Local-ITL based on selected entity
    if (this.selectedEntity === 'BGSW') {
      this.localITL = 'MNU1KOR';
      this.localITLproxy = 'ada2kor';
    } else {
      this.localITL = ''; // Clear localITL for other entities
      this.localITLproxy = '';
    }
  }

  isBGSWOrBGSV(): boolean {
    return this.selectedEntity === 'BGSW' || this.selectedEntity === 'BGSV';
  }
  /////////////////////////////////////////////////////////////////////onReset-formfill////////////////////////////////////////////////////////////////////////////

  onReset() {
    // Reload the page
    window.location.reload();
  }
  ////////////////////////////////////////////////////////////////////////onSubmit-formfill////////////////////////////////////////////////////////////////////////////
  onPreviewform(): void {
    const isValid =
      this.localITL?.length === 7 &&
      this.localITLproxy &&
      this.selectedCountry &&
      this.selectedRegion &&
      this.selectedCode &&
      this.selectedEntity &&
      this.selectedGB &&
      this.labno &&
      this.Building &&
      this.DH &&
      this.KAM &&
      this.Floor &&
      this.CC &&
      this.selectedLabType &&
      this.purposeoflab &&
      this.description;

    if (isValid) {
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

      const dialogRef = this.dialog.open(DialogboxsubmitComponent, {
        width: '600px',
        data: { ...data },
      });

      dialogRef.afterClosed().subscribe(() => {
        console.log('Dialog closed');
      });

      // Perform submission logic
      console.log('Form previewed with:', { data });
    } else {
      this.toastr.error('Please fill required fields');
      console.error('Fill all the Required Fields');
    }

    this.showValidationMessage = true;
    console.log(
      'Preview clicked. Show validation message:',
      this.showValidationMessage
    );
  }

  onLabTypeChange() {
    if (this.selectedLabType === 'Other') {
      this.showOtherField = true;
    } else {
      this.showOtherField = false;
    }
  }

  submittedFormData: any = '';
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
      this.dataService
        .getKAMSuggestions(this.selectedGB)
        .subscribe((suggestions) => {
          this.kamSuggestions = suggestions;
          this.filteredKAMSuggestions = [];
          this.KAM = '';
        });
      this.dataService
        .getDepartmentSuggestions(this.selectedGB)
        .subscribe((suggestions) => {
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
    this.dataService.getGBOptions().subscribe((options) => {
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
    this.filteredKAMSuggestions = this.kamSuggestions.filter((kam) =>
      kam.toLowerCase().includes(searchTerm)
    );
  }

  filterDepartmentSuggestions() {
    if (!this.selectedGB) return;

    const searchTerm = this.Dept.toLowerCase();
    this.filteredDepartmentSuggestions = this.departmentSuggestions.filter(
      (dep) => dep.toLowerCase().includes(searchTerm)
    );
  }

  onDepartmentChange() {
    if (this.Dept) {
      this.dataService.getDHSuggestions(this.Dept).subscribe((suggestions) => {
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
    this.filteredDHSuggestions = this.dhSuggestions.filter((dh) =>
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
