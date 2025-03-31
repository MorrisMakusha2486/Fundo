import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { filter } from 'rxjs/operators';

interface UserProfile {
  name: string;
  image?: string;
  email: string;
}

interface Notification {
  id: number;
  message: string;
  read: boolean;
  date: Date;
}

interface CartItem {
  id: number;
  title: string;
  price: number;
}

interface WishlistUpdate {
  id: number;
  courseTitle: string;
  message: string;
  date: Date;
}

interface CategorySubitem {
  name: string;
  count: number;
  link: string;
}

interface Category {
  id: number;
  name: string;
  icon: string;
  count: number;
  subitems: CategorySubitem[];
}

@Component({
  selector: 'app-dashbaord',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule, HomeComponent, AdminDashboardComponent],
  templateUrl: './dashbaord.component.html',
  styleUrl: './dashbaord.component.scss'
})
export class DashbaordComponent implements OnInit{
  

  
  
  isSidebarOpen = false; // Default to open sidebar
  searchQuery: string = '';
  showMobileSearch: boolean = false;
  isContentAreaOpen = true;
  isRouterOutletActive = false; // Flag to check if router outlet is active

  myView: string = 'home'; // Set default view

  userProfile: UserProfile | null = null;
  unreadNotifications = 0;
  cartItemsCount = 0;
  wishlistCount = 0;
  showNotifications = false;
  showCart = false;
  showWishlist = false;
  showUserMenu = false;

  recentNotifications: Notification[] = [
    {
      id: 1,
      message: 'New lecture added to "Angular Masterclass"',
      read: false,
      date: new Date()
    },
    {
      id: 2,
      message: 'Your certificate is ready for "JavaScript Fundamentals"',
      read: false,
      date: new Date()
    },
    // Add more notifications as needed
  ];

  cartItems: CartItem[] = [
    {
      id: 1,
      title: 'Advanced React Patterns',
      price: 49.99
    },
    // Add more cart items as needed
  ];

  wishlistUpdates: WishlistUpdate[] = [
    {
      id: 1,
      courseTitle: 'Python for Data Science',
      message: 'New content added: Machine Learning Basics',
      date: new Date()
    },
    // Add more updates as needed
  ];

  categories: Category[] = [
    {
      id: 1,
      name: 'Web Development',
      icon: 'code',
      count: 150,
      subitems: [
        { name: 'React', count: 45, link: '/courses/react' },
        { name: 'Angular', count: 38, link: '/courses/angular' },
        { name: 'Vue.js', count: 27, link: '/courses/vue' },
        { name: 'HTML & CSS', count: 25, link: '/courses/html-css' },
        { name: 'JavaScript', count: 15, link: '/courses/javascript' }
      ]
    },
    {
      id: 2,
      name: 'Mobile Development',
      icon: 'smartphone',
      count: 120,
      subitems: [
        { name: 'React Native', count: 30, link: '/courses/react-native' },
        { name: 'Flutter', count: 35, link: '/courses/flutter' },
        { name: 'iOS Development', count: 28, link: '/courses/ios' },
        { name: 'Android Development', count: 27, link: '/courses/android' }
      ]
    },
    {
      id: 3,
      name: 'Data Science',
      icon: 'data_usage',
      count: 90,
      subitems: [
        { name: 'Python', count: 40, link: '/courses/python' },
        { name: 'Machine Learning', count: 25, link: '/courses/ml' },
        { name: 'Deep Learning', count: 15, link: '/courses/deep-learning' },
        { name: 'Statistics', count: 10, link: '/courses/statistics' }
      ]
    }
  ];

  constructor(private router:Router, private activatedRoute: ActivatedRoute) {

    // Initialize user profile
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      this.userProfile = JSON.parse(savedUser);
    }

  }

  

  navigateToHome(): void {
    this.router.navigate(['/dashboard/home']);
    this.myView = 'home'; // Reset view selection if needed
  }

  ngOnInit(): void {
     // Check for saved sidebar state first
  const savedSidebarState = localStorage.getItem('sidebarState');
  if (savedSidebarState) {
    this.isSidebarOpen = savedSidebarState === 'open';
  } else {
    // Default to closed if no saved state
    this.isSidebarOpen = false;
  }

    // Check for saved sidebar state or screen size
    this.checkScreenSize();
    
    // Listen for window resize events
    window.addEventListener('resize', () => {
      this.checkScreenSize();
    });

    // Initialize view from URL or saved state if needed
    const savedView = localStorage.getItem('currentView');
    if (savedView) {
      this.myView = savedView;
    }
    
    this.unreadNotifications = this.recentNotifications.filter(n => !n.read).length;
    
    // Subscribe to router events to detect when child routes are active
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      // Check if we're on a child route that should use the router outlet
      this.isRouterOutletActive = this.activatedRoute.firstChild !== null;
      
      // If we're on the home child route, set myView accordingly
      if (this.router.url.includes('/dashboard/home')) {
        this.myView = 'home';
      } else if (this.router.url.includes('/dashboard/admin-dashboard')) {
        this.myView = 'admin-dashboard';
      }
    });
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    // Find the dropdown toggle button and the dropdown menu
    const userMenuButton = event.target as HTMLElement;
    const isClickInsideDropdown = userMenuButton.closest('.user-menu-dropdown');
    const isClickOnToggle = userMenuButton.closest('[data-dropdown-toggle]');

    // Close the dropdown if click is outside both the toggle and dropdown
    if (!isClickInsideDropdown && !isClickOnToggle) {
      this.showUserMenu = false;
    }
  }

  navigateTo(link: string) {
    this.router.navigateByUrl(link);
  }

  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  toggleMobileSearch(): void {
    this.showMobileSearch = !this.showMobileSearch;
  }

  search(): void {
    // Implement search functionality
    console.log('Searching for:', this.searchQuery);
  }

  checkScreenSize(): void {
    // Auto-collapse sidebar on small screens
    if (window.innerWidth < 768) {
      this.isSidebarOpen = false;
    }
    // Don't automatically open on larger screens - let user preference prevail
    // Don't add an else clause that would force it open
  }

  // Update view handling
  setView(view: string): void {
    this.myView = view;
    localStorage.setItem('currentView', view);
    
    if (view === 'teach') {
      this.router.navigate(['dashboard/teach']);
    }
    
    // Auto-close sidebar on mobile when changing views
    if (window.innerWidth < 768) {
      this.isSidebarOpen = false;
    }
  }

  getInitials(name: string): string {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase();
  }

  toggleNotifications(): void {
    this.showNotifications = !this.showNotifications;
    this.showCart = false;
    this.showWishlist = false;
    this.showUserMenu = false;
  }

  toggleCart(): void {
    this.showCart = !this.showCart;
    this.showNotifications = false;
    this.showWishlist = false;
    this.showUserMenu = false;
  }

  toggleWishlist(): void {
    this.showWishlist = !this.showWishlist;
    this.showNotifications = false;
    this.showCart = false;
    this.showUserMenu = false;
  }

  toggleUserMenu(): void {
    this.showUserMenu = !this.showUserMenu;
    this.showNotifications = false;
    this.showCart = false;
    this.showWishlist = false;
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }

  get totalNotifications(): number {
    return this.recentNotifications.length;
  }

  get cartTotal(): number {
    return this.cartItems.reduce((total, item) => total + item.price, 0);
  }

}
