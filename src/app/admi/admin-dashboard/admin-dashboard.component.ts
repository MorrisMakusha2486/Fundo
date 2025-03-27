import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent {
  
  schoolStats = {
    totalStudents: 450,
    totalTeachers: 28,
    totalCourses: 35,
    averageAttendance: 92,
    averageGrade: 85,
    activeParents: 380
  };

  recentActivities = [
    {
      id: 1,
      type: 'Enrollment',
      description: 'New student enrolled in Grade 10',
      timestamp: '2024-03-20 14:30',
      status: 'Completed'
    },
    {
      id: 2,
      type: 'Grade',
      description: 'Final grades posted for Mathematics',
      timestamp: '2024-03-20 13:45',
      status: 'Completed'
    },
    {
      id: 3,
      type: 'Meeting',
      description: 'Parent-Teacher conference scheduled',
      timestamp: '2024-03-20 12:30',
      status: 'Pending'
    }
  ];

  upcomingEvents = [
    {
      id: 1,
      title: 'Parent-Teacher Conference',
      date: '2024-03-25',
      time: '14:00',
      location: 'Main Hall',
      attendees: 120
    },
    {
      id: 2,
      title: 'Science Fair',
      date: '2024-03-28',
      time: '09:00',
      location: 'School Gymnasium',
      attendees: 200
    }
  ];

  alerts = [
    {
      id: 1,
      type: 'warning',
      message: 'Server storage reaching 80% capacity',
      timestamp: '2024-03-20 10:00'
    },
    {
      id: 2,
      type: 'info',
      message: 'System maintenance scheduled for weekend',
      timestamp: '2024-03-20 09:30'
    }
  ];

  performanceMetrics = {
    attendance: {
      current: 92,
      previous: 89,
      trend: 'up'
    },
    grades: {
      current: 85,
      previous: 82,
      trend: 'up'
    },
    parentEngagement: {
      current: 78,
      previous: 75,
      trend: 'up'
    },
    teacherPerformance: {
      current: 88,
      previous: 87,
      trend: 'up'
    }
  };
activityLogs: any;
}
