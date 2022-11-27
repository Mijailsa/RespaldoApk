/* import { TestBed } from "@angular/core/testing";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { IonicStorageModule, Storage } from '@ionic/storage-angular';
import { StorageService } from 'src/app/services/storage.service';
import { SolicitudPage } from "./solicitud.page";
import { RouterTestingModule } from '@angular/router/testing';
import { AngularFireModule } from "@angular/fire/compat";
import { environment } from "src/environments/environment";
import { HttpClientModule } from "@angular/common/http";
import { HomePage } from "../home/home.page";


describe('PRUEBAS UNITARIAS: Solicitud ', ()=>{
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
        SolicitudPage
      ],
      providers: [ StorageService, Storage, HomePage ]
    }).compileComponents;
  });
  it(' 1. Levantamiento solicitud ', ()=>{
    const fixture = TestBed.createComponent(SolicitudPage);
    const app = fixture.componentInstance;
    
    expect(app).toBeTruthy();

  });
}); */