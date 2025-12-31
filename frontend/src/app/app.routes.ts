import { Routes } from '@angular/router';
import { provideRouter } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RigisterComponent } from './rigister/rigister.component';


export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'rigister', component: RigisterComponent },
  {
    path: 'components',
    loadChildren: () =>
      import('./components/components.routes').then(m => m.COMPONENTS_ROUTES),
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' },
];

export const appRouterProviders = [provideRouter(routes)];
