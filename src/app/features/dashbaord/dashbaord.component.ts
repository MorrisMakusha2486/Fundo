// dashbaord.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { filter } from 'rxjs/operators';

// Import your components used in the template
import { HomeComponent } from '../home/home.component';
import { AchievementsComponent } from '../achievements/achievements.component';
// Import other components as needed

@Component({
  selector: 'app-dashbaord',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,  // Add this import for router-outlet
    FormsModule,
  ],
  templateUrl: './dashbaord.component.html',
  styleUrls: ['./dashbaord.component.scss']
})
export class DashbaordComponent implements OnInit {
  isSidebarOpen = false;
  myView = 'home';
  isRouterOutletActive = true;
  searchQuery = '';
  
  // Add other properties as they appear in your template
  unreadNotifications = 2;
  recentNotifications: any[] = [];
  totalNotifications = 0;
  cartItemsCount = 0;
  cartItems: any[] = [];
  cartTotal = 0;
  userProfile: any = {};
  enrolledCourses: any[] = [];

  constructor(private router: Router) {}

  ngOnInit() {
    // Listen to router events
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      // Parse the URL
      const url = event.urlAfterRedirects;
      
      // Routes that should use router outlet
      const routerRoutes = [
        '/dashboard/home',
        '/dashboard/teach',
        '/dashboard/my-courses',
        '/dashboard/notifications',
        '/dashboard/course/',
        '/dashboard/wishlist',
        '/dashboard/my-library',
        '/dashboard/bookmarked',
        '/dashboard/my-schedule',
        '/dashboard/courses/category/',
        '/dashboard/video-output/',
        '/dashboard/achievements/',
        '/dashboard/achievements',
        '/dashboard/user-account-settings',
        '/dashboard/help-and-support',
        '/dashboard/subscriptions',
        '/dashboard/my-cart',

      ];
      
      // Check if current URL matches any router-managed routes
      this.isRouterOutletActive = routerRoutes.some(route => url.includes(route));
      
      // If home page, set view accordingly
      if (url === '/dashboard' || url === '/dashboard/home') {
        this.myView = 'home';
      }else if (url === '/dashboard' || url === '/dashboard/achievements') {
        this.myView = 'achievements';
      } else if (url.includes('/dashboard/my-courses')) {
        this.myView = 'my-courses';
      } else if (url.includes('/dashboard/teach')) {
        this.myView = 'teach';
      } // Add other path mappings 
    });
    
    // Initialize any data needed for your components
    this.initializeDashboard();
  }

  // Initialize your dashboard data
  private initializeDashboard(): void {
    // Set up dummy data for demonstration
    this.userProfile = {
      name: 'John Doe',
      email: 'john@example.com'
    };
    
    this.enrolledCourses = [
      {
        id: 1,
        title: "JavaScript Fundamentals",
        imageUrl: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=250&h=150&fit=crop",
        progress: 68
      },
      {
        id: 2,
        title: "React Development",
        imageUrl: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=250&h=150&fit=crop",
        progress: 32
      }
    ];
    
    // Initialize other data as needed
  }

  // Navigation methods
  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
  
  toggleMobileSearch(): void {
    // Implementation for mobile search
  }
  
  navigateToHome(): void {
    this.router.navigate(['/dashboard/home']);
  }
  
  search(): void {
    // Implement search functionality
    console.log('Searching for:', this.searchQuery);
  }
  
  setView(view: string): void {
    // Routes that should use router navigation
    const routerViews: { [key: string]: string } = {
      'my-courses': '/dashboard/my-courses',
      'notifications': '/dashboard/notifications',
      'wishlist': '/dashboard/wishlist',
      'teach': '/dashboard/teach',
      'home': '/dashboard/home',
      'achievements': '/dashboard/achievements',
      'user-account-settings': '/dashboard/user-account-settings',
      'my-cart': '/dashboard/my-cart',
      'help-and-support': '/dashboard/help-and-support',
      'subscriptions': '/dashboard/subscriptions',
    };
    
    if (routerViews[view]) {
      // Use router for these views
      this.router.navigate([routerViews[view]]);
      
      // Also update the myView to maintain synchronization
      this.myView = view;
      this.isRouterOutletActive = true;
      
      // For debugging - remove in production
      console.log(`Navigating to ${view}, route: ${routerViews[view]}`);
    } else {
      // Use component-based view switching for other views
      this.myView = view;
      this.isRouterOutletActive = false;
    }
  }
  
  logout(): void {
    // Implement logout functionality
    this.router.navigate(['/login']);
  }
  
  getInitials(name: string): string {
    if (!name) return '';
    return name.split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  }
}