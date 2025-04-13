// players.component.ts
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Player } from './player.model';

@Component({
  selector: 'app-players',
  standalone: true,
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.scss'],
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule]
})
export class PlayersComponent {
  players: Player[] = [
    {
      name: 'Kovács Péter',
      capNumber: 5,
      bio: 'Kovács Péter, egy fiatal vízilabda játékos, aki a magyar válogatott színeiben szerepel.',
      imageUrl: 'assets/placeholder.png',
    },
    {
      name: 'Szabó Ádám',
      capNumber: 10,
      bio: 'Szabó Ádám, tapasztalt játékos, aki több nemzetközi tornán is részt vett.',
      imageUrl: 'assets/placeholder.png',
    },
    {
      name: 'Nagy László',
      capNumber: 3,
      bio: 'Nagy László, a vízilabda egyik legkiemelkedőbb alakja, hosszú évek óta a válogatott tagja.',
      imageUrl: 'assets/placeholder.png',
    },
    {
      name: 'Varga Dénes',
      capNumber: 8,
      bio: 'Varga Dénes, a magyar vízilabda egyik legismertebb neve, rendkívüli technikai tudással.',
      imageUrl: 'assets/placeholder.png',
    },
    {
      name: 'Hosnyánszky Norbert',
      capNumber: 11,
      bio: 'Hosnyánszky Norbert, olimpiai bajnok és a csapat egyik vezéregyénisége.',
      imageUrl: 'assets/placeholder.png',
    },
    {
      name: 'Manhercz Krisztián',
      capNumber: 4,
      bio: 'Manhercz Krisztián, fiatal, lendületes játékos, aki villámgyors úszásáról ismert.',
      imageUrl: 'assets/placeholder.png',
    }
  ];
  @Output() playerAdded = new EventEmitter<Player>();
  selectedPlayer: Player | null = null;
  showAddPlayerForm = false;

  addPlayerForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.addPlayerForm = this.fb.group({
      name: ['', Validators.required],
      capNumber: ['', Validators.required],
      bio: ['', Validators.required]
    });
  }

  openPlayerModal(player: Player) {
    this.selectedPlayer = player;
  }

  closePlayerModal() {
    this.selectedPlayer = null;
  }

  openAddPlayerModal() {
    this.showAddPlayerForm = true;
  }

  closeAddPlayerModal() {
    this.showAddPlayerForm = false;
    this.addPlayerForm.reset();
  }

  submitNewPlayer() {
    if (this.addPlayerForm.valid) {
      const newPlayer: Player = {
        ...this.addPlayerForm.value,
        imageUrl: 'assets/placeholder.png'
      };
      this.players.unshift(newPlayer);
      this.playerAdded.emit(newPlayer);  
      this.closeAddPlayerModal();
    }
  }
}
