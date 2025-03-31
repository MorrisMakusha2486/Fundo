import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

interface User {
  name: string;
  email: string;
  profileImage: string;
  notifications: number;
  wishlist: number;
  initials?: string;
}

interface Course {
  id: number;
  title: string;
  category: string;
  progress?: number;
}

interface Category {
  id: number;
  name: string;
  coursesCount?: number;     // Make this optional
  popularTopics?: string[];  // Add this if you want to show popular topics
  description?: string;      // Optional description
  icon?: string;             // Icon name for the category
  count?: number;            // Alternative to coursesCount
  imageUrl?: string;         // URL for category image
  subitems?: any[];          // Array of subcategories or related items
}

// Add new interface for course recommendations
interface RecommendedCourse {
  id: number;
  title: string;
  instructor: string;
  imageUrl: string;
  rating: number;
  price: number;
  participants: number;
}

// Interface for Continue Learning courses
interface ContinueLearningCourse {
  id: number;
  title: string;
  imageUrl: string;
  progress: number;
  lastWatched: string;
  remainingTime: string;
}

// Interface for Popular Courses
interface PopularCourse {
  id: number;
  title: string;
  instructor: string;
  imageUrl: string;
  rating: number;
  price: number;
  enrolledLastMonth: number;
}

// Interface for Short Courses
interface ShortCourse {
  id: number;
  title: string;
  instructor: string;
  imageUrl: string;
  duration: string;
  price: number;
  skills: string[];
}

// Interface for Student Achievements
interface StudentAchievement {
  id: number;
  studentName: string;
  studentImage: string;
  location: string;
  certificateTitle: string;
  courseTitle: string;
  completedDate: string;
}

interface Notification {
  id: number;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  date: Date;
}

interface CartItem {
  id: number;
  courseId: number;
  title: string;
  price: number;
  quantity: number;
}

interface CourseDetails {
  id: number;
  title: string;
  summary: string;
  keyPoints: string[];
  outcomes: string[];
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy {
  user: User | null = {
    name: '',
    email: '',
    profileImage: '',
    notifications: 0,
    wishlist: 0,
    initials: ''
  };
  showNotifications = false;
  showWishlist = false;
  showUserMenu = false;
  searchQuery = '';
  currentSlide = 0;
  sliderInterval: any;
  isNavOpen = false;
  isSidenavOpen = false;
  currentRoute: string = '';
  isAdmin: boolean = false; // This should be set based on user role
  private hideTooltipTimeout: any = null;
  
  notifications: Notification[] = [];
  cartItems: CartItem[] = [];
  hoveredCourse: CourseDetails | null = null;
  tooltipPosition = { x: 0, y: 0 };
  
  hoveredCategory: any = null;
categoryTooltipPosition = { x: 0, y: 0 };

// Add these methods
showCategoryTooltip(event: MouseEvent, category: any): void {
  // Clear any pending hide operations
  if (this.hideTooltipTimeout) {
    clearTimeout(this.hideTooltipTimeout);
    this.hideTooltipTimeout = null;
  }
   
  this.hoveredCategory = {
    ...category,
    popularTopics: category.popularTopics || ['JavaScript', 'HTML', 'CSS', 'React']
  };
  
   // Position tooltip near the mouse but with some offset
   const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();

 // Calculate position - center below the category card
 this.categoryTooltipPosition = {
  x: rect.left + (rect.width / 2) - 128, // 128 is half of tooltip width (256px)
  y: rect.bottom + window.scrollY + 10 // Add window.scrollY to account for page scroll
};
  
// Ensure tooltip stays within viewport
const viewportWidth = window.innerWidth;
const viewportHeight = window.innerHeight;

  // Adjust X if too close to right edge
  if (this.categoryTooltipPosition.x + 256 > viewportWidth) {
    this.categoryTooltipPosition.x = viewportWidth - 256 - 20;
  }
  
  // Adjust X if too close to left edge
  if (this.categoryTooltipPosition.x < 20) {
    this.categoryTooltipPosition.x = 20;
  }
  
  // Adjust Y if too close to bottom edge
  if (this.categoryTooltipPosition.y + 200 > window.scrollY + viewportHeight) { // Assuming tooltip height ~200px
    this.categoryTooltipPosition.y = rect.top + window.scrollY - 210; // Position above instead
  }
}

// Updated method for when mouse leaves the tooltip itself
hideCategoryTooltip(): void {
  this.hoveredCategory = null;
  if (this.hideTooltipTimeout) {
    clearTimeout(this.hideTooltipTimeout);
    this.hideTooltipTimeout = null;
  }
}

// New method to start the hiding process with a delay
startHideCategoryTooltip(): void {
  this.hideTooltipTimeout = setTimeout(() => {
    this.hoveredCategory = null;
    this.hideTooltipTimeout = null;
  }, 300); // Small delay to allow mouse to move to tooltip
}

// New method to cancel hiding when mouse enters the tooltip
cancelHideCategoryTooltip(): void {
  if (this.hideTooltipTimeout) {
    clearTimeout(this.hideTooltipTimeout);
    this.hideTooltipTimeout = null;
  }
}

exploreCategoryDetails(categoryId: number): void {
  // Navigate to the category courses component with the category ID
  this.router.navigate(['/dashboard/courses/category', categoryId]);
}
  // Dummy data
  currentCourses: Course[] = [
    { id: 1, title: 'Introduction to Angular', category: 'Web Development', progress: 45 },
    { id: 2, title: 'Advanced JavaScript Patterns', category: 'Programming', progress: 72 },
    { id: 3, title: 'UI/UX Design Fundamentals', category: 'Design', progress: 30 },
    { id: 4, title: 'Database Design and Optimization', category: 'Database', progress: 15 },
    { id: 5, title: 'Full Stack Development', category: 'Web Development', progress: 60 }
  ];
  
  categories: Category[] = [
    {
      id: 1,
      name: 'Web Development',
      icon: 'code',
      count: 150,
      imageUrl: 'https://images.unsplash.com/photo-1593720213428-28a5b9e94613?w=800&h=600&fit=crop',
      subitems: [
        { name: 'React', count: 45, link: '/courses/react', imageUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=600&fit=crop' },
        { name: 'Angular', count: 38, link: '/courses/angular', imageUrl: 'https://images.unsplash.com/photo-1634926878768-2a5b3c42f139?w=800&h=600&fit=crop' },
        { name: 'Vue.js', count: 27, link: '/courses/vue', imageUrl: 'https://images.unsplash.com/photo-1615751072497-5f5169febe17?w=800&h=600&fit=crop' },
        { name: 'HTML & CSS', count: 25, link: '/courses/html-css', imageUrl: 'https://images.unsplash.com/photo-1621839673705-6617adf9e890?w=800&h=600&fit=crop' },
        { name: 'JavaScript', count: 15, link: '/courses/javascript', imageUrl: 'https://images.unsplash.com/photo-1632882765546-1ee75f53becb?w=800&h=600&fit=crop' }
      ]
    },
    {
      id: 2,
      name: 'Mobile Development',
      icon: 'smartphone',
      count: 120,
      imageUrl: 'https://source.unsplash.com/800x600/?mobileapp',
      subitems: [
        { name: 'React Native', count: 30, link: '/courses/react-native', imageUrl: 'https://source.unsplash.com/800x600/?mobile' },
        { name: 'Flutter', count: 35, link: '/courses/flutter', imageUrl: 'https://source.unsplash.com/800x600/?flutter' },
        { name: 'iOS Development', count: 28, link: '/courses/ios', imageUrl: 'https://source.unsplash.com/800x600/?ios' },
        { name: 'Android Development', count: 27, link: '/courses/android', imageUrl: 'https://source.unsplash.com/800x600/?android' }
      ]
    },
    {
      id: 3,
      name: 'Data Science',
      icon: 'data_usage',
      count: 90,
      imageUrl: 'https://source.unsplash.com/800x600/?datascience',
      subitems: [
        { name: 'Python', count: 40, link: '/courses/python', imageUrl: 'https://source.unsplash.com/800x600/?python' },
        { name: 'Machine Learning', count: 25, link: '/courses/ml', imageUrl: 'https://source.unsplash.com/800x600/?machinelearning' },
        { name: 'Deep Learning', count: 15, link: '/courses/deep-learning', imageUrl: 'https://source.unsplash.com/800x600/?deeplearning' },
        { name: 'Statistics', count: 10, link: '/courses/statistics', imageUrl: 'https://source.unsplash.com/800x600/?statistics' }
      ]
    },
    {
      id: 4,
      name: 'Physics',
      icon: 'data_usage',
      count: 90,
      imageUrl: 'https://source.unsplash.com/800x600/?datascience',
      subitems: [
        { name: 'Python', count: 40, link: '/courses/python', imageUrl: 'https://source.unsplash.com/800x600/?python' },
        { name: 'Machine Learning', count: 25, link: '/courses/ml', imageUrl: 'https://source.unsplash.com/800x600/?machinelearning' },
        { name: 'Deep Learning', count: 15, link: '/courses/deep-learning', imageUrl: 'https://source.unsplash.com/800x600/?deeplearning' },
        { name: 'Statistics', count: 10, link: '/courses/statistics', imageUrl: 'https://source.unsplash.com/800x600/?statistics' }
      ]
    },
    {
      id: 5,
      name: 'Animation',
      icon: 'data_usage',
      count: 90,
      imageUrl: 'https://source.unsplash.com/800x600/?datascience',
      subitems: [
        { name: 'Python', count: 40, link: '/courses/python', imageUrl: 'https://source.unsplash.com/800x600/?python' },
        { name: 'Machine Learning', count: 25, link: '/courses/ml', imageUrl: 'https://source.unsplash.com/800x600/?machinelearning' },
        { name: 'Deep Learning', count: 15, link: '/courses/deep-learning', imageUrl: 'https://source.unsplash.com/800x600/?deeplearning' },
        { name: 'Statistics', count: 10, link: '/courses/statistics', imageUrl: 'https://source.unsplash.com/800x600/?statistics' }
      ]
    },
    {
      id: 6,
      name: 'Mathmatics',
      icon: 'data_usage',
      count: 90,
      imageUrl: 'https://source.unsplash.com/800x600/?datascience',
      subitems: [
        { name: 'Python', count: 40, link: '/courses/python', imageUrl: 'https://source.unsplash.com/800x600/?python' },
        { name: 'Machine Learning', count: 25, link: '/courses/ml', imageUrl: 'https://source.unsplash.com/800x600/?machinelearning' },
        { name: 'Deep Learning', count: 15, link: '/courses/deep-learning', imageUrl: 'https://source.unsplash.com/800x600/?deeplearning' },
        { name: 'Statistics', count: 10, link: '/courses/statistics', imageUrl: 'https://source.unsplash.com/800x600/?statistics' }
      ]
    }
  ];

  recommendedCourses: RecommendedCourse[] = [
    {
      id: 101,
      title: 'Complete Angular Developer in 2023',
      instructor: 'John Smith',
      imageUrl: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=800&h=600&fit=crop',
      rating: 4.8,
      price: 49.99,
      participants: 12453
    },
    {
      id: 102,
      title: 'Modern JavaScript for Beginners',
      instructor: 'Sarah Johnson',
      imageUrl: 'assets/images/courses/javascript.jpg',
      rating: 4.5,
      price: 39.99,
      participants: 8763
    },
    {
      id: 103,
      title: 'UI/UX Design Principles',
      instructor: 'Michael Chen',
      imageUrl: 'assets/images/courses/uiux.jpg',
      rating: 4.9,
      price: 59.99,
      participants: 5289
    },
    {
      id: 104,
      title: 'Python for Data Science',
      instructor: 'Emma Wilson',
      imageUrl: 'assets/images/courses/python.jpg',
      rating: 4.7,
      price: 44.99,
      participants: 9874
    },
    {
      id: 105,
      title: 'Web Development Bootcamp',
      instructor: 'Alex Rodriguez',
      imageUrl: 'assets/images/courses/webdev.jpg',
      rating: 4.6,
      price: 69.99,
      participants: 15632
    },
    {
      id: 106,
      title: 'Introduction to Machine Learning',
      instructor: 'David Kim',
      imageUrl: 'assets/images/courses/ml.jpg',
      rating: 4.4,
      price: 49.99,
      participants: 7345
    },
    {
      id: 107,
      title: 'Mobile App Development with React Native',
      instructor: 'Lisa Wang',
      imageUrl: 'assets/images/courses/reactnative.jpg',
      rating: 4.3,
      price: 54.99,
      participants: 6289
    },
    {
      id: 108,
      title: 'HTML & CSS Basics',
      instructor: 'James Wilson',
      imageUrl: 'assets/images/courses/htmlcss.jpg',
      rating: 4.5,
      price: 0,
      participants: 25631
    },
    // Adding 6 more courses
    {
      id: 109,
      title: 'Advanced CSS and Sass',
      instructor: 'Melissa Thompson',
      imageUrl: 'assets/images/courses/css-sass.jpg',
      rating: 4.7,
      price: 42.99,
      participants: 11238
    },
    {
      id: 110,
      title: 'Blockchain Development Fundamentals',
      instructor: 'Robert Chen',
      imageUrl: 'assets/images/courses/blockchain.jpg',
      rating: 4.2,
      price: 64.99,
      participants: 3487
    },
    {
      id: 111,
      title: 'Game Development with Unity',
      instructor: 'Daniel Brown',
      imageUrl: 'assets/images/courses/unity.jpg',
      rating: 4.6,
      price: 59.99,
      participants: 8912
    },
    {
      id: 112,
      title: 'Data Structures and Algorithms',
      instructor: 'Jennifer Lee',
      imageUrl: 'assets/images/courses/algorithms.jpg',
      rating: 4.8,
      price: 54.99,
      participants: 14562
    },
    {
      id: 113,
      title: 'Cloud Architecture with AWS',
      instructor: 'Thomas Wilson',
      imageUrl: 'assets/images/courses/aws.jpg',
      rating: 4.4,
      price: 69.99,
      participants: 5673
    },
    {
      id: 114,
      title: 'DevOps Engineering',
      instructor: 'Sophia Garcia',
      imageUrl: 'assets/images/courses/devops.jpg',
      rating: 4.7,
      price: 79.99,
      participants: 7211
    }
  ];
  
  currentRecommendedIndex = 0;
  visibleRecommendedCount = 4; // Number of cards visible at once

  // Continue Learning
  continueLearningCourses: ContinueLearningCourse[] = [
    {
      id: 201,
      title: 'Advanced React Patterns',
      imageUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=600&fit=crop',
      progress: 65,
      lastWatched: 'Module 4: Context API',
      remainingTime: '2h 15m'
    },
    {
      id: 202,
      title: 'Flutter App Development',
      imageUrl: 'assets/images/courses/flutter.jpg',
      progress: 32,
      lastWatched: 'Module 2: Widgets',
      remainingTime: '4h 45m'
    },
    {
      id: 203,
      title: 'Cybersecurity Fundamentals',
      imageUrl: 'assets/images/courses/cybersecurity.jpg',
      progress: 78,
      lastWatched: 'Module 6: Encryption',
      remainingTime: '1h 20m'
    },
    {
      id: 204,
      title: 'GraphQL API Development',
      imageUrl: 'assets/images/courses/graphql.jpg',
      progress: 45,
      lastWatched: 'Module 3: Resolvers',
      remainingTime: '3h 30m'
    },
    {
      id: 205,
      title: 'Docker & Kubernetes',
      imageUrl: 'assets/images/courses/docker.jpg',
      progress: 52,
      lastWatched: 'Module 5: Container Orchestration',
      remainingTime: '2h 40m'
    }
  ];
  
  currentContinueLearningIndex = 0;
  visibleContinueLearningCount = 4;
  
  // Popular Courses
  popularCourses: PopularCourse[] = [
    {
      id: 301,
      title: 'Complete Python Developer in 2023',
      instructor: 'Mark Johnson',
      imageUrl: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=800&h=600&fit=crop',
      rating: 4.9,
      price: 84.99,
      enrolledLastMonth: 3250
    },
    {
      id: 302,
      title: 'The Ultimate AWS Certification Guide',
      instructor: 'Jessica Parker',
      imageUrl: 'assets/images/courses/aws-cert.jpg',
      rating: 4.8,
      price: 74.99,
      enrolledLastMonth: 2890
    },
    {
      id: 303,
      title: 'Mastering TypeScript',
      instructor: 'David Lee',
      imageUrl: 'assets/images/courses/typescript.jpg',
      rating: 4.7,
      price: 64.99,
      enrolledLastMonth: 3120
    },
    {
      id: 304,
      title: 'JavaScript Algorithms and Data Structures',
      instructor: 'Emily Davis',
      imageUrl: 'assets/images/courses/js-algorithms.jpg',
      rating: 4.6,
      price: 59.99,
      enrolledLastMonth: 2780
    },
    {
      id: 305,
      title: 'Machine Learning A-Z',
      instructor: 'Michael Brown',
      imageUrl: 'assets/images/courses/ml-az.jpg',
      rating: 4.5,
      price: 89.99,
      enrolledLastMonth: 3450
    }
  ];
  
  currentPopularCoursesIndex = 0;
  visiblePopularCoursesCount = 4;

  // Short Courses section
  shortCourses: ShortCourse[] = [
    {
      id: 401,
      title: 'Git & GitHub Crash Course',
      instructor: 'Tom Wilson',
      imageUrl: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=800&h=600&fit=crop',
      duration: '1h 45m',
      price: 19.99,
      skills: ['Version Control', 'Git', 'GitHub', 'Collaboration']
    },
    {
      id: 402,
      title: 'Docker Fundamentals',
      instructor: 'Lisa Johnson',
      imageUrl: 'assets/images/courses/docker-short.jpg',
      duration: '2h 30m',
      price: 24.99,
      skills: ['Docker', 'Containers', 'DevOps']
    },
    {
      id: 403,
      title: 'CSS Flexbox Mastery',
      instructor: 'Rachel Kim',
      imageUrl: 'assets/images/courses/flexbox.jpg',
      duration: '1h 15m',
      price: 14.99,
      skills: ['CSS', 'Flexbox', 'Responsive Design']
    },
    {
      id: 404,
      title: 'JavaScript ES6 Features',
      instructor: 'Michael Brown',
      imageUrl: 'assets/images/courses/es6.jpg',
      duration: '2h 10m',
      price: 29.99,
      skills: ['JavaScript', 'ES6', 'Web Development']
    },
    {
      id: 405,
      title: 'Intro to GraphQL',
      instructor: 'Sarah Davis',
      imageUrl: 'assets/images/courses/graphql-short.jpg',
      duration: '1h 30m',
      price: 19.99,
      skills: ['GraphQL', 'API', 'Web Development']
    }
  ];
  
  currentShortCoursesIndex = 0;
  visibleShortCoursesCount = 4;
  
  // Student Achievements section
  studentAchievements: StudentAchievement[] = [
    {
      id: 501,
      studentName: 'Alex Johnson',
      studentImage: 'assets/images/students/alex.jpg',
      location: 'New York, USA',
      certificateTitle: 'Full Stack Developer Certificate',
      courseTitle: 'MERN Stack Development',
      completedDate: '2 days ago'
    },
    {
      id: 502,
      studentName: 'Maria Garcia',
      studentImage: 'assets/images/students/maria.jpg',
      location: 'Barcelona, Spain',
      certificateTitle: 'Data Science Certificate',
      courseTitle: 'Python for Data Analysis',
      completedDate: '1 week ago'
    },
    {
      id: 503,
      studentName: 'David Kim',
      studentImage: 'assets/images/students/david.jpg',
      location: 'Seoul, South Korea',
      certificateTitle: 'UI/UX Design Certificate',
      courseTitle: 'Advanced User Interface Design',
      completedDate: '3 days ago'
    },
    {
      id: 504,
      studentName: 'Sophie Martin',
      studentImage: 'assets/images/students/sophie.jpg',
      location: 'Paris, France',
      certificateTitle: 'Cloud Computing Certificate',
      courseTitle: 'AWS Solutions Architect',
      completedDate: '5 days ago'
    },
    {
      id: 505,
      studentName: 'James Wilson',
      studentImage: 'assets/images/students/james.jpg',
      location: 'London, UK',
      certificateTitle: 'Mobile Development Certificate',
      courseTitle: 'Flutter Mobile App Development',
      completedDate: '1 day ago'
    }
  ];
  
  currentAchievementsIndex = 0;
  visibleAchievementsCount = 4;

  constructor(private router: Router) {
    // Get current route
    this.currentRoute = this.router.url.split('/')[1] || 'dashboard';
    
    // Check if user is admin (implement your own logic)
    const userString = localStorage.getItem('currentUser');
    if (userString) {
      const user = JSON.parse(userString);
      this.isAdmin = user.role === 'admin'; // adjust according to your user role structure
    }

    // Track current route for active state
    this.router.events.subscribe(() => {
      this.currentRoute = this.router.url.split('/')[1] || 'dashboard';
    });

    // Initialize user initials if no profile image
    if (this.user && !this.user.profileImage) {
      this.user.initials = this.getInitials(this.user.name);
    }
  }

  ngOnInit(): void {
    const userString = localStorage.getItem('currentUser');
    if (userString) {
      this.user = JSON.parse(userString);
    } else {
      this.router.navigate(['/login']);
    }
    
    // Start the slider autoplay
    this.startSliderAutoplay();
  }
  
  ngOnDestroy(): void {
    // Clear the slider interval when component is destroyed
    this.stopSliderAutoplay();
  }

  getInitials(name: string): string {
    return name.split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  }

  toggleNotifications(): void {
    this.showNotifications = !this.showNotifications;
    this.showWishlist = false;
    this.showUserMenu = false;
  }

  toggleWishlist(): void {
    this.showWishlist = !this.showWishlist;
    this.showNotifications = false;
    this.showUserMenu = false;
  }

  toggleUserMenu(): void {
    this.showUserMenu = !this.showUserMenu;
    this.showNotifications = false;
    this.showWishlist = false;
  }

  toggleNav(): void {
    this.isNavOpen = !this.isNavOpen;
  }

  toggleSidenav(): void {
    this.isSidenavOpen = !this.isSidenavOpen;
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }

  search(): void {
    // Implement search functionality
    console.log('Searching for:', this.searchQuery);
  }
  
  startSliderAutoplay(): void {
    this.sliderInterval = setInterval(() => {
      this.currentSlide = (this.currentSlide + 1) % 3; // 3 is the number of slides
    }, 4000); // Change slide every 4 seconds
  }
  
  stopSliderAutoplay(): void {
    if (this.sliderInterval) {
      clearInterval(this.sliderInterval);
    }
  }
  
  setSlide(index: number): void {
    this.currentSlide = index;
    // Reset the timer when manually changing slides
    this.stopSliderAutoplay();
    this.startSliderAutoplay();
  }

  prevRecommended(): void {
    if (this.currentRecommendedIndex > 0) {
      this.currentRecommendedIndex--;
    }
  }
  
  nextRecommended(): void {
    if (this.currentRecommendedIndex < this.recommendedCourses.length - this.visibleRecommendedCount) {
      this.currentRecommendedIndex++;
    }
  }

  // Continue Learning navigation methods
  prevContinueLearning(): void {
    if (this.currentContinueLearningIndex > 0) {
      this.currentContinueLearningIndex--;
    }
  }
  
  nextContinueLearning(): void {
    if (this.currentContinueLearningIndex < this.continueLearningCourses.length - this.visibleContinueLearningCount) {
      this.currentContinueLearningIndex++;
    }
  }
  
  // Popular Courses navigation methods
  prevPopularCourses(): void {
    if (this.currentPopularCoursesIndex > 0) {
      this.currentPopularCoursesIndex--;
    }
  }
  
  nextPopularCourses(): void {
    if (this.currentPopularCoursesIndex < this.popularCourses.length - this.visiblePopularCoursesCount) {
      this.currentPopularCoursesIndex++;
    }
  }
  
  // Short Courses navigation methods
  prevShortCourses(): void {
    if (this.currentShortCoursesIndex > 0) {
      this.currentShortCoursesIndex--;
    }
  }
  
  nextShortCourses(): void {
    if (this.currentShortCoursesIndex < this.shortCourses.length - this.visibleShortCoursesCount) {
      this.currentShortCoursesIndex++;
    }
  }
  
  // Student Achievements navigation methods
  prevAchievements(): void {
    if (this.currentAchievementsIndex > 0) {
      this.currentAchievementsIndex--;
    }
  }
  
  nextAchievements(): void {
    if (this.currentAchievementsIndex < this.studentAchievements.length - this.visibleAchievementsCount) {
      this.currentAchievementsIndex++;
    }
  }

  onCourseSelect(courseId: number): void {
    console.log('Selected course:', courseId); // For debugging
    this.router.navigate(['/course', courseId]);
  }

  showTooltip(event: MouseEvent, course: any): void {
    const courseDetails: CourseDetails = {
      id: course.id,
      title: course.title,
      summary: 'Learn the fundamentals and advanced concepts of this course.',
      keyPoints: [
        'Master core concepts',
        'Hands-on projects',
        'Industry best practices'
      ],
      outcomes: [
        'Build real-world applications',
        'Earn a certificate',
        'Join developer community'
      ]
    };
    
    this.hoveredCourse = courseDetails;
    this.tooltipPosition = {
      x: event.clientX + 10,
      y: event.clientY + 10
    };
  }

  hideTooltip(): void {
    this.hoveredCourse = null;
  }

  addToWishlist(courseId: number): void {
    // Implement wishlist logic
    console.log('Added to wishlist:', courseId);
    this.user!.wishlist++;
  }

  getUnreadNotificationsCount(): number {
    return this.notifications.filter(n => !n.read).length;
  }

  getCartItemsCount(): number {
    return this.cartItems.reduce((acc, item) => acc + item.quantity, 0);
  }
}
