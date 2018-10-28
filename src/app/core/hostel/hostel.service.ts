import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Hostel } from './hostel';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HostelService {
  hostels$ = new BehaviorSubject<Hostel[]>([]);
  hostel$ = new BehaviorSubject<Hostel>(null);
  baseUrl = 'hostels';

  constructor(private afs: AngularFirestore) {}

  getAll() {
    this.afs
      .collection<Hostel>(this.baseUrl)
      .snapshotChanges()
      .pipe(
        map(arr =>
          arr.map(a => {
            return {
              id: a.payload.doc.id,
              ...a.payload.doc.data(),
            };
          })
        )
      )
      .subscribe(hostels => this.hostels$.next(hostels));
  }

  get(id: string) {
    this.afs
      .collection(this.baseUrl)
      .doc<Hostel>(id)
      .valueChanges()
      .subscribe(hostel => this.hostel$.next(hostel));
  }

  create(hostel: Hostel): Promise<DocumentReference> {
    return this.afs
      .collection<Hostel>(this.baseUrl)
      .add(hostel);
  }

  update(id: string, data: Partial<Hostel>): Promise<void> {
    return this.afs
      .collection(this.baseUrl)
      .doc<Hostel>(id)
      .update(data);
  }

  delete(id: string): Promise<void> {
    return this.afs
      .collection(this.baseUrl)
      .doc(id)
      .delete();
  }
}
