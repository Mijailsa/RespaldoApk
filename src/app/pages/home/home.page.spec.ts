import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicStorageModule, Storage } from '@ionic/storage-angular';
import { StorageService } from 'src/app/services/storage.service';
import { HomePage } from './home.page';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { HttpClientModule } from '@angular/common/http';

describe('PRUEBAS UNITARIAS: Home ', ()=>{
  // Configuracion ambiente de las pruebas:
    beforeEach ( async ()=> {
      await TestBed.configureTestingModule({
        imports: [
          ReactiveFormsModule,
          FormsModule,
          RouterTestingModule,
          AngularFireModule.initializeApp(environment.firebaseConfig),
          HttpClientModule
        ],
        declarations: [
          HomePage
        ],
        providers: [ StorageService, Storage ]
      
      }).compileComponents;
    });
    it(' 1. Levantamiento Home ', ()=>{
      const fixture = TestBed.createComponent(HomePage);
      const app = fixture.componentInstance;
      
      expect(app).toBeTruthy();
  
    });
  }); 