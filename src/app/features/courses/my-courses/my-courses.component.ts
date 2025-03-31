import { Component, ViewChildren, QueryList, ElementRef, AfterViewInit, Renderer2, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyLibraryComponent } from './my-library/my-library.component';
import { BookmarkedComponent } from './bookmarked/bookmarked.component';
import { MyScheduleComponent } from './my-schedule/my-schedule.component';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-my-courses',
  standalone: true,
  imports: [
    CommonModule,
    MyLibraryComponent,
    BookmarkedComponent,
    MyScheduleComponent,
  ],
  templateUrl: './my-courses.component.html',
  styleUrl: './my-courses.component.scss',
  animations: [
    trigger('tabAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(10px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class MyCoursesComponent implements AfterViewInit {
  // Query for tab buttons to get their dimensions
  @ViewChildren('tabButton') tabButtons!: QueryList<ElementRef>;
  
  // Default active tab
  activeTab: string = 'library';
  activeTabIndex: number = 0;
  
  // Indicator style object
  indicatorStyle: any = { 
    left: '0', 
    width: '0'
  };

  // Tab options
  tabs = [
    { id: 'library', label: 'My Library' },
    { id: 'bookmarked', label: 'Bookmarked' },
    { id: 'wishlist', label: 'Wishlist' },
    { id: 'schedule', label: 'My Schedule' }
  ];
  
  constructor(private renderer: Renderer2) {}

  @HostListener('window:resize')
  onResize() {
    // Update indicator on window resize
    setTimeout(() => {
      this.updateIndicator(this.activeTabIndex);
    }, 0);
  }
  
  ngAfterViewInit() {
    // Set initial position after view is initialized
    setTimeout(() => {
      this.updateIndicator(0);
    }, 0);
  }
  
  // Method to change active tab with animation
  setActiveTab(tab: string, index: number): void {
    this.activeTab = tab;
    this.activeTabIndex = index;
    this.updateIndicator(index);
  }
  
  // Fixed update indicator method for centered tabs
  updateIndicator(index: number): void {
    const buttons = this.tabButtons.toArray();
    if (buttons && buttons.length > index) {
      const activeButton = buttons[index].nativeElement;
      const buttonRect = activeButton.getBoundingClientRect();
      
      // Get the tab container element
      const tabContainer = activeButton.closest('.tabs-container');
      if (!tabContainer) return;
      
      const containerRect = tabContainer.getBoundingClientRect();
      
      // Calculate width (70% of button width)
      const width = buttonRect.width * 0.7;
      
      // Calculate the position relative to the container
      // This ensures it works correctly with centered tabs
      const left = buttonRect.left - containerRect.left + (buttonRect.width - width) / 2;
      
      this.indicatorStyle = {
        left: `${left}px`,
        width: `${width}px`
      };
    }
  }
}