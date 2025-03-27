import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

interface WishlistItem {
  id: number;
  title: string;
  instructor: string;
  imageUrl: string;
  rating: number;
  price: number;
  addedDate: Date;
}

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent {
  wishlistItems: WishlistItem[] = [];

  removeFromWishlist(itemId: number): void {
    this.wishlistItems = this.wishlistItems.filter(item => item.id !== itemId);
  }

  addToCart(item: WishlistItem): void {
    // Implement cart logic
    this.removeFromWishlist(item.id);
  }
}
