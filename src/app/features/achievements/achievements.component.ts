import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Achievement {
  id: string;
  title: string;
  description: string;
  iconUrl: string;
  category: 'course' | 'exam' | 'milestone' | 'special';
  status: 'locked' | 'in-progress' | 'unlocked';
  progress?: number;
  dateEarned?: Date;
  points: number;
  certificateUrl?: string;
}

interface Certificate {
  id: string;
  name: string;
  description: string;
  issueDate: Date;
  expiryDate?: Date;
  status: 'active' | 'expiring-soon' | 'expired';
  downloadUrl: string;
}

interface Badge {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  earned: boolean;
}

@Component({
  selector: 'app-achievements',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './achievements.component.html'
})
export class AchievementsComponent implements OnInit {
  // Achievement stats
  achievementStats = {
    unlocked: 0,
    inProgress: 0,
    total: 0
  };

  // Filters
  searchQuery: string = '';
  filters = {
    status: 'all',
    category: 'all'
  };
  sortOption: string = 'recent';

  // Data
  achievements: Achievement[] = [];
  filteredAchievements: Achievement[] = [];
  certifications: Certificate[] = [];
  badges: Badge[] = [];

  constructor() { }

  ngOnInit(): void {
    this.loadAchievements();
    this.loadCertifications();
    this.loadBadges();
    this.calculateAchievementStats();
    this.applyFilters();
  }

  loadAchievements(): void {
    // In a real app, this would come from a service
    this.achievements = [
      {
        id: 'ach-1',
        title: 'JavaScript Fundamentals',
        description: 'Completed the JavaScript Fundamentals course with distinction.',
        iconUrl: 'assets/images/achievements/js-badge.svg',
        category: 'course',
        status: 'unlocked',
        dateEarned: new Date(2023, 2, 15),
        points: 100,
        certificateUrl: 'assets/certificates/js-fundamentals.pdf'
      },
      {
        id: 'ach-2',
        title: 'Frontend Developer Path',
        description: 'Successfully completed all courses in the Frontend Developer learning path.',
        iconUrl: 'assets/images/achievements/frontend-badge.svg',
        category: 'milestone',
        status: 'in-progress',
        progress: 65,
        points: 350
      },
      {
        id: 'ach-3',
        title: 'React Master',
        description: 'Demonstrated advanced proficiency in React development.',
        iconUrl: 'assets/images/achievements/react-badge.svg',
        category: 'exam',
        status: 'unlocked',
        dateEarned: new Date(2023, 3, 20),
        points: 250,
        certificateUrl: 'assets/certificates/react-master.pdf'
      },
      {
        id: 'ach-4',
        title: '30-Day Streak',
        description: 'Maintained a 30-day continuous learning streak.',
        iconUrl: 'assets/images/achievements/streak-badge.svg',
        category: 'special',
        status: 'unlocked',
        dateEarned: new Date(2023, 1, 10),
        points: 50
      },
      {
        id: 'ach-5',
        title: 'Angular Expert',
        description: 'Mastered Angular framework and associated technologies.',
        iconUrl: 'assets/images/achievements/angular-badge.svg',
        category: 'course',
        status: 'locked',
        points: 200
      },
      {
        id: 'ach-6',
        title: 'Code Challenge Champion',
        description: 'Successfully completed 50 coding challenges.',
        iconUrl: 'assets/images/achievements/challenge-badge.svg',
        category: 'milestone',
        status: 'in-progress',
        progress: 32,
        points: 150
      }
    ];
  }

  loadCertifications(): void {
    // In a real app, this would come from a service
    this.certifications = [
      {
        id: 'cert-1',
        name: 'JavaScript Developer Certificate',
        description: 'Professional certification for JavaScript development skills.',
        issueDate: new Date(2023, 2, 15),
        status: 'active',
        downloadUrl: 'assets/certificates/js-dev.pdf'
      },
      {
        id: 'cert-2',
        name: 'React Framework Expert',
        description: 'Advanced certification for React framework expertise.',
        issueDate: new Date(2023, 3, 20),
        expiryDate: new Date(2025, 3, 20),
        status: 'active',
        downloadUrl: 'assets/certificates/react-expert.pdf'
      },
      {
        id: 'cert-3',
        name: 'Frontend Performance Optimization',
        description: 'Specialized certification for web performance optimization techniques.',
        issueDate: new Date(2022, 10, 5),
        expiryDate: new Date(2023, 5, 15),
        status: 'expired',
        downloadUrl: 'assets/certificates/perf-opt.pdf'
      }
    ];
  }

  loadBadges(): void {
    // In a real app, this would come from a service
    this.badges = [
      {
        id: 'badge-1',
        name: 'JavaScript',
        description: 'Earned by completing JavaScript learning path',
        imageUrl: 'assets/images/badges/javascript.svg',
        earned: true
      },
      {
        id: 'badge-2',
        name: 'React',
        description: 'Awarded for React development proficiency',
        imageUrl: 'assets/images/badges/react.svg',
        earned: true
      },
      {
        id: 'badge-3',
        name: 'Angular',
        description: 'Awarded for Angular development proficiency',
        imageUrl: 'assets/images/badges/angular.svg',
        earned: false
      },
      {
        id: 'badge-4',
        name: 'Node.js',
        description: 'Earned by completing Node.js backend courses',
        imageUrl: 'assets/images/badges/nodejs.svg',
        earned: false
      },
      {
        id: 'badge-5',
        name: 'CSS Master',
        description: 'Awarded for advanced CSS and design skills',
        imageUrl: 'assets/images/badges/css.svg',
        earned: true
      },
      {
        id: 'badge-6',
        name: 'Testing Pro',
        description: 'Awarded for proficiency in test-driven development',
        imageUrl: 'assets/images/badges/testing.svg',
        earned: false
      }
    ];
  }

  calculateAchievementStats(): void {
    this.achievementStats.unlocked = this.achievements.filter(a => a.status === 'unlocked').length;
    this.achievementStats.inProgress = this.achievements.filter(a => a.status === 'in-progress').length;
    this.achievementStats.total = this.achievements.length;
  }

  applyFilters(): void {
    let filtered = [...this.achievements];

    // Apply status filter
    if (this.filters.status !== 'all') {
      filtered = filtered.filter(a => a.status === this.filters.status);
    }

    // Apply category filter
    if (this.filters.category !== 'all') {
      filtered = filtered.filter(a => a.category === this.filters.category);
    }

    // Apply search
    if (this.searchQuery) {
      const search = this.searchQuery.toLowerCase();
      filtered = filtered.filter(a => 
        a.title.toLowerCase().includes(search) || 
        a.description.toLowerCase().includes(search)
      );
    }

    this.filteredAchievements = filtered;
    this.sortAchievements();
  }

  sortAchievements(): void {
    switch (this.sortOption) {
      case 'recent':
        this.filteredAchievements.sort((a, b) => {
          if (a.dateEarned && b.dateEarned) {
            return b.dateEarned.getTime() - a.dateEarned.getTime();
          }
          return a.status === 'unlocked' ? -1 : 1;
        });
        break;
      case 'oldest':
        this.filteredAchievements.sort((a, b) => {
          if (a.dateEarned && b.dateEarned) {
            return a.dateEarned.getTime() - b.dateEarned.getTime();
          }
          return a.status === 'unlocked' ? -1 : 1;
        });
        break;
      case 'points-high':
        this.filteredAchievements.sort((a, b) => b.points - a.points);
        break;
      case 'points-low':
        this.filteredAchievements.sort((a, b) => a.points - b.points);
        break;
    }
  }

  resetFilters(): void {
    this.filters = {
      status: 'all',
      category: 'all'
    };
    this.searchQuery = '';
    this.sortOption = 'recent';
    this.applyFilters();
  }

  getCategoryLabel(category: string): string {
    switch (category) {
      case 'course': return 'Course';
      case 'exam': return 'Exam';
      case 'milestone': return 'Milestone';
      case 'special': return 'Special';
      default: return category;
    }
  }

  shareAchievement(achievement: Achievement, platform: string): void {
    const text = `I earned the "${achievement.title}" achievement on Fundo E-Learning! #learning #achievement`;
    const url = window.location.href;
    
    let shareUrl = '';
    
    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(text)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(achievement.title)}&summary=${encodeURIComponent(text)}`;
        break;
      default:
        return;
    }
    
    // Open share window
    window.open(shareUrl, '_blank', 'width=600,height=400');
  }
  
  // In achievements.component.ts
downloadCertificate(achievement: Achievement): void {
  const url = achievement.certificateUrl;
  // Implement download logic using the URL
  window.open(url, '_blank');
  // Or use other download methods as needed
}
  
  // Helper methods for the template
  getStatusClass(status: string): string {
    switch (status) {
      case 'unlocked': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'locked': return 'bg-gray-100 text-gray-800';
      case 'active': return 'bg-green-100 text-green-800';
      case 'expiring-soon': return 'bg-yellow-100 text-yellow-800';
      case 'expired': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  }
  
  getStatusIcon(status: string): string {
    switch (status) {
      case 'unlocked': return 'check-circle';
      case 'in-progress': return 'clock';
      case 'locked': return 'lock';
      default: return '';
    }
  }
  
  formatDate(date: Date | undefined): string {
    if (!date) return 'N/A';
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  }
}