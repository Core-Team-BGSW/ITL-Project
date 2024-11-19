import { Component, OnInit, Inject,PLATFORM_ID } from '@angular/core';
import { FormBuilder, FormGroup,ReactiveFormsModule,Validators,FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatTabLabel, MatTabsModule } from '@angular/material/tabs';
import { Router } from '@angular/router';
import { MatDatepickerModule, matDatepickerAnimations } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseService } from '../services/response.service';





@Component({
  selector: 'app-self-audit',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule, CommonModule,
    MatCardModule,
    MatRadioModule,
    MatButtonModule,MatInputModule,MatTabLabel,MatTabsModule,MatNativeDateModule,
    MatDatepickerModule],
  templateUrl: './self-audit.component.html',
  styleUrl: './self-audit.component.scss'
})
export class SelfAuditComponent {
  labelPosition: string="";
  labelPosition1: string="";
  labelPosition2: string="";
  labelPosition3: string="";
  labelPosition4: string="";
  labelPosition5: string="";
  description: string="";
  selectedOption: string = '';
  selectedOption1: string = '';
  selectedOption2: string = '';
  selectedOption3: string = '';
  selectedOption4: string = '';
  selectedOption5: string = '';
  selectedOption6: string = '';
  selectedOption7: string = '';
  selectedOption8: string = '';
  selectedOption9: string = '';
  selectedOption10: string = '';
  selectedOption11: string = '';
  selectedOption12: string = '';
  selectedOption13: string = '';
  selectedOption14: string = '';
  selectedOption15: string = '';
  selectedOption16: string = '';
  selectedOption17: string = '';
  selectedOption18: string = '';
  selectedOption19: string = '';
  selectedOption20: string = '';
  selectedOption21: string = '';
  selectedOption22: string = '';
  selectedOption23: string = '';
  selectedOption24: string = '';
  selectedOption25: string = '';
  selectedOption26: string = '';
  selectedOption27: string = '';
  selectedOption28: string = '';
  selectedOption29: string = '';
  selectedOption30: string = '';
  loginArray:any={};
  formData = {
    firstName: '',
    lastName: '',
    deviceno: '',
    labelPosition:'',
    answer1:'',
    explanation1:'',
    labelPosition1:'',
    downtime:'',
    answer2:'',
    selectedOption: ''
    
  };
  // private apiUrl = 'http://localhost:8080/responses';
  isBrowser: boolean;
 
  showOptions = false;

  toggleOptions() {
    this.showOptions = !this.showOptions;
}
fulfilledCount: number = 0;
partiallyFulfilledCount: number = 0;
notFulfilledCount: number = 0;
notapplicableCount: number = 0;

onFulfilledChange(event: any) {
  const selectedValue = event.target.value;
  if (selectedValue === 'completely-fulfilled') {
    this.fulfilledCount++;
  }
  else if (selectedValue === 'partially-fulfilled') {
    this.partiallyFulfilledCount++;
  }
  else if (selectedValue === 'not-fulfilled') {
    this.notFulfilledCount++;
  }
  else if (selectedValue === 'not-fulfilled') {
    this.notapplicableCount++;
  }
    console.log('Fulfilled Count:', this.fulfilledCount); 
    console.log('Fulfilled Count:', this.partiallyFulfilledCount); 
    console.log('Fulfilled Count:', this.notFulfilledCount); 
    console.log('Fulfilled Count:', this.notapplicableCount);
}
fulfilledCount1: number = 0;
partiallyFulfilledCount1: number = 0;
notFulfilledCount1: number = 0;
notapplicableCount1: number = 0;

  onFulfilled1Change(event: any) {
    const selectedValue = event.target.value;
    if (selectedValue === 'completely-fulfilled') {
      this.fulfilledCount1++;
    }

    else if (selectedValue === 'partially-fulfilled') {
      this.partiallyFulfilledCount1++;
    }
     else if (selectedValue === 'not-fulfilled') {
      this.notFulfilledCount1++;
    }
    else if (selectedValue === 'not-fulfilled') {
      this.notapplicableCount1++;
    }
    
    console.log('Fulfilled Count:', this.fulfilledCount1);
    console.log('Fulfilled Count:', this.partiallyFulfilledCount1);
    console.log('Fulfilled Count:', this.notFulfilledCount1);
    console.log('Fulfilled Count:', this.notapplicableCount1);
  }
  fulfilledCount2: number = 0;
  partiallyFulfilledCount2: number = 0;
notFulfilledCount2: number = 0;
notapplicableCount2: number = 0;
  onFulfilled2Change(event: any) {
    const selectedValue = event.target.value;
    if (selectedValue === 'completely-fulfilled') {
      this.fulfilledCount2++;
    }
    else if (selectedValue === 'partially-fulfilled') {
      this.partiallyFulfilledCount2++;
    }
     else if (selectedValue === 'not-fulfilled') {
      this.notFulfilledCount2++;
    }
    else if (selectedValue === 'not-fulfilled') {
      this.notapplicableCount2++;
    }
  console.log('Fulfilled Count:', this.fulfilledCount2);
  console.log('Fulfilled Count:', this.partiallyFulfilledCount2);
  console.log('Fulfilled Count:', this.notFulfilledCount2);
  console.log('Fulfilled Count:', this.notapplicableCount2);
}
linkForm: FormGroup;
 
  constructor(private fb: FormBuilder,
    @Inject(PLATFORM_ID) private platformId: Object,
    private responseService: ResponseService
    
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
    this.linkForm = this.fb.group({
      website: ['', [Validators.required, Validators.pattern('https?://.+')]],
      website1: ['', [Validators.required, Validators.pattern('https?://.+')]],
      website2: ['', [Validators.required, Validators.pattern('https?://.+')]],
      website3: ['', [Validators.required, Validators.pattern('https?://.+')]],
      questionId: ['', Validators.required],
      optionFlag: [''],
      internalEmployeeCount: ['', [Validators.required]],
      externalEmployeeCount: ['', [Validators.required]],
      numberOfDevices: ['', Validators.required],
      answers: ['', Validators.required],
      explanation: ['', Validators.required]
    });
  }
  onSubmit() {
    if (this.linkForm.valid) {
      console.log('Form Submitted!', this.linkForm.value);
    }
  }
  // submitResponse(data: any): Observable<any> {
  //   return this.http.post<any>(this.apiUrl, data)
  // }
  
 
  selectedFile: File | null = null;

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      console.log('Selected file:', this.selectedFile);
    }
  }
data: any[] = [
];

generateExcelFile(): void {
  const heading = [['Engineering Lab Asset Inventory - Client Hardware - IT Devices']];
  const columnHeadings = [['Computer name', 'Common account', 'User access list']]; 
  const worksheetData = [
    { Name: 'Name', Age: 'Age', Address: 'Address' },
    ...this.data
  ];

  // Step 4: Convert JSON to worksheet
  const worksheet = XLSX.utils.json_to_sheet(worksheetData, { skipHeader: true });

  // Step 5: Add the custom heading at the top
  XLSX.utils.sheet_add_aoa(worksheet, heading, { origin: 'A1' });

  // Step 6: Add the additional rows below the custom heading

  XLSX.utils.sheet_add_aoa(worksheet, columnHeadings, { origin: -1 });

  // Step 7: Merge the first row across the three columns (A1:C1)
  worksheet['!merges'] = [{ s: { r: 0, c: 0 }, e: { r: 0, c: 2 } }];
  
  // Step 8: Create a workbook and add the worksheet
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
  worksheet['!cols'] = [{ wpx: 200 }, { wpx: 200 }, { wpx: 200 }]; // Set column widths
 
 
  
  
  // Step 9: Generate buffer
  const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

  // Step 10: Convert buffer to blob
  const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });

  // Step 11: Save the file
  saveAs(blob, 'Copy of remote access list.xlsx');
}
// ngOnInit(): void {
//   // this.loadDraft();
//   // this.linkForm.get('questionId').valueChanges.subscribe((questionId) => {
//   //   this.updateFieldVisibility(questionId, this.linkForm.get('optionFlag').value);
//   // });
//   this.linkForm = this.fb.group({
//     internalEmployeeCount: ['', [Validators.required]], // For QuestionId 1
//     externalEmployeeCount: ['', [Validators.required]], // For QuestionId 1
//     numberOfDevices: [''], // For QuestionId 2
//     optionFlag: [''], // For QuestionId 3
//     answers: [''], // For QuestionId 3 if optionFlag = 0
//     explanation: [''] // For QuestionId 3 if optionFlag = 1
//   });
//   const storedValue = localStorage.getItem('labelPosition');
//   const storedValue1 = localStorage.getItem('labelPosition1');
//   const storeddropdown = localStorage.getItem('selectedOption');
//     if (storedValue) {
//       this.labelPosition = storedValue;
//     }
//     if (storedValue1) {
//       this.labelPosition1 = storedValue1;
//     }
//     if (storeddropdown) {
//       this.selectedOption = storeddropdown;
//     }
    
    
// }
// private preparePayload(formData: any): any {
//   const payload: any = {};

//   // Example logic for QuestionId-specific handling
//   if (formData.internalEmployeeCount || formData.externalEmployeeCount) {
//     payload.questionId = 1;
//     payload.optionDescription = 'Number of Internals and Externals';
//     payload.optionAnswer = {
//       internal: formData.internalEmployeeCount,
//       external: formData.externalEmployeeCount
//     };
//   }
// }
// updateFieldVisibility(questionId: string, optionFlag: number): void {
//   // Reset visibility
//   this.showInternalExternalFields = false;
//   // this.showNumberOfDevices = false;
//   // this.showAnswers = false;
//   // this.showExplanation = false;

//   if (questionId === '1') {
//     this.showInternalExternalFields = true;
//   // } else if (questionId === '2') {
//   //   this.showNumberOfDevices = true;
//   // } else if (questionId === '3') {
//   //   if (optionFlag === 0) {
//   //     this.showAnswers = true;
//   //   } else if (optionFlag === 1) {
//   //     this.showExplanation = true;
//   //   }
//    }
// saveDraft(): void {
//   if (isPlatformBrowser(this.platformId) && typeof localStorage !== 'undefined') {
//     localStorage.setItem('draftData', JSON.stringify(this.formData));
//     alert('Draft saved!');
//   }
// }
// loadDraft(): void {
//   if (isPlatformBrowser(this.platformId) && typeof localStorage !== 'undefined') {
//     const savedData = localStorage.getItem('draftData');
//     if (savedData) {
//       this.formData = JSON.parse(savedData);
//     }
//   }
// }
// private isLocalStorageAvailable(): boolean {
//   return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
// }
// onSelectionChange(value: string): void {
//   // Save the selected value to localStorage whenever it changes
//   if (this.isBrowser) {
//     localStorage.setItem('labelPosition', value);
    
//   }
  

}
// onSelectionChange1(value: string): void {
//   // Save the selected value to localStorage whenever it changes
//   if (this.isBrowser) {
//     localStorage.setItem('labelPosition1', value);
//   }
// }
//  onSubmit(): void {
//   if (this.linkForm.valid) {
//     const formData = this.linkForm.value;

//     // Prepare data based on QuestionId logic
//     const payload: any = this.preparePayload(formData);

//     // Call the ResponseService to save the data
//     this.responseService.saveResponse(payload).subscribe(
//       (response) => {
//         console.log('Response saved successfully:', response);
//         alert('Response saved successfully!');
//       },
//       (error) => {
//         console.error('Error saving response:', error);
//         alert('Error saving response.');
//       }
//     );
//   } else {
//     console.error('Form is invalid!');
//   }
//   return payload;
//  }
// onSubmit(): void {
//   if (this:linkForm.valid) {
//     console.log('Form Data:', this.linkForm.value);
//   }
//    else {
//     console.error('Form is invalid!');
//   }
// }

  
 


 
 



    



 

