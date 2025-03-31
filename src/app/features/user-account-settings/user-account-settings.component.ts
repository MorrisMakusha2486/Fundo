// user-account-settings.component.ts
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { FormsModule } from '@angular/forms';

interface Address {
  street?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
}

interface User {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  emailVerified: boolean;
  phoneVerified: boolean;
  verified: boolean;
  profileImage?: string;
  createdAt: Date;
  lastLogin: Date;
  twoFactorEnabled: boolean;
  dateOfBirth: Date | null;
  gender?: string;
  address?: Address;
}

interface NotificationOption {
  id: string;
  title: string;
  description: string;
  channels: string[];
  emailEnabled: boolean;
  pushEnabled?: boolean;
  smsEnabled?: boolean;
}

interface NotificationCategory {
  id?: string;
  title: string;
  options: NotificationOption[];
}

interface Device {
  id: number;
  name: string;
  type: 'desktop' | 'mobile' | 'tablet';
  lastActive: Date;
  location: string;
  current: boolean;
}

interface PrivacySettings {
  publicProfile: boolean;
  showLearningActivity: boolean;
  onlineStatus: boolean;
  personalization: boolean;
  analytics: boolean;
}

@Component({
  selector: 'app-user-account-settings',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './user-account-settings.component.html'
})
export class UserAccountSettingsComponent implements OnInit {
  @ViewChild('imageInput') imageInput!: ElementRef;
  
  // User data
  user: User = {
    username: 'johndoe',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    emailVerified: true,
    phoneVerified: false,
    verified: true,
    profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    createdAt: new Date(2022, 5, 15),
    lastLogin: new Date(2023, 4, 20, 14, 30),
    twoFactorEnabled: false,
    dateOfBirth: new Date(1992, 3, 12),
    gender: 'male',
    address: {
      street: '123 Main Street',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94105',
      country: 'United States'
    }
  };
  
  // Forms
  profileForm!: FormGroup;
  passwordForm!: FormGroup;
  deleteAccountForm!: FormGroup;
  phoneVerificationForm!: FormGroup;
  
  // UI state
  activeTab: string = 'profile';
  saving: boolean = false;
  showPasswordModal: boolean = false;
  showDeleteModal: boolean = false;
  showPhoneVerificationModal: boolean = false;
  deleteError: string = '';
  verificationError: string = '';
  resendCodeTimer: number = 0;
  showToast: boolean = false;
  toastMessage: string = '';
  accountAge: number = 0;
  
  // Settings and preferences
  privacySettings: PrivacySettings = {
    publicProfile: true,
    showLearningActivity: true,
    onlineStatus: true,
    personalization: true,
    analytics: true
  };
  
  // Tabs configuration
  tabs = [
    { id: 'profile', label: 'Profile' },
    { id: 'security', label: 'Security' },
    { id: 'notifications', label: 'Notifications' },
    { id: 'privacy', label: 'Privacy & Data' }
  ];
  
  // Sample data
  countries: string[] = ['United States', 'Canada', 'United Kingdom', 'Australia', 'Germany', 'France', 'Japan', 'India', 'Brazil', 'Mexico'];
  
  connectedDevices: Device[] = [
    {
      id: 1,
      name: 'Windows PC - Chrome',
      type: 'desktop',
      lastActive: new Date(2023, 4, 20, 14, 30),
      location: 'San Francisco, USA',
      current: true
    },
    {
      id: 2,
      name: 'iPhone 13',
      type: 'mobile',
      lastActive: new Date(2023, 4, 19, 9, 15),
      location: 'San Francisco, USA',
      current: false
    },
    {
      id: 3,
      name: 'MacBook Pro',
      type: 'desktop',
      lastActive: new Date(2023, 4, 18, 16, 45),
      location: 'New York, USA',
      current: false
    }
  ];
  
  notificationCategories: NotificationCategory[] = [
    {
      id: 'course-updates',
      title: 'Course Updates',
      options: [
        {
          id: 'course_updates',
          title: 'New content in enrolled courses',
          description: "Get notified when new lectures or materials are added to courses you're enrolled in",
          channels: ['email', 'push'],
          emailEnabled: true,
          pushEnabled: true
        },
        {
          id: 'course_announcements',
          title: 'Instructor announcements',
          description: 'Receive important announcements from course instructors',
          channels: ['email', 'push', 'sms'],
          emailEnabled: true,
          pushEnabled: true,
          smsEnabled: false
        }
      ]
    },
    {
      id: 'account-activity',
      title: 'Account Activity',
      options: [
        {
          id: 'security_alerts',
          title: 'Security alerts',
          description: 'Get notified about important security events like password changes or login attempts',
          channels: ['email', 'sms'],
          emailEnabled: true,
          smsEnabled: true
        },
        {
          id: 'successful_purchase',
          title: 'Purchase confirmations',
          description: 'Receive confirmation when you purchase a course or subscription',
          channels: ['email'],
          emailEnabled: true
        }
      ]
    },
    {
      id: 'reminders-recommendations',
      title: 'Reminders & Recommendations',
      options: [
        {
          id: 'learning_reminders',
          title: 'Learning reminders',
          description: 'Receive nudges to continue learning and stay on track',
          channels: ['email', 'push'],
          emailEnabled: true,
          pushEnabled: false
        },
        {
          id: 'recommendations',
          title: 'Course recommendations',
          description: 'Get personalized course recommendations based on your interests',
          channels: ['email', 'push'],
          emailEnabled: true,
          pushEnabled: false
        }
      ]
    }
  ];
saveNotificationSettings: any;
onVerificationCodeInput: any;
confirmPhoneVerification: any;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initForms();
    this.calculateAccountAge();
  }

  initForms(): void {
    // Profile form
    this.profileForm = this.fb.group({
      firstName: [this.user.firstName, [Validators.required]],
      lastName: [this.user.lastName, [Validators.required]],
      email: [this.user.email, [Validators.required, Validators.email]],
      phone: [this.user.phone],
      dateOfBirth: [this.formatDateForInput(this.user.dateOfBirth)],
      gender: [this.user.gender],
      street: [this.user.address?.street],
      city: [this.user.address?.city],
      state: [this.user.address?.state],
      zipCode: [this.user.address?.zipCode],
      country: [this.user.address?.country]
    });
    
    // Password form
    this.passwordForm = this.fb.group({
      currentPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator });
    
    // Delete account form
    this.deleteAccountForm = this.fb.group({
      password: ['', [Validators.required]],
      confirmation: [false, [Validators.requiredTrue]]
    });
    
    // Phone verification form
    this.phoneVerificationForm = this.fb.group({
      verificationCode: ['', [Validators.required, Validators.pattern('^[0-9]{6}$')]]
    });
  }

  // Password validation
  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const newPassword = control.get('newPassword');
    const confirmPassword = control.get('confirmPassword');
    
    if (newPassword && confirmPassword && newPassword.value !== confirmPassword.value) {
      return { passwordMismatch: true };
    }
    
    return null;
  }

  // Helper to format date for input field
  formatDateForInput(date: Date | null): string {
    if (!date) return '';
    
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();
    
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    
    return [year, month, day].join('-');
  }

  // Calculate account age in days
  calculateAccountAge(): void {
    const createdDate = new Date(this.user.createdAt);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - createdDate.getTime());
    this.accountAge = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  // Profile image handling
  openImageUploader(): void {
    this.imageInput.nativeElement.click();
  }

  onImageSelected(event: Event): void {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0];
    
    if (file) {
      // In a real app, you would upload this file to a server
      // For now, we'll just create a local URL
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          this.user.profileImage = reader.result.toString();
          this.showToastMessage('Profile image updated successfully');
        }
      };
      reader.readAsDataURL(file);
    }
  }

  // Form actions
  saveProfile(): void {
    if (this.profileForm.valid) {
      this.saving = true;
      
      // In a real app, this would be an API call
      setTimeout(() => {
        const formValues = this.profileForm.value;
        
        // Update user object with form values
        this.user = {
          ...this.user,
          firstName: formValues.firstName,
          lastName: formValues.lastName,
          email: formValues.email,
          phone: formValues.phone,
          dateOfBirth: formValues.dateOfBirth ? new Date(formValues.dateOfBirth) : null,
          gender: formValues.gender,
          address: {
            street: formValues.street,
            city: formValues.city,
            state: formValues.state,
            zipCode: formValues.zipCode,
            country: formValues.country
          }
        };
        
        this.saving = false;
        this.showToastMessage('Profile updated successfully');
      }, 1000);
    }
  }

  resetForm(): void {
    this.initForms();
  }

  // Password management
  openPasswordChange(): void {
    this.passwordForm.reset();
    this.showPasswordModal = true;
  }

  closePasswordModal(): void {
    this.showPasswordModal = false;
  }

  changePassword(): void {
    if (this.passwordForm.valid) {
      // In a real app, this would be an API call
      setTimeout(() => {
        this.showPasswordModal = false;
        this.showToastMessage('Password updated successfully');
      }, 1000);
    }
  }

  // Two-factor authentication
  toggleTwoFactorAuth(): void {
    // In a real app, this would involve more steps like verification
    this.user.twoFactorEnabled = !this.user.twoFactorEnabled;
    this.showToastMessage(
      this.user.twoFactorEnabled ? 
        'Two-factor authentication enabled' : 
        'Two-factor authentication disabled'
    );
  }

  // Phone verification
  initiatePhoneVerification(): void {
    // Reset verification form
    this.phoneVerificationForm.reset();
    this.verificationError = '';
    this.showPhoneVerificationModal = true;
    
    // Start resend timer
    this.resendCodeTimer = 60;
    this.startResendTimer();
    
    // In a real app, this would trigger an API call to send the code
    this.showToastMessage('Verification code sent to your phone');
  }

  closePhoneVerificationModal(): void {
    this.showPhoneVerificationModal = false;
    this.resendCodeTimer = 0;
  }

  verifyPhone(): void {
    if (this.phoneVerificationForm.valid) {
      // In a real app, this would verify the code with the backend
      const code = this.phoneVerificationForm.value.verificationCode;
      
      // Simple demo validation - in a real app this would check against the server
      if (code === '123456') {
        this.user.phoneVerified = true;
        this.closePhoneVerificationModal();
        this.showToastMessage('Phone number verified successfully');
      } else {
        this.verificationError = 'Invalid verification code';
      }
    }
  }

  resendVerificationCode(): void {
    if (this.resendCodeTimer === 0) {
      // In a real app, this would trigger an API call to resend the code
      this.resendCodeTimer = 60;
      this.startResendTimer();
      this.showToastMessage('New verification code sent');
    }
  }

  startResendTimer(): void {
    const timer = setInterval(() => {
      this.resendCodeTimer--;
      if (this.resendCodeTimer <= 0) {
        clearInterval(timer);
      }
    }, 1000);
  }

  // Device management
  logoutDevice(deviceId: number): void {
    // In a real app, this would revoke the session on the server
    this.connectedDevices = this.connectedDevices.filter(device => device.id !== deviceId);
    this.showToastMessage('Device logged out successfully');
  }

  toggleNotification(optionId: string, channel: string): void {
    // Find the option in all categories
    for (const category of this.notificationCategories) {
      for (const option of category.options) {
        if (option.id === optionId) {
          // Use type-safe approach with explicit property checks
          switch(channel) {
            case 'email':
              option.emailEnabled = !option.emailEnabled;
              break;
            case 'push':
              if (option.pushEnabled !== undefined) {
                option.pushEnabled = !option.pushEnabled;
              } else {
                option.pushEnabled = true;
              }
              break;
            case 'sms':
              if (option.smsEnabled !== undefined) {
                option.smsEnabled = !option.smsEnabled;
              } else {
                option.smsEnabled = true;
              }
              break;
          }
          
          this.showToastMessage('Notification preferences updated');
          return;
        }
      }
    }
  }

  // Delete account
  openDeleteAccountModal(): void {
    this.deleteAccountForm.reset();
    this.deleteError = '';
    this.showDeleteModal = true;
  }

  closeDeleteModal(): void {
    this.showDeleteModal = false;
  }

  confirmDeleteAccount(): void {
    if (this.deleteAccountForm.valid) {
      // In a real app, this would verify the password and delete the account
      const password = this.deleteAccountForm.value.password;
      
      // Simple demo validation - in a real app this would verify with the server
      if (password === 'password') {
        // Account deletion success
        this.showDeleteModal = false;
        
        // Navigate to logout or homepage
        // this.router.navigate(['/logout']);
        
        this.showToastMessage('Your account has been deleted');
      } else {
        this.deleteError = 'Password is incorrect';
      }
    }
  }

  // For backwards compatibility with HTML template
  deleteAccount(): void {
    this.confirmDeleteAccount();
  }

  // Tab navigation
  setActiveTab(tabId: string): void {
    this.activeTab = tabId;
  }

  // Toast message
  showToastMessage(message: string): void {
    this.toastMessage = message;
    this.showToast = true;
    
    setTimeout(() => {
      this.showToast = false;
    }, 3000);
  }

  // Save privacy settings
  savePrivacySettings(): void {
    // In a real app, this would update the settings on the server
    this.showToastMessage('Privacy settings updated successfully');
  }

  // Download personal data
  downloadPersonalData(): void {
    // In a real app, this would trigger a data export job
    this.showToastMessage('Your data export has been requested. You will be notified when it is ready to download.');
  }

  // Get device icon
  getDeviceIcon(deviceType: string): string {
    switch(deviceType) {
      case 'mobile':
        return 'smartphone';
      case 'tablet':
        return 'tablet';
      case 'desktop':
      default:
        return 'desktop';
    }
  }

  // Format relative time
  formatRelativeTime(date: Date): string {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.round(diffMs / (1000 * 60));
    const diffHours = Math.round(diffMins / 60);
    const diffDays = Math.round(diffHours / 24);
    
    if (diffMins < 60) {
      return `${diffMins} minute${diffMins !== 1 ? 's' : ''} ago`;
    } else if (diffHours < 24) {
      return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
    } else {
      return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
    }
  }

  // Check for form dirty state
  get formIsDirty(): boolean {
    return this.profileForm.dirty;
  }

  // Confirm navigation if form is dirty
  canDeactivate(): boolean | Promise<boolean> {
    if (this.formIsDirty) {
      return confirm('You have unsaved changes. Are you sure you want to leave?');
    }
    return true;
  }
}