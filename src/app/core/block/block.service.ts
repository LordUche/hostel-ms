import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Block } from './block';
import {
  AngularFirestore,
  DocumentReference,
} from '@angular/fire/firestore';
import { HostelService } from '../hostel/hostel.service';
import { Room } from '../room/room';

@Injectable({
  providedIn: 'root',
})
export class BlockService {
  blocks$ = new BehaviorSubject<Block[]>([]);
  block$ = new BehaviorSubject<Block>(null);
  baseUrl = 'blocks';

  constructor(private afs: AngularFirestore, private hs: HostelService) {}

  getAll(hostelId: string) {
    return this.afs
      .collection<Block>(this.baseUrl)
      .ref.where('hostelId', '==', hostelId)
      .onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
          if (change.type === 'added' || change.type === 'removed') {
            this.hs.update(hostelId, { blockCount: snapshot.size });
          }
        });
        const blocks = snapshot.docs.map(doc => {
          return {
            id: doc.id,
            ...(doc.data() as Block),
          };
        });
        this.blocks$.next(blocks);
      });
  }

  get(id: string) {
    this.afs
      .collection(this.baseUrl)
      .doc<Block>(id)
      .valueChanges()
      .subscribe(block => this.block$.next({ id, ...block }));
  }

  create(block: Block): Promise<DocumentReference> {
    return this.afs.collection<Block>(this.baseUrl).add(block);
  }

  update(id: string, data: Partial<Block>): Promise<void> {
    return this.afs
      .collection(this.baseUrl)
      .doc<Block>(id)
      .update(data);
  }

  delete(id: string): Promise<void> {
    this.afs
      .collection<Room>('rooms')
      .ref.where('blockId', '==', id)
      .get()
      .then(snapshot => {
        this.deleteAllRooms(snapshot.docs).then(arr => console.log(arr));
      });
    
    return this.afs
      .collection(this.baseUrl)
      .doc(id)
      .delete();
  }

  private deleteAllRooms(rooms): Promise<any[]> {
    return new Promise((res, rej) => {
      res(rooms.map(room => this.afs.collection('rooms').doc(room.id).delete().then(()=> 1).catch(e => e)))
    });
  }
}
