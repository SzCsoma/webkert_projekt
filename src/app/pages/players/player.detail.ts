import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Player } from './player.model';
import { CommonModule } from '@angular/common';
import { CapNumberFormatPipe } from "../../../assets/pipes/capnumber.pipe";

@Component({
  selector: 'app-player-detail',
  imports: [CommonModule, CapNumberFormatPipe],
  template: `
  <div *ngIf="player && isOpen" class="player-modal" (click)="onClose()">
  <div class="modal-content" (click)="$event.stopPropagation()">
    <button class="close-btn" (click)="onClose()">×</button>
    <h2>{{ title }}</h2>
    <p><strong>Játékos neve:</strong> {{ player.name }}</p>
    <p><strong>Sapkaszám:</strong> #{{ player.capNumber | capNumberFormat }}</p>
    <img [src]="player.imageUrl" alt="{{ player.name }}" class="player-modal-img" />
    <p><strong>Bio:</strong> {{ player.bio }}</p>

    <button (click)="onEdit()">Módosít</button>
    <button (click)="onDelete()">Töröl</button>
  </div>
</div>
  `,
  styles: [`
  .player-modal {
    position: fixed;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    animation: fadeIn 0.3s ease-in;
    padding: 1rem;
    z-index: 1000;
  }

  .modal-content {
    background-color: #fff;
    padding: 2rem;
    border-radius: 20px;
    position: relative;
    width: 90%;
    max-width: 500px;
    animation: slideUp 0.3s ease-in-out;
    text-align: center;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.25);
  }

  .close-btn {
    position: absolute;
    top: 0.75rem;
    right: 0.75rem;
    background: none;
    border: none;
    font-size: 1.75rem;
    cursor: pointer;
    color: #444;
    transition: transform 0.2s ease;
  }

  .close-btn:hover {
    transform: rotate(90deg);
  }

  .player-modal-img {
    width: 100%;
    max-width: 280px;
    height: auto;
    border-radius: 12px;
    margin: 0.75rem auto 1rem;
  }

  button {
    margin: 0.5rem;
    padding: 0.5rem 1rem;
    background-color: #0077cc;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.2s ease;
  }

  button:hover {
    background-color: #005fa3;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes slideUp {
    from {
      transform: translateY(40px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`]
})
export class PlayerDetailComponent {
  @Input() player!: Player | null;
  @Input() isOpen: boolean = false;
  @Input() title: string = 'Játékos részletei';

  @Output() close = new EventEmitter<void>();
  @Output() edit = new EventEmitter<Player>();
  @Output() delete = new EventEmitter<Player>();

  onClose() {
    this.close.emit();
  }

  onEdit() {
    if (this.player) {
      this.edit.emit(this.player);
    }
  }

  onDelete() {
    if (this.player) {
      this.delete.emit(this.player);
    }
  }
}
