import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEditAirlineComponent } from './airlines/add-edit-airline/add-edit-airline.component';
import { AirlinesComponent } from './airlines/airlines.component';
import { LoginComponent } from './auth/login/login.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'airlines',
    component: AirlinesComponent
  },
  {
    path: 'airlines/:type/:slug',
    component: AddEditAirlineComponent
  },
  {
    path: 'main-layout',
    component: MainLayoutComponent,
    children: [
      { path: '', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) }
    ]
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
