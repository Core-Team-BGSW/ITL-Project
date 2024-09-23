import { Component } from '@angular/core';

@Component({
  selector: 'app-roleform',
  standalone: true,
  imports: [],
  templateUrl: './roleform.component.html',
  styleUrl: './roleform.component.css'
})
export class RoleformComponent {
  NTID: string = "IQA3KOR";
  MobileNumber: number =7066820049;
  isMale: boolean=true;
  DOB: Date= new Date();
}
