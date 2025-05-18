// player.service.ts
import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, addDoc, doc, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { Player } from './player.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  private playersCollection;

  
  constructor(private firestore: Firestore) {
    this.playersCollection = collection(this.firestore, 'players');
  }

  getPlayers(): Observable<Player[]> {
  const playersCollection = collection(this.firestore, 'players');
  return collectionData(playersCollection, { idField: 'id' }) as Observable<Player[]>;
}

  addPlayer(player: Player) {
    return addDoc(this.playersCollection, player);
  }

  updatePlayer(id: string, player: Partial<Player>) {
    const playerDoc = doc(this.firestore, `players/${id}`);
    return updateDoc(playerDoc, player);
  }

  deletePlayer(id: string) {
  const playerDoc = doc(this.firestore, `players/${id}`);
  return deleteDoc(playerDoc);
}
}

