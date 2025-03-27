import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { RouterModule } from '@angular/router';

interface Notification {
  id: number;
  title: string;
  message: string;
  timestamp: string;
  type: 'order' | 'system' | 'inventory' | 'alert';
  isRead: boolean;
}

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [CommonModule,RouterModule, FormsModule],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.scss'
})
export class NotificationsComponent implements OnInit {
  notifications: Notification[] = [
    {
      id: 1,
      title: 'New Order Received',
      message: 'Order #12345 has been placed and requires processing. Customer requested express shipping.',
      timestamp: '2 minutes ago',
      type: 'order',
      isRead: false
    },
    {
      id: 2,
      title: 'Inventory Alert',
      message: 'Product SKU-789 is running low on stock. Current quantity: 5 units',
      timestamp: '1 hour ago',
      type: 'inventory',
      isRead: true
    },
    {
      id: 3,
      title: 'System Update',
      message: 'System maintenance scheduled for tonight at 2:00 AM UTC. Please save your work.',
      timestamp: '3 hours ago',
      type: 'system',
      isRead: true
    },
    {
      id: 4,
      title: 'New Customer Registration',
      message: 'A new business customer has registered and requires approval.',
      timestamp: '5 hours ago',
      type: 'alert',
      isRead: false
    },
    {
      id: 5,
      title: 'Payment Processing Error',
      message: 'Failed to process payment for Order #11234. Action required.',
      timestamp: '1 day ago',
      type: 'order',
      isRead: false
    },
    {
      id: 6,
      title: 'Payment Processing Error',
      message: 'Failed to process payment for Order #11234. Action required.',
      timestamp: '1 day ago',
      type: 'order',
      isRead: true
    },
    {
      id: 7,
      title: 'Payment Processing Error',
      message: 'Failed to process payment for Order #11234. Action required.',
      timestamp: '1 day ago',
      type: 'order',
      isRead: false
    },
    {
      id: 8,
      title: 'Payment Processing Error',
      message: 'Failed to process payment for Order #11234. Action required.',
      timestamp: '1 day ago',
      type: 'order',
      isRead: true
    },
    {
      id: 9,
      title: 'Payment Processing Error',
      message: 'Failed to process payment for Order #11234. Action required.',
      timestamp: '1 day ago',
      type: 'order',
      isRead: true
    },
    {
      id: 10,
      title: 'Payment Processing Error',
      message: 'Failed to process payment for Order #11234. Action required.',
      timestamp: '1 day ago',
      type: 'order',
      isRead: false
    },
    {
      id: 5,
      title: 'Payment Processing Error',
      message: 'Failed to process payment for Order #11234. Action required.',
      timestamp: '1 day ago',
      type: 'order',
      isRead: false
    },
  ];

  selectedFilter: string = 'all';

  constructor() {}

  ngOnInit(): void {}

  get filteredNotifications(): Notification[] {
    switch (this.selectedFilter) {
      case 'unread':
        return this.notifications.filter(n => !n.isRead);
      case 'system':
        return this.notifications.filter(n => n.type === 'system');
      case 'orders':
        return this.notifications.filter(n => n.type === 'order');
      case 'inventory':
        return this.notifications.filter(n => n.type === 'inventory');
      default:
        return this.notifications;
    }
  }

  markAllAsRead(): void {
    this.notifications = this.notifications.map(n => ({
      ...n,
      isRead: true
    }));
  }

  clearAll(): void {
    this.notifications = [];
  }

  deleteNotification(id: number): void {
    this.notifications = this.notifications.filter(n => n.id !== id);
  }

  markAsRead(id: number): void {
    this.notifications = this.notifications.map(n => 
      n.id === id ? { ...n, isRead: true } : n
    );
  }

  onFilterChange(event: any): void {
    this.selectedFilter = event.target.value;
  }

  refreshData(): void {
    // Here you would typically fetch fresh notifications from your backend
    // For now, we'll just simulate a refresh by re-assigning the notifications array
    this.notifications = [...this.notifications];
  }
}
