
import { DataService } from '../../data.service';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { DialogboxsubmitComponent } from '../dialogboxsubmit/dialogboxsubmit.component';

import { FilterPipe } from '../../filter.pipe';
import { Component, inject} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {
  MatDialog,
} from '@angular/material/dialog';
import { DialogdecommissionComponent } from '../../lab-decommission/dialogdecommission/dialogdecommission.component';



@Component({
  selector: 'app-lab-decommission',
  standalone: true,
  imports: [ RouterLink,CommonModule,RouterOutlet,FormsModule, DialogboxsubmitComponent],
  templateUrl: './lab-decommission.component.html',
  styleUrl: './lab-decommission.component.scss'
})
export class LabDecommissionComponent{
  formData: any;


  constructor(private http: HttpClient )
  {
    this.getAllLabdata();

  }

  getAllLabdata()
  {
    this.http.get("http://localhost:8080/boschLabs/allLabs")

    .subscribe((resultData: any)=>
    {

        //console.log(resultData);
        this.formData = resultData;
    });
  }


}
