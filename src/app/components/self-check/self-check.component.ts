
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup,ReactiveFormsModule,Validators,FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatTabLabel, MatTabsModule } from '@angular/material/tabs';
import { Router, RouterLink } from '@angular/router';
import { MatDatepickerModule, matDatepickerAnimations } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';


interface Question {
  question: string;
  answer: string;
  showAnswer: boolean;
}

@Component({
  selector: 'app-self-check',
  standalone: true,
  imports: [RouterLink,ReactiveFormsModule, FormsModule, CommonModule, MatCardModule, MatRadioModule, MatButtonModule, MatInputModule, MatTabsModule, MatNativeDateModule, MatDatepickerModule],
  templateUrl: './self-check.component.html',
  styleUrl: './self-check.component.scss'
})
export class SelfCheckComponent {
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
}


