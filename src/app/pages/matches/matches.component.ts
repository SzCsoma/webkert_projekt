import { Component } from '@angular/core';
import { Matches } from './matches.model';
import { Player } from '../players/player.model';
import { CustomDatePipe } from '../../../assets/pipes/date.pipe';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.scss'],
  providers: [CustomDatePipe] 
  ,
  imports: [CustomDatePipe]
})
export class MatchesComponent {
  dummyPlayers: Player[] = [];

  matches: Matches[] = [];

  constructor(private datePipe: CustomDatePipe) {
    this.matches = [
      {
        challenger: {
          name: 'Team A',
          founded: 2000,
          players: this.dummyPlayers,
          imageUrl: 'assets/a_team.png'
        },
        challenged: {
          name: 'Team B',
          founded: 2005,
          players: this.dummyPlayers,
          imageUrl: 'assets/b_team.png'
        },
        date: new Date('2025-05-01T15:00:00'),
        location: 'Stadium 1'
      },
      {
        challenger: {
          name: 'Team A',
          founded: 2000,
          players: this.dummyPlayers,
          imageUrl: 'assets/a_team.png'
        },
        challenged: {
          name: 'Team B',
          founded: 2005,
          players: this.dummyPlayers,
          imageUrl: 'assets/b_team.png'
        },
        date: new Date('2025-06-10T18:00:00'),
        location: 'Stadium 2'
      }
    ];
  }
}
