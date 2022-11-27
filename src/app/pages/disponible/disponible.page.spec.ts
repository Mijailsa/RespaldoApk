/* import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicStorageModule, Storage } from '@ionic/storage-angular';
import { FireService } from 'src/app/services/fire.service';
import { StorageService } from 'src/app/services/storage.service';
import { environment } from 'src/environments/environment';
import { HomePage } from '../home/home.page';
import { DisponiblePage } from './disponible.page';

import { Google} from 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBCUe3ASpU7vwj_IxOSyPfPk1So7Gq5rQc&libraries=places';
declare var google;
describe('PRUEBAS UNITARIAS: Disponible ', ()=>{
  // Configuracion ambiente de las pruebas:
  
    beforeEach ( async ()=> {
     
      await TestBed.configureTestingModule({
        imports: [
          ReactiveFormsModule,
          FormsModule,
          RouterTestingModule,
          AngularFireModule.initializeApp(environment.firebaseConfig),
          HttpClientModule,
          
          
          
        ],
        declarations: [
          DisponiblePage,
          
        ],
        providers: [ StorageService, Storage, HomePage, FireService, Geolocation]
      }).compileComponents;
    });
    it(' 1. Levantamiento Disponible ', ()=>{
      const fixture = TestBed.createComponent(DisponiblePage);
      const app = fixture.componentInstance;
      
      expect(app).toBeTruthy();
  
    });
  }); */