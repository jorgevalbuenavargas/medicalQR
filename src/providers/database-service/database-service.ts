import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireModule} from 'angularfire2';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Injectable()
export class DatabaseServiceProvider {

constructor(public firebase: AngularFireDatabase) {}

getAllQRsById() {
  return this.firebase.list('qrs/',
    ref => ref.orderByChild('user_id').equalTo("a3cf01bd-c7f8-4125-9fff-28cd3705f9f9"));
}

  getAllQRsStates() {
    return this.firebase.list('qrs-states/');
  }

  getStateById(state_id) {
    return this.firebase.list('qrs-states/' + state_id);
  }

  getAllDoctors() {
    return this.firebase.list('users/');
  }

  getPendingDoctors() {
    return this.firebase.list('users/',
      ref => ref.orderByChild('user_state_id').equalTo("bfff8fef-7b54-42c1-bf7f-83232a08cf5c"));
  }

  getEnabledDoctors() {
    return this.firebase.list('users/',
      ref => ref.orderByChild('user_state_id').equalTo("2103d550-17c2-4ff5-9b61-73e7f4ea6a7f"));
  }

  getDisabledDoctors() {
    return this.firebase.list('users/',
      ref => ref.orderByChild('user_state_id').equalTo("5058ea0c-3e21-4698-bd91-5f9a891caceb"));
  }

  editDoctorState(doctor){
    this.firebase.database.ref('users/' + doctor.user_id).set(doctor);
  }

  createQR(qr){
    this.firebase.database.ref('qrs/' + qr.id).set(qr);
  }

  editQR(qr){
    this.firebase.database.ref('users/' + qr.id).set(qr);
  }
}