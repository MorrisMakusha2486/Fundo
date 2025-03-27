import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

interface Course {
  id: number;
  title: string;
  instructor: string;
  imageUrl: string;
  rating: number;
  reviewsCount: number;
  price: number;
  discountedPrice?: number;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
  duration: string;
  lastUpdated: string;
  description: string;
  tags: string[];
  bestseller?: boolean;
  featured?: boolean;
}

interface Category {
  id: number;
  name: string;
  description: string;
  count: number;
  popularTopics: string[];
  imageUrl?: string;
}

@Component({
  selector: 'app-category-courses',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './category-courses.component.html'
})
export class CategoryCoursesComponent implements OnInit {
  categoryId: number = 0;
  category: Category | null = null;
  courses: Course[] = [];
  searchTerm: string = '';
  sortOption: string = 'popular';
  Math = Math; // Make Math available in template

  constructor(private route: ActivatedRoute) {}
  
   // Pagination properties
   currentPage: number = 1;
   coursesPerPage: number = 12;
   totalPages: number = 1;
   paginatedCourses: Course[] = [];
   
  ngOnInit(): void {
    // Get category ID from route parameters
    this.route.params.subscribe(params => {
      this.categoryId = +params['id'];
      this.loadCategoryData();
      this.loadCourses();
    });
  }

  applySorting(option: string): void {
    console.log('Sorting by', option);
    
    // Existing sorting logic
    switch(option) {
      case 'popular':
        this.courses.sort((a, b) => b.reviewsCount - a.reviewsCount);
        break;
      case 'newest':
        this.courses.sort((a, b) => a.id - b.id); // Using ID as a proxy for date
        break;
      case 'rating':
        this.courses.sort((a, b) => b.rating - a.rating);
        break;
      case 'price_low':
        this.courses.sort((a, b) => {
          const priceA = a.discountedPrice || a.price;
          const priceB = b.discountedPrice || b.price;
          return priceA - priceB;
        });
        break;
      case 'price_high':
        this.courses.sort((a, b) => {
          const priceA = a.discountedPrice || a.price;
          const priceB = b.discountedPrice || b.price;
          return priceB - priceA;
        });
        break;
    }
    
    // Reset to first page and update displayed courses
    this.currentPage = 1;
    const startIndex = 0;
    this.paginatedCourses = this.courses.slice(startIndex, startIndex + this.coursesPerPage);
  }

  loadCategoryData(): void {
    // Mock data - in a real app, this would be fetched from an API
    const categories: Record<number, Category> = {
      1: {
        id: 1,
        name: 'Web Development',
        description: 'Learn to build modern web applications with the latest technologies',
        count: 245,
        popularTopics: ['JavaScript', 'React', 'Node.js', 'HTML/CSS', 'Angular']
      },
      2: {
        id: 2,
        name: 'Data Science',
        description: 'Master the tools and techniques to analyze data and extract insights',
        count: 189,
        popularTopics: ['Python', 'Machine Learning', 'Statistics', 'Data Visualization', 'R']
      },
      3: {
        id: 3,
        name: 'Mobile Development',
        description: 'Create apps for iOS and Android with the most in-demand frameworks',
        count: 157,
        popularTopics: ['Flutter', 'React Native', 'Swift', 'Kotlin', 'Firebase']
      },
      4: {
        id: 4,
        name: 'Design',
        description: 'Develop your design skills with courses on UI/UX, graphic design, and more',
        count: 203,
        popularTopics: ['UI/UX', 'Adobe XD', 'Figma', 'Photoshop', 'Illustration']
      }
    };

    this.category = categories[this.categoryId] || {
      id: this.categoryId,
      name: 'Category ' + this.categoryId,
      description: 'Explore courses in this category',
      count: 50,
      popularTopics: ['Topic 1', 'Topic 2', 'Topic 3']
    };
  }

  loadCourses(): void {
    // Generate mock courses data based on the selected category
    // In a real app, this would be fetched from an API
    this.courses = [
      {
        id: 101,
        title: 'The Complete Web Development Bootcamp 2025',
        instructor: 'Emily Chen',
        imageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
        rating: 4.7,
        reviewsCount: 156789,
        price: 89.99,
        discountedPrice: 14.99,
        level: 'All Levels',
        duration: '65 hours',
        lastUpdated: 'Last updated 02/2024',
        description: 'Become a full-stack web developer with just one course. HTML, CSS, Javascript, Node, React, MongoDB and more!',
        tags: ['Bestseller', 'Certificate']
      },
      {
        id: 102,
        title: 'Modern JavaScript From The Beginning',
        instructor: 'John Doe',
        imageUrl: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
        rating: 4.8,
        reviewsCount: 45231,
        price: 79.99,
        discountedPrice: 12.99,
        level: 'Beginner',
        duration: '21.5 hours',
        lastUpdated: 'Last updated 01/2024',
        description: 'Learn modern JavaScript from the beginning, including ES6 features, DOM manipulation, async JS, and modern best practices.',
        tags: ['Highest Rated', 'Certificate']
      },
      {
        id: 103,
        title: 'React - The Complete Guide (incl Hooks, React Router, Redux)',
        instructor: 'David Katz',
        imageUrl: 'https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
        rating: 4.6,
        reviewsCount: 182456,
        price: 94.99,
        discountedPrice: 13.99,
        level: 'All Levels',
        duration: '48 hours',
        lastUpdated: 'Last updated 03/2024',
        description: 'Dive in and learn React.js from scratch! Learn Reactjs, Hooks, Redux, React Routing, Next.js and way more!',
        tags: ['Bestseller', 'Hot & New']
      },
      {
        id: 104,
        title: 'Node.js API Masterclass with Express & MongoDB',
        instructor: 'Alex Merced',
        imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
        rating: 4.7,
        reviewsCount: 21340,
        price: 69.99,
        discountedPrice: 11.99,
        level: 'Intermediate',
        duration: '16 hours',
        lastUpdated: 'Last updated 12/2023',
        description: 'Learn to build a complete RESTful API from scratch with Node.js, Express, MongoDB, authentication, and deployment.',
        tags: ['Popular', 'Project-based']
      },
      {
        id: 105,
        title: 'The Complete 2024 Flutter Development Bootcamp with Dart',
        instructor: 'Peter Barker',
        imageUrl: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
        rating: 4.5,
        reviewsCount: 43256,
        price: 84.99,
        discountedPrice: 13.99,
        level: 'All Levels',
        duration: '28.5 hours',
        lastUpdated: 'Last updated 02/2024',
        description: 'Learn Flutter and build beautiful, fast native mobile apps for iOS and Android. Build 15+ full apps.',
        tags: ['Top-rated', 'Mobile Dev']
      },
      {
        id: 106,
        title: 'Advanced CSS and Sass: Flexbox, Grid, Animations and More!',
        instructor: 'Thomas Schmidt',
        imageUrl: 'https://images.unsplash.com/photo-1523437113738-bbd3cc89fb19?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
        rating: 4.8,
        reviewsCount: 36789,
        price: 74.99,
        discountedPrice: 12.99,
        level: 'Intermediate',
        duration: '28 hours',
        lastUpdated: 'Last updated 11/2023',
        description: 'The most advanced and modern CSS course on the internet: master flexbox, CSS Grid, responsive design, and more.',
        tags: ['Highest Rated', 'CSS']
      },
      {
        id: 107,
        title: 'TypeScript: The Complete Developer\'s Guide',
        instructor: 'Rachel Greene',
        imageUrl: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
        rating: 4.7,
        reviewsCount: 25647,
        price: 79.99,
        discountedPrice: 12.99,
        level: 'Intermediate',
        duration: '24.5 hours',
        lastUpdated: 'Last updated 01/2024',
        description: 'Master TypeScript by learning popular design patterns and building complex projects. Includes React and Express integrations!',
        tags: ['TypeScript', 'In Demand']
      },
      {
        id: 108,
        title: 'Next.js 13 & React - The Complete Guide',
        instructor: 'Alex Thompson',
        imageUrl: 'https://images.unsplash.com/photo-1567604713218-4a5afa82c75c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
        rating: 4.8,
        reviewsCount: 18954,
        price: 89.99,
        discountedPrice: 14.99,
        level: 'All Levels',
        duration: '35 hours',
        lastUpdated: 'Last updated 03/2024',
        description: 'Learn NextJS from the ground up and build production-ready, fullstack ReactJS apps with the NextJS framework!',
        tags: ['Hot & New', 'Full Stack']
      },
      {
        id: 109,
        title: 'MongoDB - The Complete Developer\'s Guide',
        instructor: 'Jasmine Wu',
        imageUrl: 'https://images.unsplash.com/photo-1603380353725-f8a4d39cc41e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
        rating: 4.6,
        reviewsCount: 21675,
        price: 69.99,
        discountedPrice: 11.99,
        level: 'All Levels',
        duration: '17.5 hours',
        lastUpdated: 'Last updated 12/2023',
        description: 'Master MongoDB Development for Web & Mobile Apps. CRUD Operations, Indexes, Aggregation Framework - All about MongoDB!',
        tags: ['Database', 'NoSQL']
      },
      {
        id: 110,
        title: 'Vue.js 3: The Comprehensive Guide',
        instructor: 'Michael Carter',
        imageUrl: 'https://images.unsplash.com/photo-1561883088-039e53143d73?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
        rating: 4.6,
        reviewsCount: 21675,
        price: 69.99,
        discountedPrice: 11.99,
        level: 'All Levels',
        duration: '17.5 hours',
        lastUpdated: 'Last updated 12/2023',
        description: 'Master MongoDB Development for Web & Mobile Apps. CRUD Operations, Indexes, Aggregation Framework - All about MongoDB!',
        tags: ['Database', 'NoSQL']
      },
      {
        id: 111,
        title: 'Python for Data Science & Machine Learning',
        instructor: 'Sarah Johnson',
        imageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
        rating: 4.6,
        reviewsCount: 21675,
        price: 69.99,
        discountedPrice: 11.99,
        level: 'All Levels',
        duration: '17.5 hours',
        lastUpdated: 'Last updated 12/2023',
        description: 'Master MongoDB Development for Web & Mobile Apps. CRUD Operations, Indexes, Aggregation Framework - All about MongoDB!',
        tags: ['Database', 'NoSQL']
      },
      {
        id: 112,
        title: 'GraphQL API Development',
        instructor: 'Benjamin Lee',
        imageUrl: 'https://images.unsplash.com/photo-1555099962-4199c345e5dd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
        rating: 4.6,
        reviewsCount: 21675,
        price: 69.99,
        discountedPrice: 11.99,
        level: 'All Levels',
        duration: '17.5 hours',
        lastUpdated: 'Last updated 12/2023',
        description: 'Master MongoDB Development for Web & Mobile Apps. CRUD Operations, Indexes, Aggregation Framework - All about MongoDB!',
        tags: ['Database', 'NoSQL']
      },
      {
        id: 113,
        title: 'UI/UX Design Principles',
        instructor: 'Emma Davis',
        imageUrl: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
        rating: 4.6,
        reviewsCount: 21675,
        price: 69.99,
        discountedPrice: 11.99,
        level: 'All Levels',
        duration: '17.5 hours',
        lastUpdated: 'Last updated 12/2023',
        description: 'Master MongoDB Development for Web & Mobile Apps. CRUD Operations, Indexes, Aggregation Framework - All about MongoDB!',
        tags: ['Database', 'NoSQL']
      },
      {
        id: 114,
        title: 'Docker & Kubernetes for Developers',
        instructor: 'Raj Patel',
        imageUrl: 'https://images.unsplash.com/photo-1605745341112-85968b19335b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
        rating: 4.6,
        reviewsCount: 21675,
        price: 69.99,
        discountedPrice: 11.99,
        level: 'All Levels',
        duration: '17.5 hours',
        lastUpdated: 'Last updated 12/2023',
        description: 'Master MongoDB Development for Web & Mobile Apps. CRUD Operations, Indexes, Aggregation Framework - All about MongoDB!',
        tags: ['Database', 'NoSQL']
      },
      
    ];
      // Set up pagination
  this.totalPages = Math.ceil(this.courses.length / this.coursesPerPage);
  this.paginatedCourses = this.courses.slice(0, this.coursesPerPage);
  this.currentPage = 1;
  }

  applyFilters(): void {
    console.log('Filters applied');
    // In a real app, this would update the courses based on filters
    // For now, we'll just log the action
  }

  changePage(page: number): void {
    if (page < 1 || page > this.totalPages) {
      return;
    }
    this.currentPage = page;
  }

  // Add method to generate page numbers
  getPageNumbers(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

 
}