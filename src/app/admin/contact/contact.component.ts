import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../../service/login.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent implements OnInit{
  selectedCategory: string = '';
  username = '';
  ntid: any = '';
  department:any="";

  constructor(private loginService: LoginService){}
  ngOnInit(): void {
      this.getuserid();
  }


  getuserid() {
    this.username = this.loginService.getUserId();
    this.ntid = (this.loginService.getNtId())?.toUpperCase();
    this.department=this.username.match(/\(([^)]+)\)/)?.[1];
  }



}


