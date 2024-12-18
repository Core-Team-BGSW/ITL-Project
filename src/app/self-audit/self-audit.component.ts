import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
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
import { ActivatedRoute, Router } from '@angular/router';
import {
  MatDatepickerModule,
  matDatepickerAnimations,
} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { FormAnswerService } from '../service/form-answer.service';
import { Question } from '../../../models/Question';
import { ToastrService } from 'ngx-toastr';
import { DataService } from '../data.service';
import { TestauditComponent } from './testaudit/testaudit.component';



export interface CheckListResponseDTO {
  questionId: number;
  explanation: string;
  measures?: string;
  responsible?: string;
  status: string;
  dueDate?: string;
  fulfillmentStatus: string;
}

@Component({
  selector: 'app-self-audit',
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
    TestauditComponent
  ],
  templateUrl: './self-audit.component.html',
  styleUrl: './self-audit.component.scss',
})
export class SelfAuditComponent {
  labelPosition: string = '';
  labelPosition1: string = '';
  labelPosition2: string = '';
  labelPosition3: string = '';
  labelPosition4: string = '';
  labelPosition5: string = '';
  description: string = '';
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
  loginArray: any = {};
  formData = {
    firstName: '',
    lastName: '',
    deviceno: '',
    labelPosition: '',
    answer1: '',
    explanation1: '',
    labelPosition1: '',
    downtime: '',
    answer2: '',
    selectedOption: '',
    internalEmployeeCount: '',
    externalEmployeeCount: '',
    acceptabletime: ',',
    answer3: '',
    answer4: '',
    maxdowntime: '',
    timerequired1: '',
    answer5: '',
    answer6: '',
    answer7: '',
    answer8: '',
    answer9: '',
    timereq: '',
    answer10: '',
    selecteddropdown: '',
  };
  questions: Question[] = [];
  //responses: { [key: number]: string } = {};
  currentQuestionIndex: number = 0;
  headCount: string[] = ['', ''];
  itDevice: string = '';
  dependancy: string[] = [];
  wan: string[] = ['', ''];
  test: string[] = [];
  downtime: string = '';
  criticalTest: string[] = [];
  trial: string[] = [];
  lan: string[] = [];
  confidentiality: string = '';
  userId: string = '';
  isBrowser: boolean;
  questionIds: number[] = [];
  responses: {
    [key: string]: {
      explanation: string;
      measures: string;
      responsible: string;
      status: string;
      dueDate: string;
      fulfillmentStatus: string;
    };
  } = {};
  questionId: any;

  showOptions = false;
  isSaved: boolean = false;

  /////////Ashraf Shaikh - Code for checklist form data fetching///////////
  checklistid='';
  location = '';
  gb = '';
  country = '';
  plant = '';
  labroom='';
  resp_mgt='';
  litl='';
  litl_proxy='';
  date:Date=new Date();
  lab_cord='';
  acl:any;
  dso_adit:any;
  criticality='';
  combinedData: string;

  // resp_mgt$!: Observable<string>;
  ////////////////////////////////////////////////////////////////////////

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
    } else if (selectedValue === 'partially-fulfilled') {
      this.partiallyFulfilledCount++;
    } else if (selectedValue === 'not-fulfilled') {
      this.notFulfilledCount++;
    } else if (selectedValue === 'not-fulfilled') {
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
    } else if (selectedValue === 'partially-fulfilled') {
      this.partiallyFulfilledCount1++;
    } else if (selectedValue === 'not-fulfilled') {
      this.notFulfilledCount1++;
    } else if (selectedValue === 'not-fulfilled') {
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
    } else if (selectedValue === 'partially-fulfilled') {
      this.partiallyFulfilledCount2++;
    } else if (selectedValue === 'not-fulfilled') {
      this.notFulfilledCount2++;
    } else if (selectedValue === 'not-fulfilled') {
      this.notapplicableCount2++;
    }
    console.log('Fulfilled Count:', this.fulfilledCount2);
    console.log('Fulfilled Count:', this.partiallyFulfilledCount2);
    console.log('Fulfilled Count:', this.notFulfilledCount2);
    console.log('Fulfilled Count:', this.notapplicableCount2);
  }
  linkForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    @Inject(PLATFORM_ID) private platformId: Object,
    private formAnswerService: FormAnswerService,
    private http: HttpClient,
    private dataService:DataService,
    private toastr: ToastrService,
    private route: ActivatedRoute,

    //////////////////////////////Ashraf //////////////

    /////////////////////////////////////////////////
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
      explanation: ['', Validators.required],
    });
    this.questionIds = [];
    this.responses = {};

    // Fetch question IDs from the dataService
    this.dataService.getQuestions().subscribe(
      (data: number[]) => {
        // Expecting an array of numbers (questionIds)
        if (Array.isArray(data) && data.length > 0) {
          this.questionIds = data;

          // Initialize responses for each questionId
          this.questionIds.forEach((questionId) => {
            this.responses[questionId] = {
              explanation: '',
              measures: '',
              responsible: '',
              dueDate: '',
              status: '',
              fulfillmentStatus: '',
            };
          });
        } else {
          console.error('Invalid data format:', data);
        }
      },
      (error) => {
        console.error('Error fetching question IDs:', error);
      }
    );
    const currentDate = new Date();
    const month = currentDate.toLocaleString('default', { month: 'short' }).toUpperCase(); // e.g., OCT
    const year = currentDate.getFullYear().toString().slice(-2);
    this.combinedData = `${month}_${year}`

    ////////////////////Ashraf////////////


  }

  ngOnInit(): void {
    this.loadQuestions();

    ////////Ashraf Shaikh- Checklist data
    this.route.queryParams.subscribe(params => {
      if (params['details']) {
        const labDetails = JSON.parse(decodeURIComponent(params['details']));
        this.location=labDetails.locationCode;
        this.gb = labDetails.gb;
        this.country = labDetails.country;
        this.plant = labDetails.building;
        this.labroom=labDetails.labNo;
        this.resp_mgt=labDetails.dh;
        this.litl=labDetails.local_itl;
        this.litl_proxy=labDetails.local_itl_proxy;
        this.date=new Date();
        if(labDetails.primary_lab_cord=="null"){
          this.lab_cord='NA';
        }else{
          this.lab_cord=labDetails.primary_lab_cord;
        }
        this.acl=labDetails.acl_req;
        this.dso_adit="No";
        this.criticality= "";


        this.checklistid=`${labDetails.country}_${labDetails.gb}_${labDetails.labNo}_${labDetails.locationCode}_${labDetails.building}_${this.combinedData}`
        // Use the lab details here
      }
    });




  }

  //////////////////////////Ashraf Shaikh////////////////////////////////////
  //getting name instead of ntid in form
  getUserNameWithDept(ntid: string): Observable<string> {
    return this.dataService.getSuggestions(ntid).pipe(
      map((data) => `${data.lastName} ${data.firstName} (${data.department})`)
    );
  }


  ///////////////////////////////////////////////////////////////////////////

  loadQuestions(): void {
    this.formAnswerService.getAllQuestions().subscribe({
      next: (data: Question[]) => {
        // this.questions = data;
        this.questions = data.sort((a, b) => a.questionId - b.questionId); // Assign the fetched data to the 'questions' array
      },
      error: (error) => {
        console.error('Error fetching questions:', error); // Log error if something goes wrong
      },
    });
  }
  nextQuestion(): void {
    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
    }
  }

  // Function to go to the previous question
  previousQuestion(): void {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
    }
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
  data: any[] = [];

  generateExcelFile(): void {
    const heading = [
      ['Engineering Lab Asset Inventory - Client Hardware - IT Devices'],
    ];
    const columnHeadings = [
      ['Computer name', 'Common account', 'User access list'],
    ];
    const worksheetData = [
      { Name: 'Name', Age: 'Age', Address: 'Address' },
      ...this.data,
    ];

    // Step 4: Convert JSON to worksheet
    const worksheet = XLSX.utils.json_to_sheet(worksheetData, {
      skipHeader: true,
    });

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
    const excelBuffer: any = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });

    // Step 10: Convert buffer to blob
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });

    // Step 11: Save the file
    saveAs(blob, 'Copy of remote access list.xlsx');
  }
  saveForm() {
    // this.userId="HUL3KOR";
    const data = this.questions.map((question) => {
      // Dynamically map questionId to its corresponding response field
      if (question.questionId === 1) {
        return {
          questionId: question.questionId,
          headCount: this.headCount, // Assume this is bound to a form control or input
        };
      } else if (question.questionId === 2) {
        return {
          questionId: question.questionId,
          itDevice: this.itDevice, // Assume this is bound to a form control or input
        };
      } else if (question.questionId === 3) {
        return {
          questionId: question.questionId,
          dependancy: this.dependancy, // Assume this is bound to a form control or input
        };
      } else if (question.questionId === 4) {
        return {
          questionId: question.questionId,
          wan: this.wan, // Assume this is bound to a form control or input
        };
      } else if (question.questionId === 5) {
        return {
          questionId: question.questionId,
          test: this.test, // Assume this is bound to a form control or input
        };
      } else if (question.questionId === 6) {
        return {
          questionId: question.questionId,
          downtime: this.downtime, // Assume this is bound to a form control or input
        };
      } else if (question.questionId === 7) {
        return {
          questionId: question.questionId,
          criticalTest: this.criticalTest, // Assume this is bound to a form control or input
        };
      } else if (question.questionId === 8) {
        return {
          questionId: question.questionId,
          trial: this.trial, // Assume this is bound to a form control or input
        };
      } else if (question.questionId === 9) {
        return {
          questionId: question.questionId,
          lan: this.lan, // Assume this is bound to a form control or input
        };
      } else if (question.questionId === 10) {
        return {
          questionId: question.questionId,
          confidentiality: this.confidentiality, // Assume this is bound to a form control or input
        };
      } else {
        return {
          questionId: question.questionId,
          response: '', // Default placeholder for other questions
        };
      }
    });

    this.formAnswerService.saveFormAnswer(data).subscribe((response) => {
      console.log('Form Saved Successfully', response);
      this.toastr.success('Response has been saved successfully');
    });
  }

  //Checklist submission

  //selectedOption: string = ''; // To bind to the select input
  explanation: string = '';
  measures: string = '';
  responsible: string = '';
  status: string = '';
  dueDate: string = ''; // To store date in string format
  fulfillmentStatus: string = '';

  explanation1: string = '';
  measures1: string = '';
  responsible1: string = '';
  status1: string = '';
  dueDate1: string = ''; // To store date in string format
  fulfillmentStatus1: string = '';

  explanation2: string = '';
  measures2: string = '';
  responsible2: string = '';
  status2: string = '';
  dueDate2: string = ''; // To store date in string format
  fulfillmentStatus2: string = '';

  onChecklistSubmit() {
    const responseDTO: CheckListResponseDTO = {
      questionId: 1, // Assuming this is the question ID for the example
      explanation: this.explanation,
      measures: this.measures,
      responsible: this.responsible,
      status: this.status,
      dueDate: this.dueDate,
      fulfillmentStatus: this.selectedOption,
    };
    const responseDTO1: CheckListResponseDTO = {
      questionId: 2, // Assuming this is the question ID for the example
      explanation: this.explanation1,
      measures: this.measures1,
      responsible: this.responsible1,
      status: this.status1,
      dueDate: this.dueDate1,
      fulfillmentStatus: this.selectedOption1,
    };
    const responseDTO2: CheckListResponseDTO = {
      questionId: 3, // Assuming this is the question ID for the example
      explanation: this.explanation2,
      measures: this.measures2,
      responsible: this.responsible2,
      status: this.status2,
      dueDate: this.dueDate2,
      fulfillmentStatus: this.selectedOption2,
    };

    // Send the data to the backend using the service
    this.dataService.submitCheckListResponse(responseDTO).subscribe(
      (response) => {
        console.log('Response saved successfully', response);
        // Optionally handle success or reset form here
      },
      (error) => {
        console.error('Error saving response', error);
      }
    );
    this.dataService.submitCheckListResponse(responseDTO1).subscribe(
      (response) => {
        console.log('Response saved successfully', response);
        // Optionally handle success or reset form here
      },
      (error) => {
        console.error('Error saving response', error);
      }
    );
    this.dataService.submitCheckListResponse(responseDTO2).subscribe(
      (response) => {
        console.log('Response saved successfully', response);
        this.toastr.success('Checklist Response has been Saved.');
        // Optionally handle success or reset form here
      },
      (error) => {
        console.error('Error saving response', error);
      }
    );
  }


  /////////////////////////////////////ashraf Code////////////////////////////////////////////















}
