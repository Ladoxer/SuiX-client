import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./features/dashboard/dashboard.component')
      .then(m => m.DashboardComponent)
  },
  {
    path: 'missions',
    loadComponent: () => import('./features/missions/missions.component')
      .then(m => m.MissionsComponent)
  },
  {
    path: 'progress',
    loadComponent: () => import('./features/progress/progress.component')
      .then(m => m.ProgressComponent)
  },
  {
    path: 'insights',
    loadComponent: () => import('./features/insights/insights.component')
      .then(m => m.InsightsComponent)
  },
  {
    path: 'goals',
    loadComponent: () => import('./features/goals/goals.component')
      .then(m => m.GoalsComponent)
  }
];
