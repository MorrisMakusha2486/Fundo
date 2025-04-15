import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common'; // Import CommonModule

// Define a User interface
interface User {
  id: number;
  name: string;
  avatar: string;
  designation: string;
  department: string;
  email: string;
  phone: string;
  status: 'Active' | 'Inactive';
}

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule], // Add CommonModule here
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent {
  currentView: 'list' | 'grid' = 'list'; // Default view

  users: User[] = [
    { id: 1, name: 'Brooklyn Simmons', avatar: 'https://picsum.photos/seed/1/40/40', designation: 'Front-End Developer', department: 'Software', email: 'brooklyns&#64;example.com', phone: '(039) 555-0104', status: 'Active' },
    { id: 2, name: 'Esther Howard', avatar: 'https://picsum.photos/seed/2/40/40', designation: 'UI/UX Designer', department: 'Creative', email: 'estherh&#64;example.com', phone: '(039) 555-0112', status: 'Active' },
    { id: 3, name: 'Leslie Alexander', avatar: 'https://picsum.photos/seed/3/40/40', designation: 'Product Manager', department: 'Product', email: 'lesliea&#64;example.com', phone: '(039) 555-0108', status: 'Inactive' },
    { id: 4, name: 'Wade Warren', avatar: 'https://picsum.photos/seed/4/40/40', designation: 'QA Tester', department: 'Product', email: 'wadew&#64;example.com', phone: '(039) 555-0125', status: 'Active' },
    { id: 5, name: 'Jenny Wilson', avatar: 'https://picsum.photos/seed/5/40/40', designation: 'Product Designer', department: 'Creative', email: 'jennyw&#64;example.com', phone: '(039) 555-0171', status: 'Active' },
    { id: 6, name: 'Robert Fox', avatar: 'https://picsum.photos/seed/6/40/40', designation: 'Front-End Developer', department: 'Software', email: 'robertf&#64;example.com', phone: '(039) 555-0113', status: 'Active' },
    { id: 7, name: 'Kristin Watson', avatar: 'https://picsum.photos/seed/7/40/40', designation: 'Back-End Developer', department: 'Software', email: 'kristinw&#64;example.com', phone: '(039) 555-0129', status: 'Active' },
    { id: 8, name: 'Cody Fisher', avatar: 'https://picsum.photos/seed/8/40/40', designation: 'Software Engineer', department: 'Software', email: 'codyf&#64;example.com', phone: '(039) 555-0138', status: 'Inactive' },
    { id: 9, name: 'Savannah Nguyen', avatar: 'https://picsum.photos/seed/9/40/40', designation: 'Graphics Designer', department: 'Creative', email: 'savannahn&#64;example.com', phone: '(039) 555-0142', status: 'Active' },
  ];

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {}

  navigateToAddUser(): void {
    this.router.navigate(['../user-management-sheqig'], { relativeTo: this.route });
  }

  setView(view: 'list' | 'grid'): void {
    this.currentView = view;
  }
}
