import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { CategoryComponent } from './category/category.component';
import { TournamentComponent } from './tournament/tournament.component';
import { TeamComponent } from './team/team.component';
import { MatchComponent } from './match/match.component';
import { AddEditCategoryComponent } from './category/add-edit-category/add-edit-category.component';
import { AddEditTournamentComponent } from './tournament/add-edit-tournament/add-edit-tournament.component';
import { AddEditTeamComponent } from './team/add-edit-team/add-edit-team.component';
import { AddEditMatchComponent } from './match/add-edit-match/add-edit-match.component';

const routes: Routes = [
  {
    path: 'dashboard', component: HomeComponent
  },
  {
    path: 'category', component: CategoryComponent
  },
  {
    path: 'category/:type/:id', component: AddEditCategoryComponent
  },
  {
    path: 'tournament', component: TournamentComponent
  },
  {
    path: 'tournament/:type/:id', component: AddEditTournamentComponent
  },
  {
    path: 'team', component: TeamComponent
  },
  {
    path: 'team/:type/:id', component: AddEditTeamComponent
  },
  {
    path: 'match', component: MatchComponent
  },
  {
    path: 'match/:type/:id', component: AddEditMatchComponent
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
