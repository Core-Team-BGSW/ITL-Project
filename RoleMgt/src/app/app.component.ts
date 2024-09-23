import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RoleformComponent } from './roleform/roleform.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RoleformComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'RoleMgt';
}
