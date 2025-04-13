// filepath: src/app/course.service.ts
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Course } from '../../course';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  // Mock data (replace with your actual data source)
  private courses: Course[] = [
    {
      id: 1,
      title: 'Angular Fundamentals',
      description: 'Learn the basics of Angular development.',
      instructor: 'John Doe',
      imageUrl: 'assets/images/angular.jpg',
      videoUrl: 'https://example.com/angular-intro.mp4',
      modules: [
        {
            id: 1,
            title: 'Module 1: Introduction to Angular',
            videos: [
                {
                    id: 1,
                    title: 'Video 1: Setting up your environment',
                    url: 'https://example.com/angular-module1-video1.mp4',
                    duration: '15:30'
                },
                {
                    id: 2,
                    title: 'Video 2: Components and Templates',
                    url: 'https://example.com/angular-module1-video2.mp4',
                    duration: '20:00'
                }
            ]
        }
      ],
      rating: 4.5,
      price: 99,
      participants: 150,
      enrolledLastMonth: 20,
      skills: ['Angular', 'TypeScript', 'HTML', 'CSS']
    },
    {
        id: 2,
        title: 'React Fundamentals',
        description: 'Learn the basics of React development.',
        instructor: 'John Smith',
        imageUrl: 'assets/images/react.jpg',
        videoUrl: 'https://example.com/react-intro.mp4',
        modules: [
          {
              id: 1,
              title: 'Module 1: Introduction to React',
              videos: [
                  {
                      id: 1,
                      title: 'Video 1: Setting up your environment',
                      url: 'https://example.com/react-module1-video1.mp4',
                      duration: '15:30'
                  },
                  {
                      id: 2,
                      title: 'Video 2: Components and Templates',
                      url: 'https://example.com/react-module1-video2.mp4',
                      duration: '20:00'
                  }
              ]
          }
        ],
        rating: 4.5,
        price: 99,
        participants: 150,
        enrolledLastMonth: 20,
        skills: ['React', 'JavaScript', 'HTML', 'CSS']
      }
  ];

  getCourse(id: number): Observable<Course | undefined> {
    const course = this.courses.find(c => c.id === id);
    return of(course);
  }
}