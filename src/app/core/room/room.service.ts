import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Room } from './room';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { BlockService } from '../block/block.service';

@Injectable({
  providedIn: 'root',
})
export class RoomService {
  rooms$ = new BehaviorSubject<Room[]>([]);
  room$ = new BehaviorSubject<Room>(null);
  baseUrl = 'rooms';

  constructor(private afs: AngularFirestore, private bs: BlockService) {}

  getAll(blockId: string) {
    return this.afs
      .collection<Room>(this.baseUrl)
      .ref.where('blockId', '==', blockId)
      .get()
      .then(snapshot => {
        snapshot.docChanges().forEach(change => {
          if (change.type === 'added' || change.type === 'removed') {
            this.bs.update(blockId, { roomCount: snapshot.size });
          }
        });
        const rooms = snapshot.docs.map(doc => {
          return {
            id: doc.id,
            ...(doc.data() as Room),
          };
        });
        this.rooms$.next(rooms);
      });
  }

  get(id: string) {
    this.afs
      .collection(this.baseUrl)
      .doc<Room>(id)
      .valueChanges()
      .subscribe(room => this.room$.next({ id, ...room }));
  }

  create(room: Room): Promise<DocumentReference> {
    return this.afs.collection<Room>(this.baseUrl).add(room);
  }

  update(id: string, data: Partial<Room>): Promise<void> {
    return this.afs
      .collection(this.baseUrl)
      .doc<Room>(id)
      .update(data);
  }

  delete(id: string): Promise<void> {
    return this.afs
      .collection(this.baseUrl)
      .doc(id)
      .delete();
  }
}
