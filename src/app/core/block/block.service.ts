import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Block } from './block';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { HostelService } from '../hostel/hostel.service';
import { Hostel } from '../hostel/hostel';

@Injectable({
  providedIn: 'root',
})
export class BlockService {
  blocks$ = new BehaviorSubject<Block[]>([]);
  block$ = new BehaviorSubject<Block>(null);
  baseUrl = 'blocks';

  constructor(private afs: AngularFirestore, private hs: HostelService) {}

  getAll(hostelId: string): Promise<Block[]> {
    return this.afs
      .collection<Block>(this.baseUrl)
      .ref.where('hostelId', '==', hostelId)
      .get()
      .then(snapshot => {
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
        return blocks as Block[];
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
    return this.afs
      .collection(this.baseUrl)
      .doc(id)
      .delete();
  }
}
