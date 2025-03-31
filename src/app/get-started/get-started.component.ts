import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-get-started',
  standalone: true,
  imports: [],
  templateUrl: './get-started.component.html',
  styleUrl: './get-started.component.scss'
})
export class GetStartedComponent {

  private router = inject(Router);

  navigateTo(route: string) {
    this.router.navigate([`/${route}`]);
  }
}

