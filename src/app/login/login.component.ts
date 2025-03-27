import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  credentials = {
    email: '',
    password: ''
  };

  constructor(private router: Router) {}

  onLogin() {
    // Dummy login functionality
    if (this.credentials.email && this.credentials.password) {
      // For development - hardcoded test account
      localStorage.setItem('currentUser', JSON.stringify({
        name: 'John Doe',
        email: this.credentials.email,
        profileImage: '',
        notifications: 6,
        wishlist: 4
      }));
      
      this.router.navigate(['/dashboard']);
    }
  }
}
