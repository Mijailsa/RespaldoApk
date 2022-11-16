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
  agregar (coleccion, usuario){
    try {
       this.fire.collection(coleccion).add(this.usuario);
       return true
        }catch(error) {
       console.log(error)
       }
       return false
  }
}
