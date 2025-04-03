import { Component, ViewChildren, QueryList, ElementRef, AfterViewInit, Renderer2, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { trigger, transition, style, animate } from '@angular/animations';

interface Badge {
  type: string;
  label: string;
}

@Component({
  selector: 'app-user-account-settings',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-account-settings.component.html',
  animations: [
    trigger('tabAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(10px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class UserAccountSettingsComponent implements AfterViewInit {
  @ViewChildren('tabButton') tabButtons!: QueryList<ElementRef>;

 // Mock user data
 user = {
  username: 'johndoe',
  firstName: 'John',
  lastName: 'Doe',
  email: 'john@example.com',
  phone: '+1234567890',
  profileImage: '',
  createdAt: new Date('2024-01-01'),
  verified: true,
  emailVerified: true,
  phoneVerified: false,
  twoFactorEnabled: false,
  lastLogin: new Date(),
  gender: 'Male', // Added gender
  title: 'Software Engineer', // Added title
  badges: [
    { type: 'bronze', label: 'Bronze Learner' },
    { type: 'silver', label: 'Silver Achiever' },
    { type: 'gold', label: 'Gold Star' },
    { type: 'blue', label: 'Team Player' },
    { type: 'green', label: 'Eco-Friendly' },
    { type: 'purple', label: 'Creative Thinker' },
  ] as Badge[]
};

  // Form groups
  profileForm!: FormGroup;
  securityForm!: FormGroup;
  privacyForm!: FormGroup;

  // Active tab management
  activeTab: string = 'profile';
  activeTabIndex: number = 0;
  indicatorStyle: any = { left: '0', width: '0' };
  saving: boolean = false;

  // Tab definitions
  tabs = [
    { id: 'profile', label: 'Profile Info' },
    { id: 'security', label: 'Security' },
    { id: 'privacy', label: 'Privacy' }
  ];

  constructor(private renderer: Renderer2, private fb: FormBuilder) {
    this.initializeForms();
  }

  // Computed properties
  get accountAge(): number {
    const createdDate = new Date(this.user.createdAt);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - createdDate.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  private initializeForms() {
    this.profileForm = this.fb.group({
      basicInfo: this.fb.group({
        firstName: [this.user.firstName, Validators.required],
        lastName: [this.user.lastName, Validators.required],
        displayName: [this.user.username],
        email: [this.user.email, [Validators.required, Validators.email]],
        phone: [this.user.phone],
        dateOfBirth: [''],
        gender: ['']
      }),
      professionalInfo: this.fb.group({
        title: [''],
        bio: [''],
        expertise: [[]],
        occupation: [''],
        organization: ['']
      }),
      education: this.fb.group({
        institution: [''],
        degree: [''],
        fieldOfStudy: [''],
        graduationYear: ['']
      }),
      socialLinks: this.fb.group({
        linkedin: [''],
        twitter: [''],
        github: [''],
        website: ['']
      }),
      preferences: this.fb.group({
        language: ['en'],
        timezone: ['UTC'],
        learningGoals: [[]],
        communicationPreferences: this.fb.group({
          emailUpdates: [true],
          courseNotifications: [true],
          marketingEmails: [false]
        })
      })
    });

    this.securityForm = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required]
    }, {
      validators: this.passwordMatchValidator
    });

    this.privacyForm = this.fb.group({
      profileVisibility: ['public'],
      activityVisibility: ['friends'],
      searchable: [true],
      showOnlineStatus: [true],
      showLearningProgress: [true]
    });
  }

  private passwordMatchValidator(g: FormGroup) {
    return g.get('newPassword')?.value === g.get('confirmPassword')?.value
      ? null : { mismatch: true };
  }

  @HostListener('window:resize')
  onResize() {
    setTimeout(() => this.updateIndicator(this.activeTabIndex), 0);
  }

  ngAfterViewInit() {
    setTimeout(() => this.updateIndicator(0), 0);
  }

  // Image handling methods
  openImageUploader() {
    const imageInput = document.querySelector('#imageInput') as HTMLInputElement;
    if (imageInput) {
      imageInput.click();
    }
  }

  onImageSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      // Handle image upload
      console.log('Image selected:', file);
    }
  }

  // Security methods
  openPasswordChange() {
    // Implement password change modal logic
    console.log('Opening password change modal');
  }

  toggleTwoFactorAuth() {
    this.user.twoFactorEnabled = !this.user.twoFactorEnabled;
    console.log('2FA Toggled:', this.user.twoFactorEnabled);
  }

  // Phone verification
  verifyPhone() {
    // Implement phone verification logic
    console.log('Verifying phone number:', this.profileForm.get('basicInfo.phone')?.value);
  }

  setActiveTab(tab: string, index: number): void {
    this.activeTab = tab;
    this.activeTabIndex = index;
    this.updateIndicator(index);
  }

  updateIndicator(index: number): void {
    const buttons = this.tabButtons.toArray();
    if (buttons && buttons.length > index) {
      const activeButton = buttons[index].nativeElement;
      const buttonRect = activeButton.getBoundingClientRect();
      
      const tabContainer = activeButton.closest('.tabs-container');
      if (!tabContainer) return;
      
      const containerRect = tabContainer.getBoundingClientRect();
      const width = buttonRect.width * 0.7;
      const left = buttonRect.left - containerRect.left + (buttonRect.width - width) / 2;
      
      this.indicatorStyle = {
        left: `${left}px`,
        width: `${width}px`
      };
    }
  }

  // Form submission handlers
  async saveProfile() {
    if (this.profileForm.valid) {
      this.saving = true;
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log('Profile data:', this.profileForm.value);
      } finally {
        this.saving = false;
      }
    }
  }

  saveSecuritySettings() {
    if (this.securityForm.valid) {
      console.log('Security data:', this.securityForm.value);
    }
  }

  getBadgeClass(badgeType: string): string {
    switch (badgeType) {
      case 'bronze':
        return 'bg-yellow-200 text-yellow-800';
      case 'silver':
        return 'bg-gray-200 text-gray-800';
      case 'gold':
        return 'bg-yellow-400 text-yellow-900';
      case 'blue':
        return 'bg-blue-200 text-blue-800';
      case 'green':
        return 'bg-green-200 text-green-800';
      case 'purple':
        return 'bg-purple-200 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  }

  savePrivacySettings() {
    if (this.privacyForm.valid) {
      console.log('Privacy data:', this.privacyForm.value);
    }
  }

  resetForm() {
    switch (this.activeTab) {
      case 'profile':
        this.profileForm.reset();
        break;
      case 'security':
        this.securityForm.reset();
        break;
      case 'privacy':
        this.privacyForm.reset();
        break;
    }
  }
}
