import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Course {
  id: number;
  title: string;
  enrolled: number;
  completionRate: number;
  rating: number;
  status: 'published' | 'draft' | 'review';
  lastUpdated: Date;
}

@Component({
  selector: 'app-course-management',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="p-6">
      <!-- Header with search and filters -->
      <div class="sticky top-0 bg-white z-10 pb-4 border-b border-gray-200">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-semibold text-gray-800">My Courses</h2>
          <div class="flex gap-2">
            <div class="relative">
              <input type="text" 
                     placeholder="Search courses..." 
                     class="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              <span class="absolute right-3 top-2.5 text-gray-400">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                </svg>
              </span>
            </div>
            <button class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              + New Course
            </button>
          </div>
        </div>
        
        <!-- Filters -->
        <div class="flex gap-4 text-sm">
          <button class="px-3 py-1 rounded-full bg-blue-100 text-blue-800">All Courses</button>
          <button class="px-3 py-1 rounded-full hover:bg-gray-100">Published</button>
          <button class="px-3 py-1 rounded-full hover:bg-gray-100">Drafts</button>
          <button class="px-3 py-1 rounded-full hover:bg-gray-100">Under Review</button>
        </div>
      </div>

      <!-- Course List -->
      <div class="mt-6">
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Students</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Completion</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              @for (course of courses; track course.id) {
                <tr class="hover:bg-gray-50">
                  <td class="px-6 py-4">
                    <div class="flex items-center">
                      <div class="text-sm font-medium text-gray-900">{{ course.title }}</div>
                    </div>
                  </td>
                  <td class="px-6 py-4 text-sm text-gray-500">
                    {{ course.enrolled }}
                  </td>
                  <td class="px-6 py-4">
                    <div class="flex items-center">
                      <div class="w-16 bg-gray-200 rounded-full h-2.5">
                        <div class="bg-blue-600 h-2.5 rounded-full" 
                             [style.width]="course.completionRate + '%'"></div>
                      </div>
                      <span class="ml-2 text-sm text-gray-500">{{ course.completionRate }}%</span>
                    </div>
                  </td>
                  <td class="px-6 py-4">
                    <div class="flex items-center">
                      <svg class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                      </svg>
                      <span class="ml-1 text-sm text-gray-500">{{ course.rating }}</span>
                    </div>
                  </td>
                  <td class="px-6 py-4">
                    <span [class]="getStatusClass(course.status)">
                      {{ course.status }}
                    </span>
                  </td>
                  <td class="px-6 py-4 text-sm text-gray-500">
                    <div class="flex gap-2">
                      <button class="text-blue-600 hover:text-blue-800">Edit</button>
                      <button class="text-gray-600 hover:text-gray-800">Preview</button>
                      <button class="text-red-600 hover:text-red-800">Delete</button>
                    </div>
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `
})
export class CourseManagementComponent {
  courses: Course[] = [
    {
      id: 1,
      title: 'Angular Fundamentals',
      enrolled: 156,
      completionRate: 78,
      rating: 4.5,
      status: 'published',
      lastUpdated: new Date()
    },
    {
      id: 2,
      title: 'React for Beginners',
      enrolled: 89,
      completionRate: 65,
      rating: 4.2,
      status: 'published',
      lastUpdated: new Date()
    },
    {
      id: 3,
      title: 'Vue.js Advanced Concepts',
      enrolled: 0,
      completionRate: 0,
      rating: 0,
      status: 'draft',
      lastUpdated: new Date()
    }
  ];

  getStatusClass(status: string): string {
    const baseClasses = 'px-2 py-1 text-xs font-medium rounded-full';
    switch (status) {
      case 'published':
        return `${baseClasses} bg-green-100 text-green-800`;
      case 'draft':
        return `${baseClasses} bg-gray-100 text-gray-800`;
      case 'review':
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      default:
        return baseClasses;
    }
  }
}
