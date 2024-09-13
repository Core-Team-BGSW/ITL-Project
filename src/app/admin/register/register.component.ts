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


  proceedToQuiz() {
    if (this.videoPlayer.nativeElement.currentTime >= this.videoPlayer.nativeElement.duration) {
      this.showQuizSection = true;
      // Optionally, you may scroll to the quiz section or display it in some way
    } else {
      alert('Please watch the entire video before proceeding.');
    }
  }
  // Define the correct answers for each question
  question1CorrectAnswers: Set<string> = new Set(['secondary_lab_cord', 'local_itl']);
  question2CorrectAnswers: Set<string> = new Set(['secondary_lab_cord', 'local_itl']);

  // User's selected answers
  userSelectionsQ1: Set<string> = new Set();
  userSelectionsQ2: Set<string> = new Set();

  // Method to handle checkbox change for question 1
  onSelectionChangeQ1(option: string, event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.checked) {
      this.userSelectionsQ1.add(option);
    } else {
      this.userSelectionsQ1.delete(option);
    }
  }

  // Method to handle checkbox change for question 2
  onSelectionChangeQ2(option: string, event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.checked) {
      this.userSelectionsQ2.add(option);
    } else {
      this.userSelectionsQ2.delete(option);
    }
  }

  // Method to calculate the score for question 1
  calculateScoreQ1(): number {
    const totalCorrectOptions = this.question1CorrectAnswers.size;
    const userCorrectSelections = Array.from(this.userSelectionsQ1).filter(option => this.question1CorrectAnswers.has(option)).length;

    // If there are incorrect selections, score is 0
    if (userCorrectSelections !== totalCorrectOptions || Array.from(this.userSelectionsQ1).some(option => !this.question1CorrectAnswers.has(option))) {
      return 0;
    }

    // Calculate score as a percentage
    const score = (userCorrectSelections / totalCorrectOptions) * 100;
    return score;
  }

  // Method to calculate the score for question 2
  calculateScoreQ2(): number {
    const totalCorrectOptions = this.question2CorrectAnswers.size;
    const userCorrectSelections = Array.from(this.userSelectionsQ2).filter(option => this.question2CorrectAnswers.has(option)).length;

    // If there are incorrect selections, score is 0
    if (userCorrectSelections !== totalCorrectOptions || Array.from(this.userSelectionsQ2).some(option => !this.question2CorrectAnswers.has(option))) {
      return 0;
    }

    // Calculate score as a percentage
    const score = (userCorrectSelections / totalCorrectOptions) * 100;
    return score;
  }

  // Method to calculate total score across all questions
  calculateTotalScore(): number {
    const scoreQ1 = this.calculateScoreQ1();
    const scoreQ2 = this.calculateScoreQ2();

    // Assuming each question has equal weightage
    const totalScore = (scoreQ1 + scoreQ2) / 2;
    return totalScore;
  }
}

