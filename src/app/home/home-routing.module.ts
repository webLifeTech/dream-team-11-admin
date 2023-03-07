import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { CategoryComponent } from './category/category.component';
import { TournamentComponent } from './tournament/tournament.component';
import { TeamComponent } from './team/team.component';
import { MatchComponent } from './match/match.component';

const routes: Routes = [
  {
    path: 'dashboard', component: HomeComponent
  },
  {
    path: 'category', component: CategoryComponent
  },
  {
    path: 'tournament', component: TournamentComponent
  },
  {
    path: 'team', component: TeamComponent
  },
  {
    path: 'match', component: MatchComponent
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
