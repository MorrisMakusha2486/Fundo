// filepath: src/app/features/courses/course-details/course-details.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

interface CourseContent {
  id: number;
  title: string;
  duration: string;
  modules: CourseModule[];
}

interface CourseModule {
  id: number;
  title: string;
  duration: string;
  isPreview: boolean;
}

interface CourseResources {
  videoDuration: string;
  assignmentsCount: number;
  articlesCount: number;
  downloadableResources: number;
}

interface Course {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  thumbnail: string;
  rating: number;
  totalReviews: number;
  price: number;
  duration: string;
  enrolledStudents: number;
  lastUpdated: Date;
  learningOutcomes: string[];
  content: CourseContent[];
  resources: CourseResources;
  requirements: string[];
  categories: string[];
}

interface Instructor {
  id: number;
  name: string;
  title: string;
  bio: string;
  avatar: string;
  rating: number;
  totalStudents: number;
  totalCourses: number;
  isTopInstructor: boolean;
  courses?: {
    id: number;
    title: string;
    thumbnail: string;
    rating: number;
    studentsCount: number;
    price: number;
  }[];
}

interface Review {
  id: number;
  userName: string;
  userAvatar: string;
  rating: number;
  comment: string;
  date: Date;
}

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  standalone: true,
  imports: [CommonModule, RouterModule],
})
export class CourseDetailsComponent implements OnInit {
  courseId: string | null = null;
  showFullBio: boolean = false;

  course: Course = {
    id: 1,
    title: 'Angular Fundamentals',
    subtitle: 'Master Angular development from scratch',
    description: 'Learn the basics of Angular development with hands-on projects and real-world examples.',
    thumbnail: 'assets/images/course-thumbnail.jpg',
    rating: 4.8,
    totalReviews: 1250,
    price: 99.99,
    duration: '6 months',
    enrolledStudents: 3500,
    lastUpdated: new Date('2024-01-15'),
    learningOutcomes: [
      'Understand Angular fundamentals',
      'Build reactive forms',
      'Implement routing and navigation',
      'Work with HTTP and APIs',
      'State management with services'
    ],
    content: [
      {
        id: 1,
        title: 'Getting Started with Angular',
        duration: '2h 30m',
        modules: [
          { id: 1, title: 'Introduction to Angular', duration: '15m', isPreview: true },
          { id: 2, title: 'Setting Up Your Development Environment', duration: '25m', isPreview: false },
          { id: 3, title: 'Understanding Angular Components', duration: '45m', isPreview: false }
        ]
      },
      {
        id: 2,
        title: 'Angular Components Deep Dive',
        duration: '3h 45m',
        modules: [
          { id: 4, title: 'Component Lifecycle', duration: '30m', isPreview: false },
          { id: 5, title: 'Component Communication', duration: '45m', isPreview: false },
          { id: 6, title: 'Content Projection', duration: '35m', isPreview: false }
        ]
      }
    ],
    resources: {
      videoDuration: '28.5 hours',
      assignmentsCount: 12,
      articlesCount: 18,
      downloadableResources: 35
    },
    requirements: [
      'Basic understanding of HTML, CSS, and JavaScript',
      'Familiarity with TypeScript is helpful but not required',
      'Basic understanding of web development concepts',
      'A computer capable of running modern development tools'
    ],
    categories: ['Web Development', 'JavaScript', 'Angular', 'TypeScript', 'Frontend', 'Programming']
  };

  instructor: Instructor = {
    id: 1,
    name: 'Sarah Johnson',
    title: 'Senior Angular Developer',
    bio: `With over a decade of experience in web development and 6 years specifically focused on Angular, I've helped thousands of students master modern web development practices. My teaching approach combines theoretical knowledge with practical, real-world applications to ensure you're job-ready upon completion.

    I've worked with Fortune 500 companies and cutting-edge startups, bringing this diverse experience to my courses. My students have gone on to work at companies like Google, Microsoft, and Amazon.
    
    When I'm not teaching, I'm actively contributing to open-source projects and speaking at international tech conferences. I believe in constant learning and updating my courses with the latest best practices and industry trends.`,
    avatar: 'assets/images/instructor-avatar.jpg',
    rating: 4.9,
    totalStudents: 15000,
    totalCourses: 8,
    isTopInstructor: true,
    courses: [
      {
        id: 2,
        title: 'Advanced Angular Patterns',
        thumbnail: 'https://picsum.photos/300/200?random=1',
        rating: 4.9,
        studentsCount: 2800,
        price: 129.99
      },
      {
        id: 3,
        title: 'Angular State Management',
        thumbnail: 'https://picsum.photos/300/200?random=2',
        rating: 4.7,
        studentsCount: 1900,
        price: 89.99
      }
    ]
  };

  reviews: Review[] = [
    {
      id: 1,
      userName: 'Mike Thompson',
      userAvatar: 'https://i.pravatar.cc/150?img=1',
      rating: 5,
      comment: 'Exceptionally well-structured course with practical examples.',
      date: new Date('2024-01-10')
    },
    {
      id: 2,
      userName: 'Sarah Chen',
      userAvatar: 'https://i.pravatar.cc/150?img=5',
      rating: 5,
      comment: 'The instructor explains complex concepts in a very clear and concise way. The projects are very practical.',
      date: new Date('2024-01-15')
    },
    {
      id: 3,
      userName: 'James Wilson',
      userAvatar: 'https://i.pravatar.cc/150?img=3',
      rating: 4,
      comment: 'Great content and excellent delivery. Would recommend to anyone wanting to learn Angular.',
      date: new Date('2024-01-20')
    },
    {
      id: 4,
      userName: 'Elena Rodriguez',
      userAvatar: 'https://i.pravatar.cc/150?img=4',
      rating: 5,
      comment: 'The best Angular course Ive taken. The instructors experience really shows.',
      date: new Date('2024-01-25')
    }
  ];

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.courseId = params.get('id');
      this.loadCourseData();
    });
  }

  private loadCourseData(): void {
    console.log('Loading course data for ID:', this.courseId);
  }

  toggleBio(): void {
    this.showFullBio = !this.showFullBio;
  }

  generateStarArray(rating: number): number[] {
    return Array(5).fill(0).map((_, index) => index < Math.floor(rating) ? 1 : 0);
  }

  formatNumber(num: number): string {
    return new Intl.NumberFormat('en-US').format(num);
  }

  enrollInCourse(): void {
    console.log('Enrolling in course:', this.courseId);
  }
}