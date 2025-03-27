import { Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { DashbaordComponent } from './features/dashbaord/dashbaord.component';
import { HomeComponent } from './features/home/home.component';
import { AdminDashboardComponent } from './admi/admin-dashboard/admin-dashboard.component';
import { VideoPlayerComponent } from './shared/components/video-palyer/video-player.component';
import { VideoOutputComponent } from './features/video-output/video-output.component';
import { NotificationsComponent } from './features/notifications/notifications.component';
import { WishlistComponent } from './features/wishlist/wishlist.component';
import { CategoryCoursesComponent } from './features/courses/category-courses/category-courses.component';

export const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'sign-up',
    component: SignUpComponent
  },
  {
    path: 'dashboard',
    component: DashbaordComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      { 
        path: 'courses/category/:id', 
        component: CategoryCoursesComponent 
      },
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'admin-dashboard',
        component: AdminDashboardComponent
      },
      {
        path: 'notifications',
        component: NotificationsComponent
      },
      {
        path: 'wishlist',
        component: WishlistComponent
      },
      {
        path: 'course/:id',
        component: VideoOutputComponent
      },
      {
        path: 'teach',
        loadComponent: () => import('./features/teach/teach.component').then(m => m.TeachComponent)
      }
    ]
  },
  {
    path: 'video-player',
    component: VideoPlayerComponent
  },
  // Redirect standalone routes to their dashboard equivalents
  {
    path: 'home',
    redirectTo: 'dashboard/home',
    pathMatch: 'full'
  },
  {
    path: 'admin-dashboard',
    redirectTo: 'dashboard/admin-dashboard',
    pathMatch: 'full'
  },
  {
    path: 'course/:id',
    redirectTo: 'dashboard/course/:id',
    pathMatch: 'prefix'
  }
];
