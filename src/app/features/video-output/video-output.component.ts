import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PlayerComponent } from './player/player.component';

interface Course {
  id: number;
  title: string;
  instructor: string;
  imageUrl: string;
  rating: number;
  price: number;
  participants: number;
}

interface Section {
  id: number;
  title: string;
  modules: Module[];
  isExpanded: boolean;
}

interface Module {
  id: number;
  title: string;
  duration: string;
  isCompleted: boolean;
}

interface Tab {
  id: string;
  name: string;
}

interface Review {
  id: number;
  name: string;
  email: string;
  userImage: string;
  rating: number;
  comment: string;
  likes: number;
  dislikes: number;
}

@Component({
  selector: 'app-video-output',
  standalone: true,
  imports: [CommonModule, RouterModule,PlayerComponent],
  templateUrl: './video-output.component.html',
  styleUrl: './video-output.component.scss'
})
export class VideoOutputComponent implements OnInit {
  @ViewChild('Player') videoPlayer!: ElementRef<HTMLVideoElement>;

  courseId: number | null = null;
  course: Course | null = null;
  activeTab: string = 'details';
  selectedFilter: string = 'All Reviews';
  reviewFilters: string[] = ['All Reviews', 'High Rated', 'Recent', 'Most Helpful'];
  reviews: Review[] = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      userImage: 'https://i.pravatar.cc/150?img=1',
      rating: 5,
      comment: 'Excellent course! The instructor explains complex concepts in a very clear and engaging way.',
      likes: 12,
      dislikes: 0
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      userImage: 'https://i.pravatar.cc/150?img=2',
      rating: 4,
      comment: 'Great content and well-structured. Would recommend to anyone interested in this subject.',
      likes: 8,
      dislikes: 1
    },
    {
      id: 3,
      name: 'Mike Johnson',
      email: 'mike.j@example.com',
      userImage: 'https://i.pravatar.cc/150?img=3',
      rating: 5,
      comment: 'The practical examples really helped me understand the concepts better.',
      likes: 15,
      dislikes: 0
    },
    {
      id: 4,
      name: 'Sarah Wilson',
      email: 'sarah.w@example.com',
      userImage: 'https://i.pravatar.cc/150?img=4',
      rating: 4,
      comment: 'Good course overall, but some sections could use more detailed explanations.',
      likes: 6,
      dislikes: 2
    },
    {
      id: 5,
      name: 'David Brown',
      email: 'david.b@example.com',
      userImage: 'https://i.pravatar.cc/150?img=5',
      rating: 5,
      comment: 'The course materials are well-organized and easy to follow.',
      likes: 10,
      dislikes: 0
    },
    {
      id: 6,
      name: 'Emma Davis',
      email: 'emma.d@example.com',
      userImage: 'https://i.pravatar.cc/150?img=6',
      rating: 4,
      comment: 'Great instructor and engaging content. Learned a lot!',
      likes: 9,
      dislikes: 1
    },
    {
      id: 7,
      name: 'Alex Turner',
      email: 'alex.t@example.com',
      userImage: 'https://i.pravatar.cc/150?img=7',
      rating: 5,
      comment: 'The course exceeded my expectations. Very comprehensive and well-taught.',
      likes: 14,
      dislikes: 0
    },
    {
      id: 8,
      name: 'Lisa Anderson',
      email: 'lisa.a@example.com',
      userImage: 'https://i.pravatar.cc/150?img=8',
      rating: 4,
      comment: 'Good course for beginners. The pace is just right.',
      likes: 7,
      dislikes: 1
    }
  ];
  tabs: Tab[] = [
    { id: 'details', name: 'Course Details' },
    { id: 'ratings', name: 'Ratings' },
    { id: 'notes', name: 'Notes' }
  ];
  sections: Section[] = [
    {
      id: 1,
      title: 'Section 1: Introduction',
      isExpanded: false,
      modules: [
        { id: 1, title: 'Module 1: Introduction to Pure Mathematics', duration: '15:00', isCompleted: true },
        { id: 2, title: 'Module 2: Basic Concepts and Definitions', duration: '20:00', isCompleted: true },
        { id: 3, title: 'Module 3: Fundamental Principles', duration: '25:00', isCompleted: false }
      ]
    },
    {
      id: 2,
      title: 'Section 2: Core Concepts',
      isExpanded: false,
      modules: [
        { id: 4, title: 'Module 4: Advanced Topics', duration: '30:00', isCompleted: false },
        { id: 5, title: 'Module 5: Practical Applications', duration: '35:00', isCompleted: false }
      ]
    },
    {
      id: 3,
      title: 'Section 3: Advanced Topics',
      isExpanded: false,
      modules: [
        { id: 6, title: 'Module 6: Complex Theories', duration: '40:00', isCompleted: false },
        { id: 7, title: 'Module 7: Case Studies', duration: '45:00', isCompleted: false }
      ]
    }
  ];

  // Video player state
  isExtended: boolean = false;
  currentVideoUrl: string = 'assets/videos/sample.mp4';
  currentModuleIndex: number = 0;
  currentSectionIndex: number = 0;
  videoProgress: number = 0;
  selectedSectionId: number | null = null;
  selectedModuleId: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.courseId = Number(this.route.snapshot.paramMap.get('id'));
    // For testing, populate with dummy data
    this.course = {
      id: this.courseId,
      title: 'Advanced Mathematics Course',
      instructor: 'Dr. Sarah Johnson',
      imageUrl: 'https://example.com/course-image.jpg',
      rating: 4.8,
      price: 99.99,
      participants: 1234
    };
  }

  goBack(): void {
    this.router.navigate(['/home']);
  }

  toggleSection(sectionId: number): void {
    const section = this.sections.find(s => s.id === sectionId);
    if (section) {
      section.isExpanded = !section.isExpanded;
    }
  }

  selectTab(tabId: string): void {
    this.activeTab = tabId;
  }

  selectReviewFilter(filter: string): void {
    this.selectedFilter = filter;
    // Here you would typically filter the reviews based on the selected filter
    // For now, we'll just update the selected filter
  }

  onVideoEnded(): void {
    // Video will just end without auto-playing next
  }

  onTimeUpdate(): void {
    if (this.videoPlayer) {
      const video = this.videoPlayer.nativeElement;
      this.videoProgress = (video.currentTime / video.duration) * 100;
    }
  }

  toggleExtended(): void {
    this.isExtended = !this.isExtended;
  }
  adjustPlaybackSpeed(speed: number): void {
    if (this.videoPlayer) {
      this.videoPlayer.nativeElement.playbackRate = speed;
    }
  }
  nextVideo(): void {
    if (this.currentModuleIndex < this.sections[this.currentSectionIndex].modules.length - 1) {
      this.currentModuleIndex++;
      this.loadCurrentVideo();
    } else if (this.currentSectionIndex < this.sections.length - 1) {
      this.currentSectionIndex++;
      this.currentModuleIndex = 0;
      this.loadCurrentVideo();
    }
  }
  adjustVolume(volume: number): void {
    if (this.videoPlayer) {
      this.videoPlayer.nativeElement.volume = volume;
    }
  }
  toggleFullscreen(): void {
    if (this.videoPlayer) {
      this.videoPlayer.nativeElement.requestFullscreen();
    }
  }
  adjustProgress(progress: number): void {
    if (this.videoPlayer) {
      const video = this.videoPlayer.nativeElement;
      video.currentTime = (progress / 100) * video.duration;
    }
  }
  adjustPlaybackRate(rate: number): void {
    if (this.videoPlayer) {
      this.videoPlayer.nativeElement.playbackRate = rate;
    }
  }
  

  onVideoLoaded(): void {
    if (this.videoPlayer) {
      const video = this.videoPlayer.nativeElement;
      // You can add additional initialization here
    }
  }

  previousVideo(): void {
    if (this.currentModuleIndex > 0) {
      this.currentModuleIndex--;
      this.loadCurrentVideo();
    } else if (this.currentSectionIndex > 0) {
      this.currentSectionIndex--;
      this.currentModuleIndex = this.sections[this.currentSectionIndex].modules.length - 1;
      this.loadCurrentVideo();
    }
  }

  private loadCurrentVideo(): void {
    // For now, we'll use the same video for all modules
    // In a real application, you would load different videos based on the module
    this.currentVideoUrl = 'assets/videos/sample.mp4';
    if (this.videoPlayer) {
      this.videoPlayer.nativeElement.load();
      this.videoPlayer.nativeElement.play();
    }
  }

  // Add method to get completion stats
  getCompletionStats() {
    let completed = 0;
    let total = 0;
    
    this.sections.forEach(section => {
      section.modules.forEach(module => {
        total++;
        if (module.isCompleted) completed++;
      });
    });
    
    return { completed, total };
  }

  // Add method to handle selection
  selectModule(sectionId: number, moduleId: number) {
    this.selectedSectionId = sectionId;
    this.selectedModuleId = moduleId;
  }
}
