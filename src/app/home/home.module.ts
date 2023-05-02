import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
 import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { CategoryComponent } from './category/category.component';
import { SharedModule } from '../shared/shared.module';
import { TournamentComponent } from './tournament/tournament.component';
import { TeamComponent } from './team/team.component';
import { MatchComponent } from './match/match.component';
import { AddEditCategoryComponent } from './category/add-edit-category/add-edit-category.component';
import { AddEditTournamentComponent } from './tournament/add-edit-tournament/add-edit-tournament.component';
import { AddEditTeamComponent } from './team/add-edit-team/add-edit-team.component';
import { AddEditMatchComponent } from './match/add-edit-match/add-edit-match.component';


@NgModule({
  declarations: [
    HomeComponent,
    CategoryComponent,
    TournamentComponent,
    TeamComponent,
    MatchComponent,
    AddEditCategoryComponent,
    AddEditTournamentComponent,
    AddEditTeamComponent,
    AddEditMatchComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    HomeRoutingModule,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class HomeModule { }
