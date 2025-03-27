import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart } from 'chart.js';


interface CourseStats {
  courseTitle: string;
  enrollments: number;
  color: string;
}

interface ActivityItem {
  id: number;
  type: 'enrollment' | 'update' | 'approval';
  message: string;
  timestamp: Date;
  status?: 'pending' | 'completed';
}

@Component({
  selector: 'app-instructors-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './instructors-dashboard.component.html'
})
export class InstructorsDashboardComponent implements OnInit {
  totalCourses = 12;
  totalStudents = 456;
  totalEarnings = 4320;
  
  courseStats: CourseStats[] = [
    { courseTitle: 'Angular Masterclass', enrollments: 120, color: '#3B82F6' },
    { courseTitle: 'React Fundamentals', enrollments: 85, color: '#10B981' },
    { courseTitle: 'Vue.js for Beginners', enrollments: 65, color: '#6366F1' },
    // Add more courses as needed
  ];

  recentActivity: ActivityItem[] = [
    {
      id: 1,
      type: 'enrollment',
      message: 'New student enrolled in Angular Masterclass',
      timestamp: new Date(),
      status: 'completed'
    },
    {
      id: 2,
      type: 'update',
      message: 'Course content updated for React Fundamentals',
      timestamp: new Date(Date.now() - 3600000),
      status: 'completed'
    },
    {
      id: 3,
      type: 'approval',
      message: 'New course pending approval',
      timestamp: new Date(Date.now() - 7200000),
      status: 'pending'
    },
    // Add more activities as needed
  ];

  ngOnInit() {
    this.initializeChart();
  }

  private initializeChart() {
    const ctx = document.getElementById('enrollmentChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.courseStats.map(stat => stat.courseTitle),
        datasets: [{
          label: 'Student Enrollments',
          data: this.courseStats.map(stat => stat.enrollments),
          backgroundColor: this.courseStats.map(stat => stat.color),
          borderRadius: 8,
          maxBarThickness: 40
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            backgroundColor: 'white',
            titleColor: 'black',
            bodyColor: 'black',
            borderColor: '#e5e7eb',
            borderWidth: 1,
            padding: 12,
            cornerRadius: 8,
            titleFont: {
              size: 14,
              weight: 'bold'
            },
            bodyFont: {
              size: 13
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              display: true,
              color: '#f3f4f6'
            }
          },
          x: {
            grid: {
              display: false
            }
          }
        }
      }
    });
  }

  getActivityIconClass(type: string): string {
    const baseClasses = 'p-2 rounded-full';
    switch (type) {
      case 'enrollment':
        return `${baseClasses} bg-blue-100 text-blue-600`;
      case 'update':
        return `${baseClasses} bg-green-100 text-green-600`;
      case 'approval':
        return `${baseClasses} bg-yellow-100 text-yellow-600`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-600`;
    }
  }

  getActivityIcon(type: string): string {
    switch (type) {
      case 'enrollment':
        return 'M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z';
      case 'update':
        return 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15';
      case 'approval':
        return 'M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z';
      default:
        return '';
    }
  }

  getStatusBadgeClass(status: string): string {
    return status === 'pending'
      ? 'bg-yellow-100 text-yellow-800'
      : 'bg-green-100 text-green-800';
  }
}
