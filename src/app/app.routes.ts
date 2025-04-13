import { Routes } from '@angular/router';
import { NewsComponent } from './pages/news/news.component';
import { HomeComponent } from './pages/home/home.component';
import { PlayersComponent } from './pages/players/players.component';
import { TeamsComponent } from './pages/teams/teams.component';
import { MatchesComponent } from './pages/matches/matches.component';

export const routes: Routes = [
  { path: '', component: HomeComponent }, 
  
  { path: 'news', component: NewsComponent },
  { path: 'players', component: PlayersComponent },
  { path: 'teams', component: TeamsComponent },
  { path: 'matches', component: MatchesComponent }
];
