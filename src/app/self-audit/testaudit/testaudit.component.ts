import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuestiontestService } from './service/questiontest.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatTabLabel, MatTabsModule } from '@angular/material/tabs';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';


@Component({
  selector: 'app-testaudit',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule, MatCardModule,
    MatRadioModule,
    MatButtonModule,
    MatInputModule,
    MatTabLabel,
    MatTabsModule,
    MatNativeDateModule,
    MatDatepickerModule],
  templateUrl: './testaudit.component.html',
  styleUrl: './testaudit.component.scss',
})
export class TestauditComponent implements OnInit {

  questionForm: FormGroup;
  questions: any[] = [];
  showAdditionalFields: boolean[] = [];
  isCompletelyFulfilled: boolean[] = [];

  constructor(private fb: FormBuilder, private questionService: QuestiontestService) {
    this.questionForm = this.fb.group({
      responses: this.fb.array([]),
    });
  }

  ngOnInit(): void {
    this.questionService.getQuestions().subscribe((questions) => {
      this.questions = this.groupQuestionsBySection(questions);
      this.populateForm();
    });
  }

  populateForm() {
    const responseArray = this.fb.array(
      this.questions.map((q) => {
        this.showAdditionalFields.push(false);
        this.isCompletelyFulfilled.push(false);
        return this.fb.group({
          questionId: q.questionId,
          fulfillmentStatus: '',
          explanation: '',
          measures: '',
          dueDate: '',
          responsible: '',
          status: '',
        });
      })
    );
    this.questionForm.setControl('responses', responseArray);
  }

  groupQuestionsBySection(questions: any[]): any[] {
    const grouped: { [key: string]: any[] } = {};

    // Group questions by section
    questions.forEach((q) => {
      if (!grouped[q.section]) {
        grouped[q.section] = [];
      }
      grouped[q.section].push(q);
    });

    // Flatten grouped sections into a single array with section indicators
    const result: any[] = [];
    Object.keys(grouped).forEach((section) => {
      grouped[section].forEach((question, index) => {
        result.push({ ...question, sectionIndex: index + 1, isSectionStart: index === 0 });
      });
    });

    return result;
  }

  get responses() {
    return this.questionForm.get('responses') as FormArray;
  }

  dropdownBackgroundStyles: string[] = [];

  onStatusChange(index: number) {
    const selectedStatus = this.responses.at(index).get('fulfillmentStatus')?.value;


    this.isCompletelyFulfilled[index] = selectedStatus === 'Completely Fulfilled';
    this.showAdditionalFields[index] = selectedStatus === 'Partially Fulfilled' || selectedStatus === 'Not Fulfilled';

    if (selectedStatus === 'Completely Fulfilled') {
      this.responses.at(index).patchValue({
        measures: null,
        dueDate: null,
        responsible: null,
        status: null,
      });
    }
  }



  onSubmit() {
    const formData = {
      userId: 'iqa3kor',
      responses: this.questionForm.value.responses,
    };

    this.questionService.submitResponses(formData).subscribe({
      next: () => alert('Data submitted successfully!'),
      error: () => alert('Error submitting data!'),
    });
  }



}




