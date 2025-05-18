import { Component, EventEmitter, Output, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Player } from './player.model';
import { PlayerService } from './player.service';
import { Observable, Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Auth, user } from '@angular/fire/auth';
import { PlayerDetailComponent } from './player.detail';

@Component({
  selector: 'app-players',
  standalone: true,
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.scss'],
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    CommonModule,
    PlayerDetailComponent
  ]
})
export class PlayersComponent implements OnInit, OnDestroy {
  players$: Observable<Player[]>;
  sortedPlayers: Player[] = [];

  @Output() playerAdded = new EventEmitter<Player>();

  selectedPlayer: Player | null = null;
  showAddPlayerForm = false;

  addPlayerForm: FormGroup;
  user$: Observable<any>;

  // Új változók az update kezeléshez
  isEditing = false;
  editingPlayerId: string | null = null;

  private playersSubscription?: Subscription;

  constructor(
    private fb: FormBuilder,
    private playerService: PlayerService,
    private auth: Auth
  ) {
    this.addPlayerForm = this.fb.group({
      name: ['', Validators.required],
      capNumber: ['', [Validators.required, Validators.min(0)]],
      bio: ['', Validators.required]
    });

    this.players$ = this.playerService.getPlayers();
    this.user$ = user(this.auth);
  }

  ngOnInit(): void {
    this.playersSubscription = this.players$.subscribe(players => {
      this.sortedPlayers = [...players];
    });
  }

  ngOnDestroy(): void {
    this.playersSubscription?.unsubscribe();
  }

  openPlayerModal(player: Player) {
    this.selectedPlayer = player;
  }

  closePlayerModal() {
    this.selectedPlayer = null;
  }

  openAddPlayerModal() {
    this.selectedPlayer = null; // bezárjuk a player részletezőt
    this.isEditing = false;
    this.editingPlayerId = null;
    this.addPlayerForm.reset();
    this.showAddPlayerForm = true;
  }

  openEditPlayerModal(player: Player) {
    this.selectedPlayer = null; // bezárjuk a player részletezőt
    this.isEditing = true;
    this.editingPlayerId = player.id || null;

    this.addPlayerForm.patchValue({
      name: player.name,
      capNumber: player.capNumber,
      bio: player.bio
    });

    this.showAddPlayerForm = true;
  }

  closeAddPlayerModal() {
    this.showAddPlayerForm = false;
    this.addPlayerForm.reset();
    this.isEditing = false;
    this.editingPlayerId = null;
  }

  submitNewPlayer() {
    if (this.addPlayerForm.valid) {
      const newPlayer: Player = {
        ...this.addPlayerForm.value,
        imageUrl: 'assets/placeholder.png'
      };

      this.playerService.addPlayer(newPlayer).then(() => {
        this.playerAdded.emit(newPlayer);
        this.closeAddPlayerModal();
      }).catch(error => {
        console.error('Hiba játékos hozzáadásakor:', error);
      });
    }
  }

  submitUpdatePlayer() {
    if (this.addPlayerForm.valid && this.editingPlayerId) {
      const updatedPlayer: Partial<Player> = {
        ...this.addPlayerForm.value
      };
      this.playerService.updatePlayer(this.editingPlayerId, updatedPlayer)
        .then(() => {
          this.closeAddPlayerModal();
        })
        .catch(error => {
          console.error('Hiba játékos frissítésekor:', error);
        });
    }
  }

  sortPlayers(key: keyof Player, order: 'asc' | 'desc') {
    this.sortedPlayers = [...this.sortedPlayers].sort((a, b) => {
      const valA = a[key] ?? '';
      const valB = b[key] ?? '';
      if (valA < valB) return order === 'asc' ? -1 : 1;
      if (valA > valB) return order === 'asc' ? 1 : -1;
      return 0;
    });
  }

  onPlayerDetailClose() {
    this.closePlayerModal();
  }

  onPlayerEdit(player: Player) {
    this.openEditPlayerModal(player);
  }

  onPlayerDelete(player: Player) {
    if (confirm(`Biztosan törölni szeretnéd ${player.name} játékost?`)) {
      this.playerService.deletePlayer(player.id)
        .then(() => {
          console.log(`${player.name} sikeresen törölve.`);
          this.closePlayerModal();
        })
        .catch(error => {
          console.error('Hiba a törlés során:', error);
        });
    }
  }
}
