import { Component, ElementRef, ViewChild } from '@angular/core';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { MatTabLabel, MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioButton, MatRadioModule } from '@angular/material/radio';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink,MatButtonModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatTabLabel, MatTabsModule, MatRadioModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  @ViewChild('videoPlayer') videoPlayer!: ElementRef<HTMLVideoElement>;

  showQuizSection = false;
  quizAnswers = {
    answer1: '',
    answer2: ''
  };
  quizScore = 0;
  formData = {
    ntid: '',
    entityName: '',
    gbName: '',
    role: '',
    labNames: ''
  };

  proceedToQuiz() {
    if (this.videoPlayer.nativeElement.currentTime >= this.videoPlayer.nativeElement.duration) {
      this.showQuizSection = true;
      // Optionally, you may scroll to the quiz section or display it in some way
    } else {
      alert('Please watch the entire video before proceeding.');
    }
  }
}
