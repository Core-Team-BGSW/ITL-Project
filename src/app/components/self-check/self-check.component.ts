
import { RouterLink } from '@angular/router';
import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup,ReactiveFormsModule,Validators,FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';


interface Question {
  question: string;
  answer: string;
  showAnswer: boolean;
}

@Component({
  selector: 'app-self-check',
  standalone: true,
  imports: [RouterLink,ReactiveFormsModule,FormsModule, CommonModule,
    MatCardModule,
    MatRadioModule,
    MatButtonModule,MatInputModule,MatSelectModule,MatFormFieldModule,MatOptionModule],
  templateUrl: './self-check.component.html',
  styleUrl: './self-check.component.scss'
})
export class SelfCheckComponent {
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
  selectedOption31: string = '';
  showOptions = false;

  toggleOptions() {
    this.showOptions = !this.showOptions;
}

}
