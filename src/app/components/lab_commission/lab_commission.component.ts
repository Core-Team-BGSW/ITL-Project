// Edited by Jay Jambhale
import { SidebarComponent } from '../../admin/sidebar/sidebar.component';
import { AngularModule } from '../../angularmodule/angularmodule.module';
import * as ExcelJS from 'exceljs';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ChangeDetectorRef,
  NgZone,
  inject,
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
import { FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DataService } from '../../data.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LayoutComponent } from '../../admin/layout/layout.component';

export interface Location {
  region: string;
  country: string;
  locationCode: string;
}

export interface RegionWithCountries {
  countries: string[];
  region: string;
}

export interface countriesWithcode {
  countries: string[];
  locationCodes: string[];
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
    LayoutComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LabCommissionComponent {
  fileSelected = false;
  selectedFile: File | null = null; // Initialize selectedFile to null
  selectedFileName: string = '';
  excelData: any[] = []; // Array to store parsed Excel data
  filteredData: any[] = [];
  filterValue: string = '';
  previewVisible = false; // Flag to control preview visibility
  tabIndex = 0; // Index of the active tabY
  isSelected = false;
  selectedRegion: string = '';
  region: string = '';
  selectedCountry: string = '';
  country: string = '';
  selectedLocation: string = '';
  location: string = '';
  selectedCode: string = '';
  entity: string = '';
  GB: string = '';
  localITLproxy: string = '';
  locationcode: string = '';
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
  selectedHeader: string = '';
  gbOptions: string[] = [];
  kamSuggestions: string[] = []; // All available KAM suggestions
  departmentSuggestions: string[] = [];
  dhSuggestions: string[] = []; // All available DH suggestions
  filteredDepartmentSuggestions: string[] = [];
  filteredDHSuggestions: string[] = []; // Filtered DH suggestions
  filteredKAMSuggestions: string[] = []; // Filtered suggestions based on user input
  uniqueRegions: RegionWithCountries[] = [];
  uniqueCountriesWithCodes: countriesWithcode[] = [];
  filteredLocationCode: String[] = [];

  constructor(
    private dialog: MatDialog,
    private changeDetectorRef: ChangeDetectorRef,
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
      this.locations = data; // Convert Set back to Array

      // Create a map to hold regions and their corresponding countries
      const regionCountryMap = new Map<string, Set<string>>();
      const countryCodeMap = new Map<string, Set<string>>();

      // Populate the map
      this.locations.forEach((location) => {
        if (!regionCountryMap.has(location.region)) {
          regionCountryMap.set(location.region, new Set());
        }
        regionCountryMap.get(location.region)?.add(location.country);
      });

      // Convert the map to an array of objects for easier use in the template
      this.uniqueRegions = Array.from(regionCountryMap.entries()).map(
        ([region, countries]) => ({
          region,
          countries: Array.from(countries), // Convert Set back to Array
        })
      );

      // this.locations.forEach((location) => {
      //   if (!countryCodeMap.has(location.country)) {
      //     countryCodeMap.set(location.country, new Set());
      //   }
      //   countryCodeMap.get(location.country)?.add(location.locationCode);
      // });

      // // Convert the map to an array of objects for easier use in the template
      // this.uniqueCountriesWithCodes = Array.from(countryCodeMap.entries()).map(
      //   ([country, locationCodes]) => ({
      //     countries: country, // Match the interface
      //     locationCode: Array.from(locationCodes), // Match the interface
      //   })
      // );
      this.locations.forEach((location) => {
        if (!countryCodeMap.has(location.country)) {
          countryCodeMap.set(location.country, new Set());
        }
        countryCodeMap.get(location.country)?.add(location.locationCode);
      });

      this.uniqueCountriesWithCodes = Array.from(countryCodeMap.entries()).map(
        ([country, locationCodes]) => ({
          countries: [country], // Wrap country in an array
          locationCodes: Array.from(locationCodes), // Convert Set back to Array
        })
      ) as countriesWithcode[];
    });
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
        this.filteredData = []; // Initialize filtered data

        // Extract the first row safely
        const firstRow = worksheet.getRow(1);
        if (!firstRow) {
          alert('First row not found. Please check the Excel file.');
          return;
        }

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

        const headers = Array.isArray(values) ? values.slice(1) : [];

        headers.forEach((header) => {
          if (typeof header === 'string') {
            this.excelData.push({
              header,
              rows: [],
              isMissing: false,
            });
          }
        });

        // Start from the second row (row index 2)
        worksheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
          // Skip the first row
          if (rowNumber === 1) return;

          const rowData: { [key: string]: any } = {};
          headers.forEach((header, index) => {
            const cell = row.getCell(index + 1);
            rowData[
              typeof header === 'string' ? header : `Column${index + 1}`
            ] = cell ? cell.value : null;
          });
          this.excelData.forEach((item) => {
            item.rows.push(rowData);
          });
        });

        this.filteredData = this.excelData; // Initialize with all data
        this.previewVisible = true;
        this.changeDetectorRef.detectChanges();
        console.log('Parsed Excel Data:', this.excelData);
      })
      .catch((error) => {
        console.error('Error parsing Excel:', error);
      });
  }

  filterExcelData(header: string, value: any) {
    if (!header || value === undefined || value === null) {
      // If no header or value is provided, reset to the original data
      this.filteredData = this.excelData;
      return;
    }

    this.filteredData = this.excelData.map((item) => {
      return {
        ...item,
        rows: item.rows.filter((row: { [key: string]: any }) => {
          return (
            row[header] && row[header].toString().includes(value.toString())
          );
        }),
      };
    });
  }

  // Call this method when the filter input changes
  onFilterChange(header: string, value: string) {
    this.filterExcelData(header, value);
  }
  //Endpoint added
  // On file submit
  private http = inject(HttpClient);
  private ngZone = inject(NgZone);
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

    // Remove the first row from excelData if it exists
    if (this.excelData.length > 0) {
      this.excelData.shift(); // Removes the first row
    }

    const formData = new FormData();
    formData.append('file', this.selectedFile);

    axios
      .post('http://localhost:8080/upload/convert-excel-to-csv', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        this.toastr.success('Process initiated', 'Waiting for approval');
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

  // onfileSubmit(): void {
  //   if (!this.selectedFile) {
  //     console.log('No file selected');
  //     return;
  //   }

  //   const confirmUpload = window.confirm(
  //     'Are you sure you want to upload this file?'
  //   );

  //   if (!confirmUpload) {
  //     console.log('File upload cancelled by user');
  //     return;
  //   }

  //   // Create FormData object
  //   const formData = new FormData();
  //   formData.append('file', this.selectedFile);

  //   // Use HttpClient to post the file
  //   this.http
  //     .post('http://localhost:8080/upload/convert-excel-to-csv', formData)
  //     .subscribe({
  //       next: (response) => {
  //         console.log('File uploaded successfully:', response);
  //         this.ngZone.run(() => {
  //           alert('File uploaded successfully!');
  //         });

  //         this.selectedFile = null;
  //         this.excelData = [];
  //         this.previewVisible = false;
  //       },
  //       error: (error) => {
  //         // console.error('Error uploading file:', error);
  //         if (error.response && error.response.data) {
  //           console.error('Error Response Data:', error.response.data);

  //           // Handle missing headers
  //           if (error.response.data.error === 'Missing headers') {
  //             const missingHeaders = error.response.data.missingHeaders;
  //             missingHeaders.forEach((missingHeader: string) => {
  //               const headerIndex = this.excelData.findIndex(
  //                 (h) => h.header === missingHeader
  //               );
  //               if (headerIndex !== -1) {
  //                 this.excelData[headerIndex].isMissing = true; // Mark header as missing
  //               }
  //             });
  //           }

  //           // Handle validation errors for fields
  //           if (error.response.data.validationErrors) {
  //             const errorMessages = error.response.data.validationErrors
  //               .map(
  //                 (e: any) =>
  //                   `Row ${e.row}: Missing fields: ${e.missingFields.join(
  //                     ', '
  //                   )}`
  //               )
  //               .join('\n');

  //             error.response.data.validationErrors.forEach((e: any) => {
  //               e.missingFields.forEach((missingField: string) => {
  //                 const headerIndex = this.excelData.findIndex(
  //                   (h) => h.header === missingField
  //                 );
  //                 if (headerIndex !== -1) {
  //                   this.excelData[headerIndex].isMissing = true; // Mark header as missing
  //                 }
  //               });
  //             });

  //             alert('Validation Errors:\n' + errorMessages);
  //           } else {
  //             alert('Error: ' + error.response.data.error);
  //           }
  //         } else {
  //           console.error('Error:', error);
  //           alert('An unknown error occurred.');
  //         }
  //         // Trigger change detection to update UI
  //         this.changeDetectorRef.detectChanges();
  //       },
  //     });
  // }

  // /////////////////////////////////////////////////////////////////////onDownloadTemplate////////////////////////////////////////////////////////////////////////////

  onDownloadTemplate() {
    const downloadUrl =
      'https://bosch.sharepoint.com/sites/ITLConsultancyService-IN-ITLCoreTeam2/_layouts/15/download.aspx?SourceUrl=https://bosch.sharepoint.com/:x:/r/sites/ITLConsultancyService-IN-ITLCoreTeam2/Shared%20Documents/Lab%20Portal%20Project/NewLabCommission-templete.xlsx?d=wcc4bbffc32e04181bbce1816188a750f&csf=1&web=1&e=CjTsli';
    window.open(downloadUrl, '_blank');
  }

  // //////////////////////////////////////////////////////////////////////onregionchange//////////////////////////////////////////////////////////////////////////////////////
  onRegionChange(): void {
    const selected = this.uniqueRegions.find(
      (item) => item.region === this.selectedRegion
    );
    this.filteredCountries = selected ? selected.countries : [];
    this.selectedCountry = ''; // Reset selected country when region changes
  }

  // // //////////////////////////////////////////////////////////////////////oncountrychange//////////////////////////////////////////////////////////////////////////////////////

  // onCountryChange(): void {
  //   const filteredLocationCode = this.locations.find(
  //     (location) =>
  //       location.country === this.selectedCountry &&
  //       location.region === this.selectedRegion
  //   );
  //   this.selectedCode = filteredLocationCode
  //     ? filteredLocationCode.locationCode
  //     : '';
  // }
  onCountryChange() {
    // Reset the selected location
    this.selectedLocation = '';

    // Filter location codes based on the selected country
    const selectedCountryData = this.uniqueCountriesWithCodes.find(
      (c) => c.countries.includes(this.selectedCountry) // Check if the selected country is in the countries array
    );

    // Update filtered location codes based on the selected country data
    this.filteredLocationCode = selectedCountryData
      ? selectedCountryData.locationCodes // Ensure this is the correct property name
      : [];
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
    // Validate fields and get the list of missing fields
    const missingFields = this.validateFields();

    if (missingFields.length > 0) {
      this.toastr.error(
        `Please fill the following required fields: ${missingFields.join(', ')}`
      );
      return; // Prevent further execution if validation fails
    }

    // Prepare data for submission
    const data = {
      region: this.selectedRegion,
      country: this.selectedCountry,
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
  }

  // Method to validate fields and return missing ones
  private validateFields(): string[] {
    const missingFields: string[] = [];

    if (!this.localITL || this.localITL.length !== 7) {
      missingFields.push('Local ITL (must be 7 characters)');
    }
    if (!this.localITLproxy) missingFields.push('Local ITL Proxy');
    if (!this.selectedCountry) missingFields.push('Country');
    if (!this.selectedRegion) missingFields.push('Region');
    if (!this.selectedCode) missingFields.push('Code');
    if (!this.selectedEntity) missingFields.push('Entity');
    if (!this.selectedGB) missingFields.push('GB');
    if (!this.labno) missingFields.push('Lab Number');
    if (!this.Building) missingFields.push('Building');
    if (!this.DH) missingFields.push('DH');
    if (!this.KAM) missingFields.push('KAM');
    if (!this.Floor) missingFields.push('Floor');
    if (!this.CC) missingFields.push('CC');
    if (!this.selectedLabType) missingFields.push('Lab Type');
    if (!this.purposeoflab) missingFields.push('Purpose of Lab');
    if (!this.description) missingFields.push('Description');

    // Add other fields as needed...

    return missingFields;
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
  // GBChange(event: any) {
  //   this.selectedGB = event.target.value;
  //   if (this.selectedGB) {
  //     this.dataService
  //       .getKAMSuggestions(this.selectedGB)
  //       .subscribe((suggestions) => {
  //         this.kamSuggestions = suggestions;
  //         this.filteredKAMSuggestions = [];
  //         this.KAM = '';
  //       });
  //     this.dataService
  //       .getDepartmentSuggestions(this.selectedGB)
  //       .subscribe((suggestions) => {
  //         this.departmentSuggestions = suggestions;
  //         this.filteredDepartmentSuggestions = [];
  //         this.Dept = '';
  //       });
  //   } else {
  //     this.resetFields();
  //   }
  // }
  // resetFields() {
  //   this.kamSuggestions = [];
  //   this.filteredKAMSuggestions = [];
  //   this.KAM = '';
  //   this.departmentSuggestions = [];
  //   this.filteredDepartmentSuggestions = [];
  //   this.Dept = '';
  //   this.dhSuggestions = [];
  //   this.filteredDHSuggestions = [];
  //   this.DH = ''; // Clear DH input
  // }

  // loadGBOptions() {
  //   this.dataService.getGBOptions().subscribe((options) => {
  //     this.gbOptions = options;
  //   });
  // }

  // showKAMSuggestions() {
  //   if (this.selectedGB) {
  //     this.filteredKAMSuggestions = this.kamSuggestions; // Show all suggestions
  //   }
  // }
  // // Method to fetch and display Department suggestions when Department input is focused
  // showDepartmentSuggestions() {
  //   if (this.selectedGB) {
  //     this.filteredDepartmentSuggestions = this.departmentSuggestions;
  //   }
  // }

  // // Method to fetch and display DH suggestions when DH input is focused
  // showDHSuggestions() {
  //   if (this.Dept) {
  //     this.filteredDHSuggestions = this.dhSuggestions; // Show all DH suggestions if a department is selected
  //   }
  // }

  // filterKAMSuggestions() {
  //   const searchTerm = this.KAM.toLowerCase();
  //   this.filteredKAMSuggestions = this.kamSuggestions.filter((kam) =>
  //     kam.toLowerCase().includes(searchTerm)
  //   );
  // }

  // filterDepartmentSuggestions() {
  //   if (!this.selectedGB) return;

  //   const searchTerm = this.Dept.toLowerCase();
  //   this.filteredDepartmentSuggestions = this.departmentSuggestions.filter(
  //     (dep) => dep.toLowerCase().includes(searchTerm)
  //   );
  // }

  // onDepartmentChange() {
  //   if (this.Dept) {
  //     this.dataService.getDHSuggestions(this.Dept).subscribe((suggestions) => {
  //       this.dhSuggestions = suggestions;
  //       this.filteredDHSuggestions = []; // Clear previous filtered suggestions
  //     });
  //   } else {
  //     this.filteredDHSuggestions = []; // Clear if no department is selected
  //   }
  // }

  // filterDHSuggestions() {
  //   if (!this.Dept) return;

  //   const searchTerm = this.DH.toLowerCase();
  //   this.filteredDHSuggestions = this.dhSuggestions.filter((dh) =>
  //     dh.toLowerCase().includes(searchTerm)
  //   );
  // }

  // selectKAM(kam: string) {
  //   this.KAM = kam; // Set the KAM input value
  //   this.filteredKAMSuggestions = []; // Clear suggestions after selection
  // }

  // selectDepartment(dep: string) {
  //   this.Dept = dep; // Set the department input value
  //   this.filteredDepartmentSuggestions = []; // Clear suggestions after selection
  //   this.onDepartmentChange(); // Fetch DH suggestions
  // }

  // selectDH(dh: string) {
  //   this.DH = dh; // Set the DH input value
  //   this.filteredDHSuggestions = []; // Clear suggestions after selection
  // }
}
