// filepath: /c:/Users/PC/Documents/projects/angular/fundo-elearning/src/app/app.routes.ts
import { Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { DashbaordComponent } from './features/dashbaord/dashbaord.component';
import { HomeComponent } from './features/home/home.component';
import { AdminDashboardComponent } from './admi/admin-dashboard/admin-dashboard.component';
import { VideoOutputComponent } from './features/video-output/video-output.component';
import { NotificationsComponent } from './features/notifications/notifications.component';
import { WishlistComponent } from './features/wishlist/wishlist.component';
import { CategoryCoursesComponent } from './features/courses/category-courses/category-courses.component';
import { MyCoursesComponent } from './features/courses/my-courses/my-courses.component';
import { MyLibraryComponent } from './features/courses/my-courses/my-library/my-library.component';
import { BookmarkedComponent } from './features/courses/my-courses/bookmarked/bookmarked.component';
import { MyScheduleComponent } from './features/courses/my-courses/my-schedule/my-schedule.component';
import { GetStartedComponent } from './get-started/get-started.component';
import { AchievementsComponent } from './features/achievements/achievements.component';
import { UserAccountSettingsComponent } from './features/user-account-settings/user-account-settings.component';
import { HelpAndSupportComponent } from './features/help-and-support/help-and-support.component';
import { SubscriptionsComponent } from './features/subscriptions/subscriptions.component';
import { MyCartComponent } from './features/my-cart/my-cart.component';
import { PlayerComponent } from './features/video-output/player/player.component';
import { CourseDetailsComponent } from './features/courses/course-details/course-details.component';
import { VideoOutputSheqigComponent } from './video-output-sheqig/video-output-sheqig.component';
import { UserManagementSheqigComponent } from './user-management-sheqig/user-management-sheqig.component';
import { UserListComponent } from './user-management-sheqig/user-list/user-list.component';

export const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent
  },
  {
    path: 'get-started',
    component: GetStartedComponent
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
        path: 'user-account-settings',
        component: UserAccountSettingsComponent
      },
      {
        path: 'achievements',
        component: AchievementsComponent
      },
      {
        path: 'help-and-support',
        component: HelpAndSupportComponent
      },
      {
        path: 'my-cart',
        component: MyCartComponent
      },
      {
        path: 'subscriptions',
        component: SubscriptionsComponent
      },
      
      {
        path: 'user-list',
        component: UserListComponent,
      },
      {
        path: 'my-courses',
        component: MyCoursesComponent,
      },
      {
        path: 'my-library',
        component: MyLibraryComponent
      },
      {
        path: 'user-management-sheqig',
        component: UserManagementSheqigComponent
      },
      {
        path: 'bookmarked',
        component: BookmarkedComponent 
      },
      
      {
        path: 'my-schedule',
        component: MyScheduleComponent
      },
      {
        path: 'video-output-sheqig',
        component: VideoOutputSheqigComponent
      },
      {
        path: 'wishlist',
        component: WishlistComponent
      },
      {
        path: 'player',
        component: PlayerComponent
      },
      {
        path: 'course/:id',
        component: VideoOutputComponent
      },
      {
        path: 'course-details/:id',
        component: CourseDetailsComponent
      },
      {
        path: 'teach',
        loadComponent: () => import('./features/teach/teach.component').then(m => m.TeachComponent)
      }
    ]
  },
  {
    path: 'courses/:id',
    component: CourseDetailsComponent,
  },
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
  },
  {
    path: 'course-details/:id',
    redirectTo: 'dashboard/course-details/:id',
    pathMatch: 'prefix'
  }
];