import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class FireService {

  constructor(private fire: AngularFirestore) { }
  usuario = {
    rut: 'a'
  };
  //Crud firebase
  async agregar(coleccion, value, id){
    try {
      await this.fire.collection(coleccion).doc(id).set(value);
    } catch (error) {
      console.log(error)
    }
  }

  async getDatos(coleccion){
    try {
      return await this.fire.collection(coleccion).snapshotChanges();
    } catch (error) {
      console.log(error);
    }
  }

  async eliminar(coleccion, id){
    try {
      await this.fire.collection(coleccion).doc(id).delete();
    } catch (error) {
      console.log(error);
    }
  }

  async getDato(coleccion, id){
    try {
      return  await this.fire.collection(coleccion).doc(id).get();
    } catch (error) {
      console.log(error);
    }
  }

  async modificar(coleccion, id, value){
    try {
      await this.fire.collection(coleccion).doc(id).set(value);
    } catch (error) {
      console.error(error);
    }
  }


}
