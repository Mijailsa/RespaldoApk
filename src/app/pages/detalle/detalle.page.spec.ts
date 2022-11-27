/* import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StorageService } from 'src/app/services/storage.service';
import { IonicStorageModule, Storage } from '@ionic/storage-angular';
import { RouterTestingModule } from '@angular/router/testing';

import { DetallePage } from './detalle.page';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { HttpClientModule } from '@angular/common/http';


describe('PRUEBAS UNITARIAS: Detalle ', ()=>{
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
          DetallePage
        ],
        providers: [ StorageService, Storage]
      }).compileComponents;
    });
    it(' 1. Levantamiento Detalle ', ()=>{
      const fixture = TestBed.createComponent(DetallePage);
      const app = fixture.componentInstance;
      
      expect(app).toBeTruthy();
  
    });
  }); */