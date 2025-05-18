import { Routes } from '@angular/router';
import { NewsComponent } from './pages/news/news.component';
import { HomeComponent } from './pages/home/home.component';
import { PlayersComponent } from './pages/players/players.component';
import { TeamsComponent } from './pages/teams/teams.component';
import { MatchesComponent } from './pages/matches/matches.component';
import { AuthComponent } from './pages/auth/auth.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent }, 
  { path: 'news', component: NewsComponent },
  { path: 'players', component: PlayersComponent, canActivate:[authGuard]},
  { path: 'teams', component: TeamsComponent, canActivate:[authGuard]},
  { path: 'matches', component: MatchesComponent },
  { path: 'auth', component: AuthComponent }
];
