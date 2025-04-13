import { Component, HostListener } from '@angular/core'; // Import HostListener
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent {
  isScrolled = false; // Add isScrolled property

  @HostListener('window:scroll', [])
  onWindowScroll() {
    // Set isScrolled to true if page is scrolled more than 50px, false otherwise
    this.isScrolled = window.scrollY > 50; 
  }
  
  // State for FAQ items (index: boolean -> true=open, false=closed)
  faqOpenState: { [key: number]: boolean } = { 0: false, 1: false, 2: false }; 

  // Method to toggle FAQ item state
  toggleFaqItem(index: number): void {
    this.faqOpenState[index] = !this.faqOpenState[index];
  }

  courses = [
    {
      title: 'Web Development Fundamentals',
      instructor: 'John Smith',
      skillLevel: 'Beginner',
      imageUrl: 'assets/images/course1.jpg'
    },
    {
      title: 'Digital Marketing Strategies',
      instructor: 'Jane Doe',
      skillLevel: 'Intermediate',
      imageUrl: 'assets/images/course2.jpg'
    },
    {
      title: 'Data Science Essentials',
      instructor: 'David Lee',
      skillLevel: 'Advanced',
      imageUrl: 'assets/images/course3.jpg'
    },
    {
      title: 'Mobile App Development',
      instructor: 'Emily Chen',
      skillLevel: 'Beginner',
      imageUrl: 'assets/images/course4.jpg'
    },
      
    {
      title: 'Machine Learning Basics',
      instructor: 'Michael Brown',
      skillLevel: 'Intermediate',
      imageUrl: 'assets/images/course5.jpg'
    },
    {
      title: 'UI/UX Design Principles',
      instructor: 'Sarah Johnson',
      skillLevel: 'Advanced',
      imageUrl: 'assets/images/course6.jpg'
    },
    {
      title: 'Cloud Computing Fundamentals',
      instructor: 'Chris Evans',
      skillLevel: 'Beginner',
      imageUrl: 'assets/images/course7.jpg'
    },
    {
      title: 'Cybersecurity Basics',
      instructor: 'Jessica Parker',
      skillLevel: 'Intermediate',
      imageUrl: 'assets/images/course8.jpg'
    },
    {
      title: 'Blockchain Technology Explained',
      instructor: 'Robert Wilson',
      skillLevel: 'Advanced',
      imageUrl: 'assets/images/course9.jpg'
    },
    {
      title: 'Game Development with Unity',
      instructor: 'Laura Taylor',
      skillLevel: 'Beginner',
      imageUrl: 'assets/images/course10.jpg'
    },
    {
      title: 'Game Development with Unity',
      instructor: 'Laura Taylor',
      skillLevel: 'Beginner',
      imageUrl: 'assets/images/course10.jpg'
    }
  ];
    

  constructor(private router: Router) {}

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }

  isCollapsed = true;

  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
  }

  get displayedCourses() {
    return this.isCollapsed ? this.courses.slice(0, 4) : this.courses;
  }
  
}
