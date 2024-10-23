import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { MatTabLabel, MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioButton, MatRadioModule } from '@angular/material/radio';
import { CommonModule } from '@angular/common';
import { RoleComponent } from '../role/role.component';

interface Answers {
  [key: string]: Set<string>;
}
@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [RouterLink,MatButtonModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatTabLabel, MatTabsModule, MatRadioModule, CommonModule, RoleComponent],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.scss'
})
export class QuizComponent {

  @ViewChild('videoPlayer') videoPlayer!: ElementRef<HTMLVideoElement>;

  showQuizSection = false;
  score: number | null = null;
  passedQuiz = false;
  constructor(private router: Router) {}
  showRoleSection = false;

  proceedToQuiz() {
    if (this.videoPlayer.nativeElement.currentTime >= this.videoPlayer.nativeElement.duration) {
      this.showQuizSection = true;

    } else {
      alert('Please watch the entire video before proceeding.');
    }
  }

  // Define correct answers for each question
  correctAnswers: Answers = {
    question1: new Set(['option2_q1', 'option3_q1']),
    question2: new Set(['option1_q2', 'option2_q2', 'option3_q2','option4_q2','option5_q2']),
    question3: new Set(['option1_q3', 'option2_q3','option3_q3','option4_q3']),
    question4: new Set(['option1_q4', 'option2_q4','option3_q4']),
    question5: new Set(['option1_q5', 'option3_q5', 'option4_q5']),
    question6: new Set(['option1_q6','option2_q6' ,'option3_q6', 'option4_q6']),
    question7: new Set(['option1_q7', 'option2_q7','option3_q7']),
    question8: new Set(['option1_q8', 'option2_q8']),
    question9: new Set(['option1_q9', 'option3_q9']),
    question10: new Set(['option1_q10', 'option2_q10','option3_q10','option4_q10','option5_q10']),
    question11: new Set(['option1_q11', 'option2_q11','option3_q11','option4_q11','option5_q11']),
    question12: new Set(['option1_q12', 'option2_q12','option3_q12','option4_q12','option5_q12']),
    question13: new Set(['option1_q13', 'option2_q13']),
    question14: new Set(['option2_q14']),
    question15: new Set(['option2_q15']),
    question16: new Set(['option1_q16']),
    question17: new Set(['option1_q17']),
    question18: new Set(['option1_q18']),
    question19: new Set(['option1_q19'])


  };

  // User's selected answers
  userSelections: Answers = {
    question1: new Set<string>(),
  question2: new Set<string>(),
  question3: new Set<string>(),
  question4: new Set<string>(),
  question5: new Set<string>(),
  question6: new Set<string>(),
  question7: new Set<string>(),
  question8: new Set<string>(),
  question9: new Set<string>(),
  question10: new Set<string>(),
  question11: new Set<string>(),
  question12: new Set<string>(),
  question13: new Set<string>(),
  question14: new Set<string>(),
  question15: new Set<string>(),
  question16: new Set<string>(),
  question17: new Set<string>(),
  question18: new Set<string>(),
  question19: new Set<string>(),

  };



  // Handle checkbox changes
  onSelectionChange(question: string, value: string, event: Event) {
    const checkbox = event.target as HTMLInputElement;
    if (checkbox.checked) {
      this.userSelections[question].add(value);
    } else {
      this.userSelections[question].delete(value);
    }
  }

  // Calculate score and show form if necessary
  submitAnswers() {
    console.log("submitAnswers function called");
    let totalQuestions = 19;
    let correctAnswersCount = 0;

    // Calculate correct answers
    for (const [question, correctSet] of Object.entries(this.correctAnswers)) {
      const userSet = this.userSelections[question];
      const isCorrect = this.isCorrectAnswer(userSet, correctSet);
      if (isCorrect) {
        correctAnswersCount++;
      }
    }

    // Calculate percentage
    const score = (correctAnswersCount / totalQuestions) * 100;

    this.showScorePopup(score);


    // Check if the user passed
    if (score >= 80) {
    const confirmApply = window.confirm('Congratulations! You have passed the quiz. Do you want to apply for a role?');

    if (confirmApply) {

      this.router.navigate(['/role']);

    } else {
      alert('You did not score more than 80%. Please try again.');
      this.passedQuiz = false;
    }
  }
}

  // Function to show score pop-up
  private showScorePopup(score: number) {
    alert(`Your Score: ${score.toFixed(2)}`);
  }

  // Check if the user's answers match the correct answers
  private isCorrectAnswer(userSet: Set<string>, correctSet: Set<string>): boolean {
    return userSet.size === correctSet.size && [...userSet].every(value => correctSet.has(value));
  }
}

