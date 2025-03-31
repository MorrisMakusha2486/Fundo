// tabs/my-library/my-library.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-my-library',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div>
      <h2 class="text-xl font-semibold text-gray-800 mb-6">My Learning Library</h2>
      
      <!-- Course filters -->
      <div class="mb-6 flex flex-wrap items-center gap-4">
        <div class="relative">
          <select class="pl-4 pr-10 py-2 border border-gray-300 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="all">All Categories</option>
            <option value="web">Web Development</option>
            <option value="mobile">Mobile Development</option>
            <option value="data">Data Science</option>
            <option value="design">Design</option>
          </select>
        </div>
        
        <div class="relative">
          <select class="pl-4 pr-10 py-2 border border-gray-300 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="all">All Progress</option>
            <option value="not-started">Not Started</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        
        <div class="flex-grow"></div>
        
        <div class="flex items-center">
          <span class="text-sm text-gray-600 mr-2">Sort by:</span>
          <select class="pl-4 pr-10 py-2 border border-gray-300 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="recent">Recently Accessed</option>
            <option value="title-asc">Title: A-Z</option>
            <option value="title-desc">Title: Z-A</option>
            <option value="progress">Progress</option>
          </select>
        </div>
      </div>
      
      <!-- Courses Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <!-- Course Card Example -->
        <div class="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow">
          <div class="relative">
            <img src="https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=800&h=400&fit=crop" alt="Course Image" class="w-full h-36 object-cover">
            <div class="absolute bottom-0 left-0 w-full bg-gradient-to-t from-gray-900 to-transparent p-4">
              <span class="text-xs font-medium text-white bg-blue-600 rounded-full px-2 py-1">Web Development</span>
            </div>
          </div>
          
          <div class="p-4">
            <h3 class="font-medium text-gray-900 mb-1">Complete JavaScript Course 2023</h3>
            <p class="text-sm text-gray-500 mb-3">by Sarah Johnson</p>
            
            <!-- Progress bar -->
            <div class="flex items-center mb-1">
              <div class="w-full bg-gray-200 rounded-full h-2">
                <div class="bg-blue-600 h-2 rounded-full" style="width: 65%"></div>
              </div>
              <span class="ml-2 text-xs text-gray-500">65%</span>
            </div>
            
            <div class="flex justify-between items-center mt-4">
              <a href="#" class="text-sm text-blue-600 font-medium">Continue Learning</a>
              <button class="p-1 text-gray-500 hover:text-gray-700">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
        
        <!-- Add more course cards here -->
      </div>
    </div>
  `,
})
export class MyLibraryComponent implements OnInit {
  constructor() {}
  
  ngOnInit(): void {}
}