import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InstructorsDashboardComponent } from './components/instructors-dashboard/instructors-dashboard.component';
import { CreateCourseComponent } from './components/create-course/create-course.component';
import { CourseManagementComponent } from './components/course-management/course-management.component';
import { EarningsAnalyticsComponent } from './components/earnings-analytics/earnings-analytics.component';

@Component({
  selector: 'app-teach',
  standalone: true,
  imports: [
    CommonModule,
    InstructorsDashboardComponent,
    CreateCourseComponent,
    CourseManagementComponent,
    EarningsAnalyticsComponent 
  ],
  template: `
    <div class="p-4">
      <div class="bg-white rounded-lg shadow">
        <!-- Tab Headers -->
        <div class="flex border-b">
          <button *ngFor="let tab of tabs" 
                  [class.border-primary]="activeTab === tab.id"
                  [class.border-b-2]="activeTab === tab.id"
                  class="px-6 py-3 text-sm font-medium hover:text-primary transition-colors"
                  (click)="setActiveTab(tab.id)">
            {{ tab.label }}
          </button>
        </div>
        
        <!-- Tab Content -->
        <div class="p-6">
          <ng-container [ngSwitch]="activeTab">
            <app-instructors-dashboard *ngSwitchCase="'dashboard'"></app-instructors-dashboard>
            <app-create-course *ngSwitchCase="'create'"></app-create-course>
            <app-course-management *ngSwitchCase="'manage'"></app-course-management>
            <app-earnings-analytics *ngSwitchCase="'earnings'"></app-earnings-analytics>
          </ng-container>
        </div>
      </div>
    </div>
  `
})
export class TeachComponent {
  tabs = [
    { id: 'dashboard', label: 'Instructor Dashboard' },
    { id: 'create', label: 'Create New Course' },
    { id: 'manage', label: 'Course Management' },
    { id: 'earnings', label: 'Earnings & Analytics' }
  ];
  
  activeTab = 'dashboard';

  setActiveTab(tabId: string) {
    this.activeTab = tabId;
  }
}
