import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-app-review',
  standalone: true,
  imports: [],
  templateUrl: './app-review.component.html',
  styleUrl: './app-review.component.scss'
})
export class AppReviewComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}


}
