import { Component } from '@angular/core';
import { Team } from './team.model'; 
import { Player } from '../players/player.model';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss']
})
export class TeamsComponent {
  teams: Team[] = [
    {
      name: 'Magyar Válogatott',
      founded: 1911,
      imageUrl: 'assets/a_team.png', 
      players: [
        {
          name: 'Kovács Péter',
          capNumber: 5,
          bio: 'Fiatal játékos a válogatottban.',
          imageUrl: 'assets/placeholder.png',
        },
        {
          name: 'Szabó Ádám',
          capNumber: 10,
          bio: 'Tapasztalt válogatott játékos.',
          imageUrl: 'assets/placeholder.png',
        }
      ]
    },
    {
      name: 'Ferencváros',
      founded: 1899,
      imageUrl: 'assets/a_team.png', 
      players: [
        {
          name: 'Nagy László',
          capNumber: 3,
          bio: 'Erős center.',
          imageUrl: 'assets/placeholder.png',
        }
      ]
    }
  ];
}
