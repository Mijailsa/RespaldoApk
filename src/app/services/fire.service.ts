import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage'
import { ResolveEnd } from '@angular/router';
import { finalize} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class FireService {

  key: string;
  nombre: string;
  url: any;
  file: File
  constructor( private fire: AngularFirestore, private http: HttpClient, private firebaseStorage: AngularFireStorage,) { }


  usuario = {
    rut: 'a'
  };
  //Crud firebase
  async agregar(coleccion, value, id) {
    try {
      await this.fire.collection(coleccion).doc(id).set(value);
    } catch (error) {
      console.log(error)
    }
  }

  getDatos(coleccion) {
    try {
      return this.fire.collection(coleccion).snapshotChanges();
    } catch (error) {
      console.log(error);
    }
  }

  async eliminar(coleccion, id) {
    try {
      await this.fire.collection(coleccion).doc(id).delete();
    } catch (error) {
      console.log(error);
    }
  }

  getDato(coleccion, id) {
    try {
      return this.fire.collection(coleccion).doc(id).get();
    } catch (error) {
      console.log(error);
    }
  }

  async modificar(coleccion, id, value) {
    try {
      await this.fire.collection(coleccion).doc(id).set(value);
    } catch (error) {
      console.error(error);
    }
  }

  async api() {

    return await this.http.get('https://mindicador.cl/api/dolar')
  }

  async cargarImagen(file: any, path: string, nombre: string) : Promise<string>{
    
     return new Promise(async(resolve) =>{
      const filepath = path + '/' + nombre;
      console.log(filepath)
      const ref = await this.firebaseStorage.ref(filepath);
      console.log(ref)
      const task = ref.put(file);
      
      task.snapshotChanges().pipe(
        finalize(() => {
         ref.getDownloadURL().subscribe( res=>{
            this.url = res ;
            resolve(res)
            console.log('WEA 1 '+ typeof res,'WEA 2 '+this.url)
            return this.url;
            
          })
        } )
     ).subscribe();

        
    
        
      
    }) }
      
    /* getImagen(nombre,path){
      const filepath = path + '/' + nombre;
      console.log(filepath)
      const ref = this.firebaseStorage.ref(filepath);
    } */
    

  
}
