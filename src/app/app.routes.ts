import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AuthComponent } from './pages/auth/auth.component';
import { TranslationResolver } from './resolver/translation-resolver';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    resolve: {translations: TranslationResolver},
    data: {prefixList: []}
  },
  {
    path: 'auth',
    component: AuthComponent,
    resolve: {translations: TranslationResolver},
    data: {prefixList: ['FE_AUTH_', 'FE_LOGIN_', 'FIELD_ERROR_LOGIN_']}
  }
];
