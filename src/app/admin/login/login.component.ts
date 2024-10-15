import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Router, RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule, RouterModule ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  // username: string = '';
  // password: string = '';

  // constructor(private router: Router) {}

  // onLogin() {
  //   // For demo purposes, use static credentials.
  //   // Replace with actual authentication logic.
  //   if (this.username === 'admin' && this.password === 'password') {
  //     localStorage.setItem('authToken', 'some-token'); // Store auth token or similar
  //     this.router.navigate(['/home']);
  //   } else {
  //     alert('Invalid credentials!');
  //   }
  // }

}
