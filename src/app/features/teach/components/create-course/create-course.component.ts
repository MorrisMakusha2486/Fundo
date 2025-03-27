import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

interface CourseStep {
  title: string;
  completed: boolean;
  current: boolean;
}

@Component({
  selector: 'app-create-course',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  template: `
    <div class="max-w-4xl mx-auto p-6">
      <!-- Progress Steps -->
      <div class="flex justify-between mb-8">
        @for (step of steps; track step.title) {
          <div class="flex flex-col items-center flex-1">
            <div class="w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors duration-200"
                [class]="getStepClass(step)">
              @if (step.completed) {
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                </svg>
              } @else {
                {{ steps.indexOf(step) + 1 }}
              }
            </div>
            <span class="text-sm mt-2">{{ step.title }}</span>
          </div>
        }
      </div>

      <!-- Step Content -->
      <div [ngSwitch]="currentStep" class="bg-white rounded-lg shadow p-6">
        <!-- Basic Info -->
        @if (currentStep === 0) {
          <form [formGroup]="basicInfoForm" class="space-y-6">
            <div>
              <label class="block text-sm font-medium text-gray-700">Course Title</label>
              <input type="text" formControlName="title"
                     class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700">Description</label>
              <textarea formControlName="description" rows="4"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"></textarea>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700">Category</label>
              <select formControlName="category"
                      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                <option value="">Select a category</option>
                <option value="development">Development</option>
                <option value="business">Business</option>
                <option value="design">Design</option>
                <!-- Add more categories -->
              </select>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700">Tags</label>
              <input type="text" formControlName="tags"
                     placeholder="Separate tags with commas"
                     class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
            </div>
          </form>
        }

        <!-- Course Content -->
        @if (currentStep === 1) {
          <div class="space-y-6">
            <div class="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3 3m0 0l-3-3m3 3V8"/>
              </svg>
              <div class="mt-4">
                <button type="button"
                        class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                  Upload Files
                </button>
              </div>
              <p class="mt-2 text-sm text-gray-500">Drag and drop files here or click to browse</p>
            </div>

            <div class="space-y-4">
              <h3 class="text-lg font-medium">Course Structure</h3>
              <button class="text-sm text-blue-600 hover:text-blue-700">+ Add Section</button>
              <!-- Add section/lecture structure UI here -->
            </div>
          </div>
        }

        <!-- Pricing & Accessibility -->
        @if (currentStep === 2) {
          <form [formGroup]="pricingForm" class="space-y-6">
            <div>
              <label class="block text-sm font-medium text-gray-700">Course Type</label>
              <div class="mt-2 space-y-4">
                <div class="flex items-center">
                  <input type="radio" formControlName="courseType" value="free" class="h-4 w-4 text-blue-600">
                  <label class="ml-3 text-sm text-gray-700">Free Course</label>
                </div>
                <div class="flex items-center">
                  <input type="radio" formControlName="courseType" value="paid" class="h-4 w-4 text-blue-600">
                  <label class="ml-3 text-sm text-gray-700">Paid Course</label>
                </div>
              </div>
            </div>

            @if (pricingForm.get('courseType')?.value === 'paid') {
              <div>
                <label class="block text-sm font-medium text-gray-700">Price ($)</label>
                <input type="number" formControlName="price"
                       class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
              </div>
            }

            <div>
              <label class="block text-sm font-medium text-gray-700">Visibility</label>
              <select formControlName="visibility"
                      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                <option value="public">Public</option>
                <option value="private">Private</option>
                <option value="draft">Draft</option>
              </select>
            </div>
          </form>
        }

        <!-- Preview & Publish -->
        @if (currentStep === 3) {
          <div class="space-y-6">
            <div class="border rounded-lg p-6">
              <h3 class="text-lg font-medium mb-4">Course Preview</h3>
              <!-- Course preview content -->
              <div class="space-y-4">
                <div>
                  <h4 class="text-sm font-medium text-gray-500">Title</h4>
                  <p class="mt-1">{{ basicInfoForm.get('title')?.value }}</p>
                </div>
                <div>
                  <h4 class="text-sm font-medium text-gray-500">Description</h4>
                  <p class="mt-1">{{ basicInfoForm.get('description')?.value }}</p>
                </div>
                <!-- Add more preview fields -->
              </div>
            </div>

            <div class="flex items-center justify-between">
              <button type="button" 
                      class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                Save as Draft
              </button>
              <button type="button"
                      class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
                Publish Course
              </button>
            </div>
          </div>
        }
      </div>

      <!-- Navigation Buttons -->
      <div class="mt-8 flex justify-between">
        <button *ngIf="currentStep > 0"
                (click)="previousStep()"
                class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
          Previous
        </button>
        <button *ngIf="currentStep < steps.length - 1"
                (click)="nextStep()"
                class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
          Next
        </button>
      </div>
    </div>
  `
})
export class CreateCourseComponent {
  private fb = new FormBuilder();
  currentStep = 0;
  
  steps: CourseStep[] = [
    { title: 'Basic Info', completed: false, current: true },
    { title: 'Course Content', completed: false, current: false },
    { title: 'Pricing & Access', completed: false, current: false },
    { title: 'Preview & Publish', completed: false, current: false }
  ];

  basicInfoForm = this.fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    category: ['', Validators.required],
    tags: ['']
  });

  pricingForm = this.fb.group({
    courseType: ['free', Validators.required],
    price: [0],
    visibility: ['draft', Validators.required]
  });

  getStepClass(step: CourseStep): string {
    const index = this.steps.indexOf(step);
    if (step.completed) {
      return 'border-green-500 text-green-500';
    }
    if (index === this.currentStep) {
      return 'border-blue-500 text-blue-500';
    }
    return 'border-gray-300 text-gray-500';
  }

  nextStep() {
    if (this.currentStep < this.steps.length - 1) {
      this.steps[this.currentStep].completed = true;
      this.steps[this.currentStep].current = false;
      this.currentStep++;
      this.steps[this.currentStep].current = true;
    }
  }

  previousStep() {
    if (this.currentStep > 0) {
      this.steps[this.currentStep].current = false;
      this.currentStep--;
      this.steps[this.currentStep].current = true;
    }
  }
}
