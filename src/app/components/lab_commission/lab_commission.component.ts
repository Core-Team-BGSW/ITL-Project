import { Component } from '@angular/core';
import { HomeComponent } from "../../admin/home/home.component";
import { SidebarComponent } from "../../admin/sidebar/sidebar.component";
import { RouterOutlet, RouterLink } from '@angular/router';


@Component({
    selector: 'app-lab_commission',
    standalone: true,
    templateUrl: './lab_commission.component.html',
    styleUrl: './lab_commission.component.scss',
    imports: [HomeComponent, SidebarComponent, RouterLink, RouterOutlet, LabCommissionComponent],
})
export class LabCommissionComponent {

}
