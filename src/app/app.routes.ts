import { Routes } from '@angular/router';
import { Board } from './components/board/board';
import { Profile } from './components/profile/profile';
import { MsalGuard } from '@azure/msal-angular';

export const routes: Routes = [
  {
    path: '',
    component: Board,
    canActivate: [MsalGuard]
  },
  {
    path: 'profile',
    component: Profile,
    canActivate: [MsalGuard]
  }
];
