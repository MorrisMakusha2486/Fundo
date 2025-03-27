import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent {
  userDetails = {
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  constructor(private router: Router) {}

  onSignup() {
    // Dummy signup functionality
    if (this.userDetails.password === this.userDetails.confirmPassword) {
      // Store user data locally for development purposes
      localStorage.setItem('currentUser', JSON.stringify({
        name: this.userDetails.name,
        email: this.userDetails.email,
        profileImage: '',
        notifications: 2,
        wishlist: 0
      }));
      
      this.router.navigate(['/dashboard']);
    }
  }
}
