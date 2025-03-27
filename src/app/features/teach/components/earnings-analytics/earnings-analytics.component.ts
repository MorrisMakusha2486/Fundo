import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart } from 'chart.js';

interface CourseEarnings {
  courseTitle: string;
  earnings: number;
  percentageIncrease: number;
  students: number;
  color: string;
}

interface StudentInsight {
  metric: string;
  value: number;
  trend: 'up' | 'down';
  percentage: number;
}

@Component({
  selector: 'app-earnings-analytics',
  standalone: true,
  imports: [CommonModule],
  template: `
    
  `
})
export class EarningsAnalyticsComponent implements OnInit {
  totalRevenue = 125480;
  totalStudents = 1234;
  
  courseEarnings: CourseEarnings[] = [
    { courseTitle: 'Angular Masterclass', earnings: 45000, percentageIncrease: 12, students: 450, color: '#3B82F6' },
    { courseTitle: 'React Development', earnings: 38000, percentageIncrease: 8, students: 380, color: '#10B981' },
    { courseTitle: 'Vue.js Basics', earnings: 22000, percentageIncrease: 15, students: 220, color: '#6366F1' },
    { courseTitle: 'TypeScript Advanced', earnings: 18000, percentageIncrease: 5, students: 180, color: '#F59E0B' }
  ];

  studentInsights: StudentInsight[] = [
    { metric: 'Course Completion Rate', value: 78, trend: 'up', percentage: 5 },
    { metric: 'Average Time Spent', value: 45, trend: 'up', percentage: 12 },
    { metric: 'Quiz Pass Rate', value: 92, trend: 'up', percentage: 8 },
    { metric: 'Assignment Submission', value: 85, trend: 'down', percentage: 3 }
  ];

  ngOnInit() {
    this.initializeChart();
  }

  private initializeChart() {
    const ctx = document.getElementById('revenueChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: this.courseEarnings.map(course => course.courseTitle),
        datasets: [{
          data: this.courseEarnings.map(course => course.earnings),
          backgroundColor: this.courseEarnings.map(course => course.color),
          borderWidth: 0,
          hoverOffset: 4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'right',
            labels: {
              usePointStyle: true,
              padding: 20,
              font: {
                size: 12
              }
            }
          },
          tooltip: {
            backgroundColor: 'white',
            titleColor: 'black',
            bodyColor: 'black',
            borderColor: '#e5e7eb',
            borderWidth: 1,
            padding: 12,
            cornerRadius: 8,
            callbacks: {
              label: (context: any) => {
                const value = context.raw;
                return ` $${value.toLocaleString()}`;
              }
            }
          }
        },
        cutout: '75%'
      }
    });
  }
}
